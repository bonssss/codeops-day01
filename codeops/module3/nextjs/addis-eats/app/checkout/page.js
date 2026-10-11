import { cookies } from "next/headers";
import CheckoutForm from "./CheckoutForm";

export const metadata = {
  title: "Secure Order Checkout",
  description:
    "Enter your delivery address and pay seamlessly via Telebirr, CBE Birr, or Cash on Delivery for swift fulfillment.",
};

export default async function CheckoutPage() {
  // Reading cookies opts this route into dynamic server-rendering at request time
  const cookieStore = await cookies();
  const promoCode = cookieStore.get("promo_code")?.value || null;
  const sessionId = cookieStore.get("session_id")?.value || null;

  return <CheckoutForm initialPromo={promoCode} session={sessionId} />;
}
