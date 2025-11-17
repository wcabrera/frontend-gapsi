import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProviders,
  addProvider,
  modifyProvider,
  removeProvider,
  clearError,
  clearSuccessMessage,
} from '../store/providersSlice';
import { Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Pagination, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProvidersTable from '../components/ProvidersTable';
import ProviderForm from '../components/ProviderForm';
import '../styles/ProvidersPage.css';

/**
 * Página principal de gestión de proveedores
 * Incluye listado, creación, edición y eliminación de proveedores
 * Optimizada con useCallback para prevenir re-renders innecesarios
 */
const ProvidersPage = () => {
  const dispatch = useDispatch();
  const { list, loading, error, successMessage, totalPages, totalElements } = useSelector((state) => state.providers);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Paginación de 10 en 10
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Cargar proveedores iniciales
    if (currentPage === 0) {
      dispatch(fetchProviders({ page: 0, size: itemsPerPage }));
    }
  }, [dispatch, itemsPerPage]);

  // Actualizar hasMore cuando cambian los datos
  useEffect(() => {
    if (totalPages > 0) {
      setHasMore(currentPage < totalPages - 1);
    }
  }, [currentPage, totalPages]);

  // Efecto para mostrar mensajes de éxito
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

  // Efecto para mostrar mensajes de error
  useEffect(() => {
    if (error) {
      toast.error(typeof error === 'string' ? error : 'Ha ocurrido un error', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Memoizar funciones para evitar re-renders de ProvidersTable
  const handleOpenForm = useCallback((provider = null) => {
    setSelectedProvider(provider);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setSelectedProvider(null);
  }, []);

  const handleSubmitForm = useCallback(async (formData) => {
    try {
      if (selectedProvider) {
        // Editar proveedor existente - AQUÍ SE LLAMA AL UPDATE
        await dispatch(modifyProvider({ id: selectedProvider.id, providerData: formData })).unwrap();
      } else {
        // Crear nuevo proveedor
        await dispatch(addProvider(formData)).unwrap();
      }
      handleCloseForm();
    } catch (err) {
      // El error ya se maneja en el slice y se mostrará en el toast
      console.error('Error al guardar proveedor:', err);
    }
  }, [selectedProvider, dispatch, handleCloseForm]);

  const handleOpenDeleteDialog = useCallback((provider) => {
    setProviderToDelete(provider);
    setDeleteDialogOpen(true);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
    setProviderToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (providerToDelete) {
      try {
        await dispatch(removeProvider(providerToDelete.id)).unwrap();
        handleCloseDeleteDialog();
      } catch (err) {
        console.error('Error al eliminar proveedor:', err);
      }
    }
  }, [providerToDelete, dispatch, handleCloseDeleteDialog]);

  // Manejar cambio de página (para botones de paginación)
  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value - 1); // Material-UI Pagination usa base 1, backend usa base 0
    // Scroll hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Cargar más datos (Infinite Scroll)
  const loadMoreData = useCallback(async () => {
    if (isLoadingMore || !hasMore || loading) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      await dispatch(fetchProviders({
        page: nextPage,
        size: itemsPerPage,
        append: true // Flag para indicar que debe anexar, no reemplazar
      })).unwrap();
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error al cargar más datos:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, loading, currentPage, itemsPerPage, dispatch]);

  return (
    <div className="providers-page">
      <ToastContainer />

      <div className="container-fluid">
        {/* Header de la página */}
        <div className="page-header">
          <div>
            <h2 className="page-title">
              <i className="fas fa-users"></i> Gestión de Proveedores
            </h2>
            <p className="page-subtitle">
              Administra tu catálogo de proveedores
            </p>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<i className="fas fa-plus"></i>}
            onClick={() => handleOpenForm()}
            className="add-button"
          >
            Nuevo Proveedor
          </Button>
        </div>

        {/* Indicador de carga inicial */}
        {loading && list.length === 0 && (
          <div className="loading-container">
            <CircularProgress />
            <p>Cargando proveedores...</p>
          </div>
        )}

        {/* Tabla de proveedores con virtual scroll */}
        {!loading || list.length > 0 ? (
          <div className="table-container">
            <div className="table-info">
              <span className="total-count">
                <i className="fas fa-database"></i> Total: {totalElements || list.length} proveedor(es)
                {totalElements > 0 && (
                  <span className="page-info">
                    {' '}(Mostrando página {currentPage + 1} de {totalPages || 1})
                  </span>
                )}
              </span>
              <span className="virtual-scroll-info">
                <i className="fas fa-bolt"></i> Virtual Scroll habilitado con react-window
              </span>
            </div>
            <ProvidersTable
              providers={list}
              onEdit={handleOpenForm}
              onDelete={handleOpenDeleteDialog}
              onLoadMore={loadMoreData}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
            />
 
          </div>
        ) : null}

        {/* Formulario de agregar/editar */}
        <ProviderForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          provider={selectedProvider}
          loading={loading}
        />

        {/* Dialog de confirmación de eliminación */}
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>
            <i className="fas fa-exclamation-triangle"></i> Confirmar Eliminación
          </DialogTitle>
          <DialogContent>
            <p>
              ¿Estás seguro de que deseas eliminar al proveedor{' '}
              <strong>{providerToDelete?.nombre}</strong>?
            </p>
            <p className="text-muted">Esta acción no se puede deshacer.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} disabled={loading}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <i className="fas fa-trash"></i>}
            >
              {loading ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProvidersPage;
