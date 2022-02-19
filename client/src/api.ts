const API_BASE_URL = 'http://localhost:5000/api/';
const headers = new Headers({
  'Content-Type': 'application/json',
});

const handleResponse = (res: any) => {
  if (res.status >= 200 && res.status < 300) {
    try {
      return res.json().catch(() => {});
    } catch {
      return Promise.reject(new Error());
    }
  } else if (res.status === 403) {
    window.location.replace(`/auth?redirectUri=${window.location.pathname}`);
  } else {
    return Promise.reject(new Error());
  }
};

export function getRequest<T>(path: string): Promise<T> {
  const accessToken = window.localStorage.getItem('access-token');
  if (accessToken) {
    headers.set('token', `bearer ${accessToken}`);
  }

  return fetch(`${API_BASE_URL}${path}`, {
    headers,
    // credentials: 'include'
  }).then((res) => handleResponse(res));
}

export function postRequest<T>(path: string, data: any): Promise<T> {
  let headers = new Headers({
    'Content-Type': 'application/json',
  });
  const accessToken = window.localStorage.getItem('access-token');
  if (accessToken) {
    headers.set('token', `bearer ${accessToken}`);
  }
  let body = typeof data == 'string' ? data : JSON.stringify(data);
  return fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    body,
    headers,
  }).then((res) => handleResponse(res));
}

export function deleteRequest<T>(path: string, data: any): Promise<T> {
  let headers = new Headers({
    'Content-Type': 'application/json',
  });
  let body = typeof data == 'string' ? data : JSON.stringify(data);
  return fetch(`${API_BASE_URL}${path}`, {
    method: 'DELETE',
    body,
    headers,
    credentials: 'include',
  }).then((res) => handleResponse(res));
}
