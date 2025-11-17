import React from 'react';
import Header from '../components/Header';
import '../styles/MainLayout.css';

/**
 * Layout principal de la aplicación
 * Incluye el header fijo y el área de contenido
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido a renderizar
 */
const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
