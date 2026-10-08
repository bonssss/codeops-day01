# 📡 Client Data Fetching with SWR — Addis Eats

This document records the design, architecture, and network-level verification for implementing **SWR (Stale-While-Revalidate)** in **Addis Eats**, covering background polling, server fallback hydration, conditional debounced search, lag-free transitions, and query string pagination.

---

## 1. SWR Installation & Shared Fetcher (`lib/fetcher.js`)

### Implementation
We installed `swr` (`^2.5.1`) and created a centralized, reusable fetcher in `lib/fetcher.js`:

```javascript
// lib/fetcher.js
export async function fetcher(...args) {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    try {
      error.info = await res.json();
    } catch {
      error.info = { statusText: res.statusText };
    }
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export default fetcher;
```

### Why a Centralized Fetcher?
- **Unified Error Handling**: Automatically unwraps non-2xx HTTP responses into catchable JavaScript errors with HTTP status codes and API error messages.
- **DRY Architecture**: Any client component across the app imports the same fetcher without rewriting boilerplate `fetch().then(res => res.json())`.

---

## 2. Converting Order Status to `useSWR` (Deleting `useEffect` & `useState`)

### Before (Traditional React Hooks Pattern)
Previously, polling or tracking an order required managing multiple pieces of imperative state:
```javascript
// ❌ Old Imperative Pattern
const [order, setOrder] = useState(initialOrder);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  let timerId;
  const poll = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      setError(err);
    }
  };

  timerId = setInterval(poll, 3000);
  return () => clearInterval(timerId); // Manual cleanup required
}, [orderId]);
```

### After (Declarative SWR Pattern in `OrderStatusScreen.jsx`)
All manual interval management, error handling, loading states, and state synchronization were eliminated in favor of a single declarative hook:

```javascript
// ✅ SWR Pattern (app/order-status/OrderStatusScreen.jsx)
const {
  data: order,
  error,
  isLoading,
  isValidating,
  mutate
} = useSWR(
  orderId ? `/api/orders/${orderId}` : null,
  fetcher,
  {
    fallbackData,
    refreshInterval: 3000, // Polls every 3 seconds
    revalidateOnFocus: true,
  }
);
```

### Key Benefits
1. **Zero Cleanup Boilerplate**: SWR automatically clears intervals when the component unmounts.
2. **Deduplication**: Simultaneous calls or re-renders share the same request.
3. **Tab Focus Revalidation**: Automatically refetches fresh order state when the customer switches back to the Addis Eats tab.

---

## 3. Polling with `refreshInterval` & Network Tab Verification

### Configuration
In `OrderStatusScreen.jsx`, `refreshInterval: 3000` is configured on the order key `/api/orders/${orderId}`.

### What You See in the Browser Network Tab
1. **Regular Intervals**: Every 3,000ms, a lightweight `GET /api/orders/[id]` request is dispatched.
2. **Status Progression**:
   - `0s - 7s`: Status is `confirmed` (Kitchen simmering).
   - `7s - 20s`: Status transitions to `preparing` (Packaging injera).
   - `20s - 40s`: Status transitions to `out_for_delivery` (Driver on the way).
   - `40s+`: Status transitions to `delivered`.
3. **Reactive UI Updates**: The stepper progress bar, order badge, and delivery estimates update automatically on each response without re-rendering unrelated parts of the page.

---

## 4. Server Component Pre-rendering with `fallbackData`

### Architecture
To avoid the initial client-side loading spinner ("waterfall") when the customer opens `/order-status/[id]`, the initial order is fetched on the server in a **Server Component** and passed into the client component via `fallbackData`:

```javascript
// app/order-status/[id]/page.js (Server Component)
import { getOrderById } from "@/lib/data";
import OrderStatusScreen from "../OrderStatusScreen";

export default async function OrderStatusPage({ params }) {
  const { id } = await params;
  const initialOrder = getOrderById(id);

  if (!initialOrder) {
    return <OrderNotFound id={id} />;
  }

  // Pre-rendered on server, hydrated instantly on client
  return <OrderStatusScreen orderId={id} fallbackData={initialOrder} />;
}
```

### Why `fallbackData` Matters
- **Instant First Paint (FCP)**: The customer immediately sees their receipt and current order progress in HTML before JavaScript finishes hydrating.
- **Seamless Handover**: SWR starts with `fallbackData` as its initial cache, then transparently begins polling in the background without any layout shifts or flashes.

---

## 5. Debounced Search Box with `null` Conditional SWR Key

### Implementation in `DishList.jsx`
SWR provides **conditional fetching**: if the key passed to `useSWR` is `null` (or a function returning `null`), SWR **does not execute any fetch request**.

```javascript
// Debounce search term by 350ms to prevent spamming the backend
const trimmedTerm = debouncedTerm.trim();

// SWR Key is null when term is empty:
const swrKey = trimmedTerm
  ? `/api/dishes?search=${encodeURIComponent(trimmedTerm)}&page=${currentPage}&limit=3`
  : null;

const { data: swrResult, isValidating: isSwrValidating } = useSWR(
  swrKey,
  fetcher,
  {
    keepPreviousData: true,
  }
);
```

### Network Tab Observations
- **When search input is empty**: SWR Key is `null`. Open the Network tab and verify that **zero requests** are made while idle or when the search input is cleared.
- **While typing**: Because of the 350ms debounce, no requests fire per keystroke. Only once typing pauses does a single request fire for `/api/dishes?search=...`.

---

## 6. Eliminating UI Flashes with `keepPreviousData: true`

### Problem Without `keepPreviousData`
When `swrKey` changes (e.g. searching from `"do"` to `"doro"`, or paging from page 1 to 2), SWR default behavior resets `data` to `undefined` while the new request is in transit. This causes:
- The dish list to disappear for ~100–300ms.
- Unpleasant screen flashing, layout collapse, and flickering loading spinners.

### Solution with `keepPreviousData: true`
With `keepPreviousData: true`, SWR preserves the previously rendered dish cards on the screen while the new request fetches in the background.

```javascript
useSWR(swrKey, fetcher, {
  keepPreviousData: true, // List stays mounted and rock-solid between searches
});
```

### Diagnostic Indicator
A status pill is visible above the dishes showing:
- Active SWR Key (`null` vs `/api/dishes?search=...`)
- `keepPreviousData: true`
- A subtle background pulse indicator when `isSwrValidating` is active, proving background revalidation without screen flicker.

---

## 7. Pagination with Page Number in the Query String (`?page=...`)

### Integration with Next.js App Router
Pagination state is persisted directly in the URL search parameters (`?page=1`, `?page=2`, `?search=wat&page=2`):

```javascript
const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();

const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

const handlePageChange = (newPage) => {
  const params = new URLSearchParams(searchParams.toString());
  if (newPage > 1) {
    params.set("page", String(newPage));
  } else {
    params.delete("page");
  }
  router.push(`${pathname}?${params.toString()}`, { scroll: false });
};
```

### Benefits of Query String Pagination
1. **Shareable & Bookmarkable**: URLs like `http://localhost:3000/menu?page=2` or `http://localhost:3000/menu?search=wat&page=1` can be shared and refreshed without state loss.
2. **Back/Forward Navigation**: Standard browser back and forward buttons navigate across pages seamlessly.
3. **SWR Cache Integration**: Because `currentPage` is included in the SWR key (`/api/dishes?search=...&page=${currentPage}`), pages already visited are cached and load instantaneously.

---

## 🧪 Verification Checklist

| Step | Action | Expected Network Tab / UI Result |
| :--- | :--- | :--- |
| **1. Shared Fetcher** | Check `lib/fetcher.js` | Exports reusable `fetcher` with error `.info` and `.status` handling. |
| **2. useSWR Order Status** | Visit `/order-status/AE-10001` | No `useEffect` or `useState` used for polling; rendered cleanly with SWR. |
| **3. Polling** | Keep Network tab open on `/order-status/AE-10001` | Requests to `GET /api/orders/AE-10001` arrive every 3 seconds. |
| **4. Server Fallback** | Reload `/order-status/AE-10001` with DevTools "Disable cache" | HTML arrives pre-populated with order details; no initial blank state. |
| **5. Null SWR Key** | Visit `/menu` with empty search box | SWR diagnostic shows `null (Conditional fetching idle)`; no search queries fired. |
| **6. keepPreviousData** | Type `"doro"` in search box on `/menu` | List smoothly transitions from full menu to search results without empty flashing. |
| **7. URL Paging** | Click "Next" or "Page 2" button on `/menu` | URL changes to `/menu?page=2`; items update with query string synchronization. |
