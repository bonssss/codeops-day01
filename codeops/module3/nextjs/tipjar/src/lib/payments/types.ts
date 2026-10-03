export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export interface InitiatePaymentParams {
  tipId: string;
  amount: number;
  currency: string;
  supporterName?: string | null;
  supporterEmail?: string | null;
  paymentMethod?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentInitiationResult {
  success: boolean;
  transactionReference: string;
  status: PaymentStatus;
  provider: string;
  checkoutUrl?: string;
  message?: string;
  metadata?: Record<string, unknown>;
}

export interface VerifyPaymentParams {
  transactionReference: string;
  simulateOutcome?: "SUCCESS" | "FAILED";
}

export interface PaymentVerificationResult {
  success: boolean;
  status: PaymentStatus;
  transactionReference: string;
  amount: number;
  currency: string;
  paidAt?: Date;
  rawResponse?: Record<string, unknown>;
  message?: string;
}

export interface IPaymentProvider {
  name: string;
  initiatePayment(params: InitiatePaymentParams): Promise<PaymentInitiationResult>;
  getPaymentStatus(transactionReference: string): Promise<PaymentStatus>;
  verifyPayment(params: VerifyPaymentParams): Promise<PaymentVerificationResult>;
}
