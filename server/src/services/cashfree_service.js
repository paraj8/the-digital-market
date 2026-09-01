const axios = require("axios");

const CASHFREE_BASE_URL =
  "https://sandbox.cashfree.com/pg";

const CASHFREE_API_VERSION =
  "2025-01-01";

const createCashfreeOrder = async ({
  orderId,
  amount,
  customerId,
  customerName,
  customerEmail,
  customerPhone,
  returnUrl,
  notifyUrl,
}) => {
  try {
    const response = await axios.post(
      `${CASHFREE_BASE_URL}/orders`,
      {
        order_id: orderId,

        order_amount: Number(amount),

        order_currency: "INR",

        customer_details: {
          customer_id: customerId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        },

        order_meta: {
          return_url: returnUrl,
          notify_url: notifyUrl,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",

          "x-api-version":
            CASHFREE_API_VERSION,

          "x-client-id":
            process.env.CASHFREE_KEY_ID,

          "x-client-secret":
            process.env.CASHFREE_KEY_SECRET,

          "x-request-id":
            `tdm-${Date.now()}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Cashfree Create Order Error:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
};

module.exports = {
  createCashfreeOrder,
};