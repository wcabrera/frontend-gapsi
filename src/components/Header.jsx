import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Header.css';

/**
 * Componente Header de la aplicación
 * Muestra el logo y título de e-Commerce Gapsi
 */
const Header = () => {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <header className="app-header">
      <div className="container-fluid">
        <div className="header-content">
          <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img
              src="/logo.png"
              alt="Gapsi Logo"
              className="header-logo"
              onError={(e) => {
                // Fallback si no se encuentra el logo
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="logo-placeholder" style={{ display: 'none' }}>
              <i className="fas fa-store" style={{ fontSize: '2rem', color: '#fff' }}></i>
            </div>
          </div>
          <h1 className="header-title">e-Commerce Gapsi</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
