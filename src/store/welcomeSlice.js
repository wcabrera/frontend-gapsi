import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWelcomeMessage } from '../api/welcomeService';
import { getVersion } from '../api/versionService';

/**
 * Thunk asíncrono para obtener el mensaje de bienvenida
 */
export const fetchWelcomeMessage = createAsyncThunk(
  'welcome/fetchMessage',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getWelcomeMessage();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al obtener mensaje de bienvenida');
    }
  }
);

/**
 * Thunk asíncrono para obtener la versión de la aplicación
 */
export const fetchVersion = createAsyncThunk(
  'welcome/fetchVersion',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getVersion();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al obtener versión');
    }
  }
);

const initialState = {
  message: '',
  version: '',
  loading: false,
  error: null,
};

/**
 * Slice de Redux para manejar el estado de bienvenida y versión
 */
const welcomeSlice = createSlice({
  name: 'welcome',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Casos para fetchWelcomeMessage
      .addCase(fetchWelcomeMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWelcomeMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = typeof action.payload === 'string' ? action.payload : action.payload.message || '';
      })
      .addCase(fetchWelcomeMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Casos para fetchVersion
      .addCase(fetchVersion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVersion.fulfilled, (state, action) => {
        state.loading = false;
        state.version = typeof action.payload === 'string' ? action.payload : action.payload.version || '';
      })
      .addCase(fetchVersion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = welcomeSlice.actions;
export default welcomeSlice.reducer;
