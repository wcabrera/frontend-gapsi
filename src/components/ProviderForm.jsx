import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';

/**
 * Formulario para agregar o editar un proveedor
 * @param {Object} props - Props del componente
 * @param {boolean} props.open - Estado de apertura del modal
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onSubmit - Función que se ejecuta al enviar el formulario
 * @param {Object} props.provider - Proveedor a editar (null para nuevo)
 * @param {boolean} props.loading - Estado de carga
 */
const ProviderForm = ({ open, onClose, onSubmit, provider = null, loading = false }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    razonSocial: '',
    direccion: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (provider) {
      setFormData({
        nombre: provider.nombre || '',
        razonSocial: provider.razonSocial || '',
        direccion: provider.direccion || '',
      });
    } else {
      setFormData({
        nombre: '',
        razonSocial: '',
        direccion: '',
      });
    }
    setErrors({});
  }, [provider, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.razonSocial.trim()) {
      newErrors.razonSocial = 'La razón social es obligatoria';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <i className={`fas fa-${provider ? 'edit' : 'plus'}`}></i>{' '}
        {provider ? 'Editar Proveedor' : 'Nuevo Proveedor'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre *"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.nombre}
            onChange={handleChange}
            error={!!errors.nombre}
            helperText={errors.nombre}
            disabled={loading}
          />
          <TextField
            margin="dense"
            name="razonSocial"
            label="Razón Social *"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.razonSocial}
            onChange={handleChange}
            error={!!errors.razonSocial}
            helperText={errors.razonSocial}
            disabled={loading}
          />
          <TextField
            margin="dense"
            name="direccion"
            label="Dirección *"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={formData.direccion}
            onChange={handleChange}
            error={!!errors.direccion}
            helperText={errors.direccion}
            disabled={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProviderForm;
