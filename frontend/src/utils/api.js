// Utility for API calls (attach JWT automatically)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const apiFetch = async (url, options = {}, token = null) => {
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const res = await fetch(fullUrl, { ...options, headers });
  return res;
};
