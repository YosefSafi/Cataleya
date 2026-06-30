import "dotenv/config";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

async function createChargeViaCoinbase({ orderId, name, amount }) {
  const res = await fetch("https://api.commerce.coinbase.com/charges", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CC-Api-Key": process.env.COINBASE_COMMERCE_API_KEY,
      "X-CC-Version": "2018-03-22",
    },
    body: JSON.stringify({
      name,
      description: `Cattleya Labs order ${orderId}`,
      pricing_type: "fixed_price",
      local_price: { amount: amount.toFixed(2), currency: "USD" },
      metadata: { order_id: orderId },
      redirect_url: `${FRONTEND_URL}/order/${orderId}`,
      cancel_url: `${FRONTEND_URL}/order/${orderId}`,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || "Coinbase Commerce charge creation failed");
  }
  return { chargeId: data.data.id, hostedUrl: data.data.hosted_url };
}

// Local-dev stand-in for Coinbase Commerce: lets the full checkout flow be exercised
// (create order -> "pay" -> webhook-equivalent confirms it) without a real account.
function createStubCharge({ orderId }) {
  const chargeId = `stub_${orderId}`;
  const hostedUrl = `${FRONTEND_URL}/dev/crypto-stub/${orderId}`;
  return { chargeId, hostedUrl };
}

export async function createCryptoCharge({ orderId, name, amount }) {
  if (process.env.CRYPTO_PROVIDER === "coinbase") {
    return createChargeViaCoinbase({ orderId, name, amount });
  }
  return createStubCharge({ orderId });
}

export function isStubMode() {
  return process.env.CRYPTO_PROVIDER !== "coinbase";
}
