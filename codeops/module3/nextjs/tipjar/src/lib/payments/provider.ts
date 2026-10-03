import { IPaymentProvider } from "./types";
import { MockPaymentProvider } from "./mock-provider";

export * from "./types";
export * from "./mock-provider";

export function getPaymentProvider(providerName: string = "MOCK_PAY"): IPaymentProvider {
  switch (providerName.toUpperCase()) {
    case "MOCK_PAY":
    default:
      return new MockPaymentProvider();
  }
}
