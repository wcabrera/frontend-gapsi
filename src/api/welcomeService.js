import axiosClient from './axiosClient';

/**
 * Servicio para obtener el mensaje de bienvenida
 * @returns {Promise} Promesa con el mensaje de bienvenida
 */
export const getWelcomeMessage = async () => {
  try {
    const response = await axiosClient.get('/api/welcome');
    return response.data;
  } catch (error) {
    throw error;
  }
};
