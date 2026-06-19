import { apiClient } from "./client";

export async function getWorkshop(slug) {
  const { data } = await apiClient.get(`/catalog/workshops/${slug}`);
  return data;
}
