import React, { memo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { IconButton, Tooltip } from '@mui/material';
import '../styles/ProvidersTable.css';

/**
 * Componente de fila individual memoizado
 * Se renderiza para cada elemento visible en la ventana virtual
 * Optimizado para prevenir re-renders innecesarios
 */
const ProviderRow = memo(({ index, style, data }) => {
  const { providers, onEdit, onDelete } = data;
  const provider = providers[index];

  // Protección contra datos undefined
  if (!provider) {
    return null;
  }

  return (
    <div className="table-row" style={style}>
      <div className="table-cell table-cell-id">{provider.id || index + 1}</div>
      <div className="table-cell table-cell-nombre">{provider.nombre}</div>
      <div className="table-cell table-cell-razon">{provider.razonSocial}</div>
      <div className="table-cell table-cell-direccion">{provider.direccion}</div>
      <div className="table-cell table-cell-actions">
        <Tooltip title="Editar">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEdit(provider)}
            className="action-button"
          >
            <i className="fas fa-edit"></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(provider)}
            className="action-button"
          >
            <i className="fas fa-trash"></i>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
});

ProviderRow.displayName = 'ProviderRow';

/**
 * Tabla virtualizada de proveedores usando react-window
 * Optimizada para renderizar grandes cantidades de datos
 * Soporta Infinite Scroll (carga automática al llegar al final)
 * @param {Object} props - Props del componente
 * @param {Array} props.providers - Lista de proveedores
 * @param {Function} props.onEdit - Función para editar un proveedor
 * @param {Function} props.onDelete - Función para eliminar un proveedor
 * @param {Function} props.onLoadMore - Función para cargar más datos (Infinite Scroll)
 * @param {boolean} props.hasMore - Si hay más datos para cargar
 * @param {boolean} props.isLoadingMore - Si está cargando más datos
 */
const ProvidersTable = ({ providers, onEdit, onDelete, onLoadMore, hasMore, isLoadingMore }) => {
  // Memoizar los datos que se pasan al Row para evitar re-renders
  const itemData = useCallback(() => ({
    providers,
    onEdit,
    onDelete,
  }), [providers, onEdit, onDelete]);

  // Detectar cuando el usuario llega cerca del final (Infinite Scroll)
  const handleItemsRendered = useCallback(({ visibleStopIndex }) => {
    // Si está cerca del final (últimos 3 items) y hay más datos, cargar
    if (hasMore && !isLoadingMore && visibleStopIndex >= providers.length - 3) {
      onLoadMore?.();
    }
  }, [hasMore, isLoadingMore, providers.length, onLoadMore]);

  return (
    <div className="providers-table-container">
      {/* Header de la tabla */}
      <div className="table-header">
        <div className="table-cell table-cell-id">ID</div>
        <div className="table-cell table-cell-nombre">Nombre</div>
        <div className="table-cell table-cell-razon">Razón Social</div>
        <div className="table-cell table-cell-direccion">Dirección</div>
        <div className="table-cell table-cell-actions">Acciones</div>
      </div>

      {/* Tabla virtualizada con react-window - OPTIMIZADA + INFINITE SCROLL */}
      {providers.length > 0 ? (
        <>
          <List
            height={500} // Altura de la ventana de scroll (ajustable)
            itemCount={providers.length} // Total de items
            itemSize={60} // Altura de cada fila en píxeles
            width="100%" // Ancho completo
            itemData={itemData()} // Data pasada a cada Row (memoizada)
            onItemsRendered={handleItemsRendered} // Detecta scroll al final
            className="virtual-list"
          >
            {ProviderRow}
          </List>

          {/* Indicador de carga para Infinite Scroll */}
          {isLoadingMore && (
            <div className="loading-more-container">
              <div className="loading-more-content">
                <i className="fas fa-spinner fa-spin"></i>
                <span>Cargando más proveedores...</span>
              </div>
            </div>
          )}

          {/* Indicador de fin de datos */}
          {!hasMore && providers.length > 0 && (
            <div className="end-of-data">
              <i className="fas fa-check-circle"></i>
              <span>Has visto todos los proveedores</span>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <i className="fas fa-inbox fa-3x"></i>
          <p>No hay proveedores registrados</p>
        </div>
      )}
    </div>
  );
};

export default ProvidersTable;
