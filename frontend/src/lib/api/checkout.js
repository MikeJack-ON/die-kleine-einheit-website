import { apiClient } from "./client";

export async function startCheckout(payload) {
  const { data } = await apiClient.post("/payments/checkout", payload);
  return data; // { url, session_id, booking_id }
}

export async function getCheckoutStatus(sessionId) {
  const { data } = await apiClient.get(`/payments/status/${sessionId}`);
  return data;
}
