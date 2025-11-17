import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import WelcomePage from './pages/WelcomePage';
import ProvidersPage from './pages/ProvidersPage';
import './styles/global.css';

/**
 * Componente principal de la aplicación
 * Configura las rutas y el layout general
 */
function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          {/* Ruta principal - Página de bienvenida */}
          <Route exact path="/" component={WelcomePage} />

          {/* Ruta de gestión de proveedores */}
          <Route path="/providers" component={ProvidersPage} />

          {/* Ruta 404 - Redirige al home */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
