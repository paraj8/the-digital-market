interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    handler: (response: unknown) => void
  ) => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void | Promise<void>;
  modal?: {
    ondismiss?: () => void;
  };
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

const RAZORPAY_SDK_URL =
  "https://checkout.razorpay.com/v1/checkout.js";

let sdkPromise: Promise<RazorpayConstructor> | null = null;

export const loadRazorpaySDK =
  async (): Promise<RazorpayConstructor> => {
    if (typeof window !== "undefined" && window.Razorpay) {
      return window.Razorpay;
    }

    if (sdkPromise) {
      return sdkPromise;
    }

    sdkPromise = new Promise<RazorpayConstructor>((resolve, reject) => {
      const existing = document.querySelector(
        `script[src="${RAZORPAY_SDK_URL}"]`
      );
      if (existing) {
        existing.addEventListener("load", () => {
          if (window.Razorpay) resolve(window.Razorpay);
          else reject(new Error("Razorpay SDK is unavailable"));
        });
        existing.addEventListener("error", () =>
          reject(new Error("Failed to load Razorpay SDK"))
        );
        return;
      }

      const script = document.createElement("script");
      script.src = RAZORPAY_SDK_URL;
      script.async = true;
      script.onload = () => {
        if (window.Razorpay) resolve(window.Razorpay);
        else reject(new Error("Razorpay SDK is unavailable"));
      };
      script.onerror = () =>
        reject(new Error("Failed to load Razorpay SDK"));
      document.head.appendChild(script);
    });

    return sdkPromise;
  };

export const openRazorpayCheckout = async ({
  keyId,
  razorpayOrderId,
  amount,
  currency,
  name,
  email,
  phone,
  onSuccess,
  onFailure,
}: {
  keyId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  name: string;
  email: string;
  phone?: string;
  onSuccess: (response: RazorpayResponse) => void | Promise<void>;
  onFailure?: () => void;
}) => {
  const Razorpay = await loadRazorpaySDK();
  const options: RazorpayOptions = {
    key: keyId,
    amount,
    currency,
    name: "The Digital Market",
    description: "Order payment",
    order_id: razorpayOrderId,
    handler: onSuccess,
    modal: {
      ondismiss: onFailure,
    },
    prefill: {
      name,
      email,
      contact: phone,
    },
    theme: {
      color: "#7c3aed",
    },
  };
  const checkout = new Razorpay(options);
  checkout.open();
};
