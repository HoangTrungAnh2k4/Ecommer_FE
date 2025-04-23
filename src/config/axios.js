import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL: import.meta.env.VITE_CLIENT_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// ✅ Request interceptor: thêm token
instance.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // lỗi config request hiếm khi xảy ra
    },
);

// ✅ Response interceptor: xử lý lỗi trả về từ server
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response?.data?.message == 'Access_token is expired or invalid' ||
            error.response?.data?.message == 'Authorization header is missing'
        ) {
            // Access token is expired or invalid
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        } else if (!error.response && error.request) {
            // Request was made but no response was received
            console.error('No response received:', error.request);
            toast.error('Không thể kết nối đến máy chủ');
        }

        return Promise.reject(error);
    },
);

export default instance;
