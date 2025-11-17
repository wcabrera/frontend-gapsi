import axios from 'axios';

/**
 * Cliente Axios configurado con la URL base del backend
 * Centraliza la configuración para todas las peticiones HTTP
 */
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

/**
 * Interceptor de solicitudes
 * Permite añadir configuración global antes de cada petición
 */
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respuestas
 * Maneja errores globales de manera centralizada
 */
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores común
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de respuesta:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('Error de red:', error.request);
    } else {
      // Algo sucedió al configurar la solicitud
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
