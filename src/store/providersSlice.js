import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
} from '../api/providersService';

/**
 * Thunk asíncrono para obtener la lista de proveedores
 * @param {Object} params - Parámetros de paginación
 * @param {number} params.page - Número de página
 * @param {number} params.size - Tamaño de página
 * @param {boolean} params.append - Si es true, anexa los datos en lugar de reemplazar
 */
export const fetchProviders = createAsyncThunk(
  'providers/fetchProviders',
  async ({ page = 0, size = 100, append = false }, { rejectWithValue }) => {
    try {
      const data = await getProviders(page, size);
      return { ...data, append }; // Incluir flag append en el resultado
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al obtener proveedores');
    }
  }
);

/**
 * Thunk asíncrono para crear un nuevo proveedor
 */
export const addProvider = createAsyncThunk(
  'providers/addProvider',
  async (providerData, { rejectWithValue }) => {
    try {
      const data = await createProvider(providerData);
      return data;
    } catch (error) {
      // El backend puede devolver un mensaje específico si el proveedor ya existe
      const errorMessage = error.response?.data?.message ||
                          error.response?.data?.error ||
                          error.response?.data ||
                          'Error al crear proveedor';
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Thunk asíncrono para actualizar un proveedor existente
 */
export const modifyProvider = createAsyncThunk(
  'providers/modifyProvider',
  async ({ id, providerData }, { rejectWithValue }) => {
    try {
      const data = await updateProvider(id, providerData);
      return { id, data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al actualizar proveedor');
    }
  }
);

/**
 * Thunk asíncrono para eliminar un proveedor
 */
export const removeProvider = createAsyncThunk(
  'providers/removeProvider',
  async (id, { rejectWithValue }) => {
    try {
      await deleteProvider(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al eliminar proveedor');
    }
  }
);

const initialState = {
  list: [],
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,
  pageSize: 100,
  loading: false,
  error: null,
  successMessage: null,
};

/**
 * Slice de Redux para manejar el estado de proveedores
 */
const providersSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Casos para fetchProviders
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.loading = false;
        const { append, ...data } = action.payload;

        // Manejo flexible de la respuesta (array o objeto con paginación)
        let newItems = [];
        if (Array.isArray(data)) {
          newItems = data;
          state.totalElements = data.length;
        } else {
          newItems = data.content || data.data || [];
          state.totalElements = data.totalElements || newItems.length;
          state.totalPages = data.totalPages || 1;
          state.currentPage = data.number || 0;
        }

        // Si append es true, concatenar; si no, reemplazar
        if (append) {
          // Infinite Scroll: anexar nuevos items
          state.list = [...state.list, ...newItems];
        } else {
          // Paginación normal: reemplazar items
          state.list = newItems;
        }
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Casos para addProvider
      .addCase(addProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload); // Agregar al inicio
        state.totalElements += 1;
        state.successMessage = 'Proveedor agregado exitosamente';
      })
      .addCase(addProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Casos para modifyProvider
      .addCase(modifyProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(modifyProvider.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload.data;
        }
        state.successMessage = 'Proveedor actualizado exitosamente';
      })
      .addCase(modifyProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Casos para removeProvider
      .addCase(removeProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(removeProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(p => p.id !== action.payload);
        state.totalElements -= 1;
        state.successMessage = 'Proveedor eliminado exitosamente';
      })
      .addCase(removeProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccessMessage, setPageSize } = providersSlice.actions;
export default providersSlice.reducer;
