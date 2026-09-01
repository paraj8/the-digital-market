
const axios = require("axios");

const CASHFREE_BASE_URL =
  "https://sandbox.cashfree.com/pg";

const CASHFREE_API_VERSION =
  "2025-01-01";

/*
====================================
CASHFREE HEADERS
====================================
*/

const getCashfreeHeaders = () => ({
  "Content-Type":
    "application/json",

  "x-api-version":
    CASHFREE_API_VERSION,

  "x-client-id":
    process.env.CASHFREE_KEY_ID,

  "x-client-secret":
    process.env.CASHFREE_KEY_SECRET,
});

/*
====================================
CREATE CASHFREE PAYMENT ORDER
====================================
*/

const createCashfreeOrder = async ({
  orderId,
  amount,
  customer,
  returnUrl,
  notifyUrl,
}) => {
  try {
    const response =
      await axios.post(
        `${CASHFREE_BASE_URL}/orders`,
        {
          order_id: orderId,

          order_amount: amount,

          order_currency: "INR",

          customer_details: {
            customer_id:
              customer.id,

            customer_name:
              customer.name,

            customer_email:
              customer.email,

            customer_phone:
              customer.phone,
          },

          order_meta: {
            return_url:
              returnUrl,

            notify_url:
              notifyUrl,
          },
        },
        {
          headers:
            getCashfreeHeaders(),
        }
      );

    return response.data;
  } catch (error) {
    console.error(
      "Cashfree order creation failed:",
      error.response?.data ||
        error.message
    );

    throw new Error(
      "Failed to create Cashfree payment order"
    );
  }
};

/*
====================================
GET CASHFREE PAYMENT STATUS
====================================
*/

const getCashfreePaymentStatus =
  async (orderId) => {
    try {
      const response =
        await axios.get(
          `${CASHFREE_BASE_URL}/orders/${orderId}`,
          {
            headers:
              getCashfreeHeaders(),
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Cashfree payment status check failed:",
        error.response?.data ||
          error.message
      );

      throw new Error(
        "Failed to check Cashfree payment status"
      );
    }
  };

module.exports = {
  createCashfreeOrder,
  getCashfreePaymentStatus,
};

