import { IPaymentProvider } from "./types";
import { MockPaymentProvider } from "./mock-provider";
import { ChapaPaymentProvider } from "./chapa-provider";

export * from "./types";
export * from "./mock-provider";
export * from "./chapa-provider";

export function getPaymentProvider(providerName: string = "CHAPA"): IPaymentProvider {
  switch (providerName.toUpperCase()) {
    case "CHAPA":
      return new ChapaPaymentProvider();
    case "MOCK_PAY":
    case "MOCK":
      return new MockPaymentProvider();
    default:
      return new ChapaPaymentProvider();
  }
}

