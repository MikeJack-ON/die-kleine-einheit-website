import { apiClient } from "./client";

export async function createBooking(payload) {
  const { data } = await apiClient.post("/bookings", payload);
  return data;
}
