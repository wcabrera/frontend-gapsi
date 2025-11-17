import axiosClient from './axiosClient';

/**
 * Obtiene la lista paginada de proveedores
 * @param {number} page - Número de página (opcional)
 * @param {number} size - Tamaño de página (opcional)
 * @returns {Promise} Promesa con la lista de proveedores
 */
export const getProviders = async (page = 0, size = 20) => {
  try {
    const response = await axiosClient.get('/providers', {
      params: { page, size }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Crea un nuevo proveedor
 * @param {Object} providerData - Datos del proveedor
 * @param {string} providerData.nombre - Nombre del proveedor
 * @param {string} providerData.razonSocial - Razón social
 * @param {string} providerData.direccion - Dirección
 * @returns {Promise} Promesa con el proveedor creado
 */
export const createProvider = async (providerData) => {
  try {
    const response = await axiosClient.post('/providers', providerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Actualiza un proveedor existente
 * @param {number} id - ID del proveedor
 * @param {Object} providerData - Datos actualizados del proveedor
 * @returns {Promise} Promesa con el proveedor actualizado
 */
export const updateProvider = async (id, providerData) => {
  try {
    const response = await axiosClient.put(`/providers/${id}`, providerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Elimina un proveedor
 * @param {number} id - ID del proveedor a eliminar
 * @returns {Promise} Promesa con la confirmación de eliminación
 */
export const deleteProvider = async (id) => {
  try {
    const response = await axiosClient.delete(`/providers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
