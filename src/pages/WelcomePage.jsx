import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchWelcomeMessage, fetchVersion } from '../store/welcomeSlice';
import { Button, CircularProgress } from '@mui/material';
import '../styles/WelcomePage.css';

/**
 * Página de bienvenida de la aplicación
 * Muestra mensaje de bienvenida y versión consumidos desde el backend
 */
const WelcomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { message, version, loading, error } = useSelector((state) => state.welcome);

  useEffect(() => {
    // Obtener mensaje de bienvenida y versión al montar el componente
    dispatch(fetchWelcomeMessage());
    dispatch(fetchVersion());
  }, [dispatch]);

  const handleContinue = () => {
    history.push('/providers');
  };

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <div className="welcome-card">
          {/* Logo de Gapsi */}
          <div className="candidate-image-container">
            <img
              src="/logo.png"
              alt="Logo Gapsi"
              className="candidate-image"
              onError={(e) => {
                // Fallback si la imagen no carga
                e.target.src = 'https://ui-avatars.com/api/?name=Gapsi&size=200&background=0D47A1&color=fff';
              }}
            />
          </div>

          {/* Contenido de bienvenida */}
          <div className="welcome-content">
            {loading && (
              <div className="loading-container">
                <CircularProgress />
                <p>Cargando información...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle"></i> {error}
              </div>
            )}

            {!loading && !error && (
              <>
                <h1 className="welcome-title">
                  <i className="fas fa-hand-wave"></i>{' '}
                  {message || 'Bienvenido'}
                </h1>

                <div className="version-info">
                  <i className="fas fa-code-branch"></i>
                  <span>Versión: {version || 'N/A'}</span>
                </div>

                <div className="welcome-description">
                  <p>
                    Bienvenido al sistema de gestión de proveedores de e-Commerce Gapsi.
                    Esta plataforma te permite administrar tu catálogo de proveedores
                    de manera eficiente y profesional.
                  </p>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleContinue}
                  startIcon={<i className="fas fa-arrow-right"></i>}
                  className="continue-button"
                >
                  Continuar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
