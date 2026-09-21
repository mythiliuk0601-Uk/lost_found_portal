const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json', ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}) }, ...options, body: options.body ? JSON.stringify(options.body) : undefined });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

export const api = {
  login: (body) => request('/auth/login', { method: 'POST', body }),
  register: (body) => request('/auth/register', { method: 'POST', body }),
  items: (query = '') => request(`/items${query ? `?${query}` : ''}`),
  item: (id) => request(`/items/${id}`),
  create: (type, body, token) => request(`/items/${type}`, { method: 'POST', body, token }),
  mine: (token) => request('/items/my-reports', { token }),
  returned: (id, token) => request(`/items/${id}/returned`, { method: 'PATCH', token })
};
