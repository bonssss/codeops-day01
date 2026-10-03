# ☕ TipJar - Modern Full-Stack Tipping Platform

TipJar is a production-quality full-stack creator tipping platform built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, and **PostgreSQL**.

---

## 🌟 Key Features

### 1. 🎨 Polished SaaS Landing Page
- Hero section with live preview mockup
- Step-by-step "How It Works" guide
- Feature breakdown
- Creator showcase with 1-click tip access to live profiles
- Responsive design with dark/light mode aesthetic

### 2. 🔐 Secure Authentication & Session Management
- Fast email & password registration with unique `@username` handle reservation
- JWT session cookies via `jose` and `bcryptjs` password hashing
- Protected dashboard routes with server-side authorization
- Change password & account management

### 3. 📱 Public Creator Tipping Pages (`/tip/[username]`)
- Dynamic creator profile (avatar, bio, location, verified badge, social links)
- Predefined quick amounts (e.g. 50 ETB, 100 ETB, 200 ETB, 500 ETB)
- Pre-selected amount via URL parameter (`/tip/bonsa?amount=200`)
- Custom amount input
- Optional supporter message and anonymous tipping toggle
- Active creator goal progress tracker
- Live Supporter Wall displaying recent completed tips
- QR Code generation & instant PNG download
- One-click copy link sharing

### 4. 💳 Mock Payment System Abstraction
- Pluggable `IPaymentProvider` architecture:
  ```typescript
  interface IPaymentProvider {
    initiatePayment(params: InitiatePaymentParams): Promise<PaymentInitiationResult>;
    getPaymentStatus(transactionReference: string): Promise<PaymentStatus>;
    verifyPayment(params: VerifyPaymentParams): Promise<PaymentVerificationResult>;
  }
  ```
- `MockPaymentProvider` simulating pending, success, and declined states
- Unique transaction reference generator (e.g., `TJ-MOCK-XXXX-XXXX`)
- Server-side verification and atomic database updates
- Automatic goal progress calculation when tips complete

### 5. 📊 Creator Dashboard & Analytics
- KPI statistics: Lifetime tips received, Month-to-date total, Total unique supporters, Average tip size
- Recharts visualizations:
  - Daily revenue trend area chart
  - Monthly revenue bar chart
  - Tip size distribution breakdown
  - Supporter privacy ratio (Public vs Anonymous)
  - Payment method channels breakdown
- Transaction history table with search, status filters, date sorting, and CSV export
- Goal creation & milestone tracking

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Server Actions, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Class Variance Authority, clsx, tailwind-merge
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **QR Code**: qrcode
- **Confetti**: canvas-confetti

---

## 🚀 Getting Started

### 1. Clone / Navigate to directory
```bash
cd tipjar
```

### 2. Configure Environment Variables
Ensure `.env` contains your PostgreSQL database URL:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tipjar?schema=public"
AUTH_SECRET="tipjar-ultra-secure-jwt-secret-key-32-chars-minimum-2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Push Database Schema & Generate Client
```bash
npm run prisma:push
```

### 4. Seed Realistic Data
Populate 5 users, 3 creator profiles (Bonsa, Sara, Abel), 40+ tips, goals, and transactions:
```bash
npm run prisma:seed
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Demo Creator Accounts

All demo accounts use password: `password123`

| Creator | Handle | Tipping URL | Focus |
|---|---|---|---|
| **Bonsa Diriba** | `@bonsa` | `/tip/bonsa` | Full Stack Engineer & Open Source |
| **Sara Bekele** | `@sarab` | `/tip/sarab` | Digital Illustrator & UX Designer |
| **Abel Tadesse** | `@abelt` | `/tip/abelt` | Indie Musician & Sound Engineer |
