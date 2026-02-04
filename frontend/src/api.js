import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the token to the header
api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (_e) {
        // localStorage unavailable (private browsing, etc.)
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor: normalize errors and handle non-JSON responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data && typeof error.response.data === 'string') {
            // Server returned HTML or plain text (e.g., 502/504 error page)
            error.response.data = { error: 'Server error. Please try again.' };
        } else if (!error.response?.data?.error && error.message) {
            error.response = error.response || {};
            error.response.data = error.response.data || {};
            error.response.data.error = error.response.data.error || (error.code === 'ERR_NETWORK' ? 'Network error. Check your connection.' : 'Something went wrong. Please try again.');
        }
        return Promise.reject(error);
    }
);

export default api;
