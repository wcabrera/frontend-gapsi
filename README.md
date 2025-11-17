# e-Commerce Gapsi - Frontend React 17

Sistema de gestión de proveedores desarrollado en React 17 con Redux para la prueba técnica de Gapsi.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [APIs Consumidas](#apis-consumidas)
- [Arquitectura y Buenas Prácticas](#arquitectura-y-buenas-prácticas)

## ✨ Características

- ⚛️ React 17 con componentes funcionales y Hooks
- 🗃️ Redux con Redux Toolkit para manejo de estado global
- 🚀 Virtual Scroll con react-window para rendimiento óptimo
- 📡 Consumo de APIs REST con Axios
- 🎨 UI moderna con Material-UI y Bootstrap
- 🔔 Sistema de notificaciones con toasts
- 📱 Diseño responsive y adaptable
- ♿ Código limpio y bien documentado

## 🛠️ Tecnologías Utilizadas

### Obligatorias
- **React 17.0.2** - Librería de UI
- **Redux 1.9.7** - Manejo de estado global
- **React-Redux 8.1.3** - Integración React + Redux
- **Axios 1.6.2** - Cliente HTTP
- **HTML5, CSS3, ES6/ES7** - Estándares web

### Deseables
- **Bootstrap 5.3.2** (CDN) - Framework CSS
- **Font Awesome 6.5.1** (CDN) - Iconografía
- **Material-UI 5.14.20** - Componentes React
- **React Router DOM 5.3.4** - Enrutamiento
- **React Window 1.8.10** - Virtual scroll
- **React Toastify 9.1.3** - Notificaciones toast

## 📦 Requisitos Previos

- Node.js 14.x o superior
- npm 6.x o superior
- Backend corriendo en `http://localhost:8080`

## 🚀 Instalación

### Paso 1: Clonar o crear el proyecto

Si estás creando el proyecto desde cero:

```bash
# Crear proyecto con React 17
npx create-react-app gapsi-frontend

# Navegar al directorio
cd gapsi-frontend
```

### Paso 2: Downgrade a React 17

El create-react-app por defecto usa React 18. Para usar React 17:

```bash
npm install react@17.0.2 react-dom@17.0.2
```

### Paso 3: Instalar dependencias

```bash
# Redux y React-Redux
npm install @reduxjs/toolkit@1.9.7 react-redux@8.1.3

# Axios
npm install axios@1.6.2

# React Router v5 (compatible con React 17)
npm install react-router-dom@5.3.4

# Material-UI
npm install @mui/material@5.14.20 @mui/icons-material@5.14.19 @emotion/react@11.11.1 @emotion/styled@11.11.0

# React Window para virtual scroll
npm install react-window@1.8.10

# React Toastify para notificaciones
npm install react-toastify@9.1.3
```

### Paso 4: Copiar archivos del proyecto

Reemplaza los archivos de tu proyecto con los archivos proporcionados:

```
gapsi-frontend/
├── public/
│   └── index.html (actualizado con Bootstrap y Font Awesome CDN)
├── src/
│   ├── api/
│   │   ├── axiosClient.js
│   │   ├── welcomeService.js
│   │   ├── versionService.js
│   │   └── providersService.js
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ProviderForm.jsx
│   │   └── ProvidersTable.jsx
│   ├── layout/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── WelcomePage.jsx
│   │   └── ProvidersPage.jsx
│   ├── store/
│   │   ├── index.js
│   │   ├── welcomeSlice.js
│   │   └── providersSlice.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── Header.css
│   │   ├── MainLayout.css
│   │   ├── WelcomePage.css
│   │   ├── ProvidersPage.css
│   │   └── ProvidersTable.css
│   ├── App.jsx
│   └── index.js
└── package.json
```

## ⚙️ Configuración

### Logo de Gapsi

Coloca el logo de Gapsi en la carpeta `public/` con el nombre `logo-gapsi.png`:

```
public/
└── logo-gapsi.png
```

Si el logo no existe, se mostrará un icono de tienda como fallback.

### Imagen del Candidato

Para cambiar la imagen del candidato en la página de bienvenida, edita el archivo `src/pages/WelcomePage.jsx`:

```jsx
// Línea 28 aproximadamente
<img
  src="TU_URL_DE_IMAGEN_AQUÍ"
  alt="Candidato"
  className="candidate-image"
/>
```

Puedes usar:
- Una URL pública de imagen
- Una imagen local en la carpeta `public/` (ej: `/candidato.jpg`)
- El placeholder actual: `https://via.placeholder.com/200x200.png?text=Candidato`

### Configuración del Backend

Si el backend NO está en `http://localhost:8080`, edita el archivo `src/api/axiosClient.js`:

```javascript
const axiosClient = axios.create({
  baseURL: 'TU_URL_DEL_BACKEND', // Cambiar aquí
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
```

## 🎯 Ejecución

### Iniciar el proyecto en modo desarrollo

```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

### Compilar para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `build/`

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Configuración de APIs y servicios
│   ├── axiosClient.js     # Cliente Axios configurado
│   ├── welcomeService.js  # Servicio de bienvenida
│   ├── versionService.js  # Servicio de versión
│   └── providersService.js # Servicio de proveedores (CRUD)
│
├── components/            # Componentes reutilizables
│   ├── Header.jsx        # Componente de cabecera
│   ├── ProviderForm.jsx  # Formulario de proveedor
│   └── ProvidersTable.jsx # Tabla virtualizada
│
├── layout/               # Componentes de layout
│   └── MainLayout.jsx   # Layout principal con header
│
├── pages/               # Páginas de la aplicación
│   ├── WelcomePage.jsx # Página de bienvenida
│   └── ProvidersPage.jsx # Página de gestión de proveedores
│
├── store/              # Estado global con Redux
│   ├── index.js       # Configuración del store
│   ├── welcomeSlice.js # Slice de bienvenida/versión
│   └── providersSlice.js # Slice de proveedores
│
├── styles/            # Estilos CSS
│   ├── global.css    # Estilos globales
│   ├── Header.css
│   ├── MainLayout.css
│   ├── WelcomePage.css
│   ├── ProvidersPage.css
│   └── ProvidersTable.css
│
├── App.jsx           # Componente principal con rutas
└── index.js         # Punto de entrada
```

## 🎨 Funcionalidades

### 1. Pantalla de Bienvenida (Peso 5)

**Ruta:** `/`

- ✅ Diseño moderno tipo landing page
- ✅ Imagen del candidato (configurable)
- ✅ Mensaje de bienvenida consumido desde `GET /api/welcome`
- ✅ Versión de la aplicación desde `GET /api/version`
- ✅ Botón "Continuar" que navega a `/providers`
- ✅ Indicadores de carga y manejo de errores

### 2. Gestión de Proveedores (Peso 6 + 3)

**Ruta:** `/providers`

#### Listar Proveedores
- ✅ Consumo de `GET /providers` con paginación
- ✅ Tabla con columnas: ID, Nombre, Razón Social, Dirección, Acciones
- ✅ **Virtual Scroll** implementado con `react-window`
  - Ubicación: `src/components/ProvidersTable.jsx` (línea 46)
  - Renderiza solo las filas visibles en pantalla
  - Optimizado para miles de registros
- ✅ Contador de total de proveedores
- ✅ Indicador visual de virtual scroll activo

#### Agregar Proveedores
- ✅ Modal con formulario Material-UI
- ✅ Campos obligatorios: Nombre, Razón Social, Dirección
- ✅ Validación de campos en frontend
- ✅ Consumo de `POST /providers`
- ✅ Toast de éxito al agregar
- ✅ Toast de error si el proveedor ya existe

#### Editar Proveedores
- ✅ Botón "Editar" en cada fila
- ✅ Modal pre-llenado con datos del proveedor
- ✅ Consumo de `PUT /providers/{id}`
- ✅ Actualización instantánea en la lista
- ✅ Toast de éxito al editar

#### Eliminar Proveedores
- ✅ Botón "Eliminar" en cada fila
- ✅ Dialog de confirmación
- ✅ Consumo de `DELETE /providers/{id}`
- ✅ Actualización automática de la lista
- ✅ Toast de éxito al eliminar

### 3. Header (Peso 3)

- ✅ Texto "e-Commerce Gapsi"
- ✅ Logo de Gapsi (con fallback si no existe)
- ✅ Siempre visible (sticky header)
- ✅ Click en logo navega a home

## 📡 APIs Consumidas

### Bienvenida
```
GET http://localhost:8080/api/welcome
Respuesta: "Bienvenido Candidato 01" (string o JSON)
```

### Versión
```
GET http://localhost:8080/api/version
Respuesta: "1.0.0" (string o JSON con campo version)
```

### Listar Proveedores
```
GET http://localhost:8080/providers?page=0&size=20
Respuesta: Array o objeto con paginación
[
  {
    "id": 1,
    "nombre": "Proveedor 1",
    "razonSocial": "Razón Social 1",
    "direccion": "Dirección 1"
  },
  ...
]
```

### Crear Proveedor
```
POST http://localhost:8080/providers
Body:
{
  "nombre": "Proveedor Nuevo",
  "razonSocial": "Razón Social Nueva",
  "direccion": "Dirección Nueva"
}
```

### Actualizar Proveedor
```
PUT http://localhost:8080/providers/{id}
Body:
{
  "nombre": "Proveedor Actualizado",
  "razonSocial": "Razón Social Actualizada",
  "direccion": "Dirección Actualizada"
}
```

### Eliminar Proveedor
```
DELETE http://localhost:8080/providers/{id}
```

## 🏗️ Arquitectura y Buenas Prácticas

### Clean Code Frontend

1. **Componentes Funcionales**: Uso exclusivo de componentes funcionales con Hooks
2. **Separación de Responsabilidades**:
   - Servicios API separados por dominio
   - Componentes pequeños y reutilizables
   - Lógica de negocio en Redux slices
3. **Nombres Descriptivos**: Variables, funciones y componentes con nombres claros
4. **Documentación**: JSDoc en funciones y componentes principales
5. **Modularidad**: Cada componente en su propio archivo

### Redux con Redux Toolkit

- **Slices**: Estado organizado en slices por dominio
  - `welcomeSlice`: Maneja bienvenida y versión
  - `providersSlice`: Maneja CRUD de proveedores
- **Thunks Asíncronos**: Todas las llamadas API con createAsyncThunk
- **Estados Normalizados**: Manejo de loading, error y success por slice
- **Inmutabilidad**: Redux Toolkit con Immer incluido

### Axios Centralizado

- **Cliente Único**: Configuración centralizada en `axiosClient.js`
- **Interceptores**: Manejo global de errores y configuración de headers
- **Servicios Específicos**: Un servicio por dominio con funciones dedicadas
- **Timeout**: Protección contra peticiones colgadas (10s)

### Virtual Scroll

**Librería:** `react-window`

**Ubicación:** `src/components/ProvidersTable.jsx`

**Implementación:**
```jsx
<List
  height={500}        // Altura de la ventana
  itemCount={providers.length}  // Total de elementos
  itemSize={60}       // Altura de cada fila
  width="100%"
>
  {Row}
</List>
```

**Beneficios:**
- ✅ Solo renderiza elementos visibles en pantalla
- ✅ Scroll suave con miles de registros
- ✅ Reducción drástica de uso de memoria
- ✅ Mejora significativa en el rendimiento

### Sistema de Toasts

**Librería:** `react-toastify`

**Configuración:** Toast automáticos desde Redux

**Tipos:**
- 🟢 **Success**: Operaciones exitosas (crear, editar, eliminar)
- 🔴 **Error**: Errores del backend (proveedor duplicado, etc.)

### Responsive Design

- Mobile-first approach
- Breakpoints en 768px y 1024px
- Grid CSS adaptable
- Componentes Material-UI responsivos

### Performance

- ✅ Virtual scroll para listas grandes
- ✅ Lazy loading de componentes
- ✅ Memoización donde es necesario
- ✅ Optimización de re-renders con Redux

## 🎓 Conceptos Clave para la Entrevista

### ¿Por qué React 17 y no React 18?

React 17 fue elegido por:
- Compatibilidad con librerías legacy
- Sintaxis de renderizado familiar: `ReactDOM.render()`
- Sin cambios breaking de concurrent features
- Transición gradual recomendada por el equipo de React

### ¿Por qué Redux Toolkit?

- Reduce boilerplate en 70%
- Incluye Immer para inmutabilidad
- DevTools integradas
- Estructura opinionada y mejores prácticas
- Manejo de efectos secundarios con thunks

### ¿Por qué react-window?

- Más ligero que react-virtualized (10x menos peso)
- Rendimiento excepcional
- API simple y directa
- Mantenido activamente
- Ideal para tablas y listas largas

## 🐛 Troubleshooting

### Error: "React version mismatch"

```bash
npm install react@17.0.2 react-dom@17.0.2
```

### Error: "Cannot find module 'react-router-dom'"

```bash
npm install react-router-dom@5.3.4
```

### El backend no responde

1. Verifica que el backend esté corriendo en `http://localhost:8080`
2. Revisa la consola del navegador para errores CORS
3. Verifica la configuración en `src/api/axiosClient.js`

### El logo no se muestra

1. Asegúrate de que `logo-gapsi.png` esté en `public/`
2. Reinicia el servidor de desarrollo (`npm start`)
3. Si no tienes el logo, se mostrará un icono de tienda

## 📝 Notas Importantes

- **React Router v5**: Compatible con React 17 (v6 requiere React 18)
- **Material-UI v5**: Funciona con React 17 (requiere @emotion)
- **Virtual Scroll**: Claramente implementado en `ProvidersTable.jsx:46`
- **Toasts**: Manejo automático de mensajes desde Redux
- **Responsive**: Diseño adaptable a mobile, tablet y desktop

## 👤 Autor

Candidato 01 - Prueba Técnica Gapsi

## 📄 Licencia

Este proyecto es privado y fue desarrollado para fines de evaluación técnica.

---

¿Preguntas o problemas? Revisa la documentación del código o consulta con el equipo técnico de Gapsi.
