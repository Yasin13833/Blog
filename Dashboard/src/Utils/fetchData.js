import { store } from "../Store";
import { removeToken } from "../Store/Slice/auth";

const API_BASE = (import.meta.env.VITE_BASE_API || "http://localhost:5000/api").replace(/\/$/, "");

export const getApiBase = () => API_BASE;
export const getServerOrigin = () => API_BASE.replace(/\/api\/?$/, "");
export const resolveMediaUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${getServerOrigin()}${url.startsWith("/") ? "" : "/"}${url}`;
};

const safeJson = async (response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { success: false, message: text || "پاسخ نامعتبر از سرور", code: "INVALID_RESPONSE" };
  }
};

const request = async (url, option = {}, isUpload = false) => {
  const token = store.getState()?.auth?.token;
  const headers = {
    ...(token ? { authorization: `Bearer ${token}` } : {}),
    ...(!isUpload && option.body ? { "Content-Type": "application/json" } : {}),
    ...(option.headers || {}),
  };

  try {
    const response = await fetch(`${API_BASE}${url}`, { ...option, headers });
    const data = (await safeJson(response)) || {
      success: response.ok,
      message: response.ok ? "درخواست با موفقیت انجام شد" : "خطا در پاسخ سرور",
      data: null,
    };

    if (response.status === 401 && ["AUTH_REQUIRED", "INVALID_OR_EXPIRED_TOKEN"].includes(data?.code)) {
      store.dispatch(removeToken());
      if (window.location.pathname !== "/auth") window.location.replace("/auth");
    }

    return { ...data, httpStatus: response.status };
  } catch (error) {
    return {
      success: false,
      message: "ارتباط با سرور برقرار نشد",
      code: "NETWORK_ERROR",
      errors: null,
      httpStatus: 0,
      detail: error?.message,
    };
  }
};

export const fetchData = (url, option = {}) => request(url, option, false);
export const fetchUpload = (url, option = {}) => request(url, option, true);

export const toQueryString = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.set(key, String(value));
  });
  return search.toString();
};
