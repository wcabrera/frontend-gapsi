import axiosClient from './axiosClient';

/**
 * Servicio para obtener la versión de la aplicación
 * @returns {Promise} Promesa con la versión de la aplicación
 */
export const getVersion = async () => {
  try {
    const response = await axiosClient.get('/api/version');
    return response.data;
  } catch (error) {
    throw error;
  }
};
