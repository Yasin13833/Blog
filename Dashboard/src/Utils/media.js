import { fetchData } from "./fetchData";

export const deleteMediaByUrl = async (url) => {
  if (!url || !url.startsWith("/upload/")) return null;
  const filename = url.split("/").pop();
  if (!filename) return null;
  return fetchData(`/admin/media/${encodeURIComponent(filename)}`, { method: "DELETE" });
};
