import { configureStore } from '@reduxjs/toolkit';
import welcomeReducer from './welcomeSlice';
import providersReducer from './providersSlice';

/**
 * Store de Redux configurado con Redux Toolkit
 * Combina todos los reducers de la aplicación
 */
const store = configureStore({
  reducer: {
    welcome: welcomeReducer,
    providers: providersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar estas rutas de acción en la verificación de serialización
        ignoredActions: ['your/action/type'],
        ignoredPaths: ['items.dates'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
