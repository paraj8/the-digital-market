
/*
====================================
CASHFREE SDK TYPES
====================================
*/

interface CashfreeCheckoutOptions {
  paymentSessionId: string;
}

interface CashfreeSDK {
  checkout: (
    options: CashfreeCheckoutOptions
  ) => Promise<unknown> | unknown;
}

interface CashfreeGlobal {
  Cashfree: (options: {
    mode: "sandbox" | "production";
  }) => CashfreeSDK;
}

/*
====================================
CASHFREE SDK CONFIG
====================================
*/

const CASHFREE_SDK_URL =
  "https://sdk.cashfree.com/js/v3/cashfree.js";

/*
====================================
LOAD CASHFREE SDK
====================================
*/

let sdkPromise:
  | Promise<CashfreeSDK>
  | null = null;

export const loadCashfreeSDK =
  async (): Promise<CashfreeSDK> => {
    /*
    Already loaded
    */

    if (
      typeof window !== "undefined" &&
      "Cashfree" in window
    ) {
      const cashfreeGlobal =
        window as typeof window &
          Partial<CashfreeGlobal>;

      if (
        cashfreeGlobal.Cashfree
      ) {
        return cashfreeGlobal.Cashfree({
          mode:
            import.meta.env
              .VITE_CASHFREE_MODE ===
            "production"
              ? "production"
              : "sandbox",
        });
      }
    }

    /*
    Prevent loading the
    script multiple times.
    */

    if (sdkPromise) {
      return sdkPromise;
    }

    sdkPromise =
      new Promise<CashfreeSDK>(
        (resolve, reject) => {
          /*
          Find existing script
          */

          const existingScript =
            document.querySelector(
              `script[src="${CASHFREE_SDK_URL}"]`
            );

          if (existingScript) {
            existingScript.addEventListener(
              "load",
              () => {
                initializeCashfree(
                  resolve,
                  reject
                );
              }
            );

            existingScript.addEventListener(
              "error",
              () => {
                reject(
                  new Error(
                    "Failed to load Cashfree SDK"
                  )
                );
              }
            );

            return;
          }

          /*
          Create script
          */

          const script =
            document.createElement(
              "script"
            );

          script.src =
            CASHFREE_SDK_URL;

          script.async = true;

          script.onload = () => {
            initializeCashfree(
              resolve,
              reject
            );
          };

          script.onerror = () => {
            reject(
              new Error(
                "Failed to load Cashfree SDK"
              )
            );
          };

          document.head.appendChild(
            script
          );
        }
      );

    return sdkPromise;
  };

/*
====================================
INITIALIZE CASHFREE
====================================
*/

const initializeCashfree = (
  resolve: (
    value: CashfreeSDK
  ) => void,
  reject: (
    reason?: unknown
  ) => void
) => {
  try {
    const cashfreeGlobal =
      window as typeof window &
        Partial<CashfreeGlobal>;

    if (
      !cashfreeGlobal.Cashfree
    ) {
      reject(
        new Error(
          "Cashfree SDK is unavailable"
        )
      );

      return;
    }

    const mode =
      import.meta.env
        .VITE_CASHFREE_MODE ===
      "production"
        ? "production"
        : "sandbox";

    const cashfree =
      cashfreeGlobal.Cashfree({
        mode,
      });

    resolve(cashfree);
  } catch (error) {
    reject(error);
  }
};

/*
====================================
OPEN CASHFREE CHECKOUT
====================================
*/

export const openCashfreeCheckout =
  async (
    paymentSessionId: string
  ) => {
    if (
      !paymentSessionId
    ) {
      throw new Error(
        "Cashfree payment session ID is required"
      );
    }

    const cashfree =
      await loadCashfreeSDK();

    return cashfree.checkout({
      paymentSessionId,
    });
  };
