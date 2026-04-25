import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // for cookies
});

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await axiosInstance.get('/auth/refresh');
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
