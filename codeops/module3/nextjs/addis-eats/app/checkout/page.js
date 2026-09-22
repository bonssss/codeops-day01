import { cookies } from "next/headers";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  // Reading cookies opts this route into dynamic server-rendering at request time
  const cookieStore = await cookies();
  const promoCode = cookieStore.get("promo_code")?.value || null;
  const sessionId = cookieStore.get("session_id")?.value || null;

  return <CheckoutForm initialPromo={promoCode} session={sessionId} />;
}
