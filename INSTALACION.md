# Gu¨ªa R¨¢pida de Instalaci¨®n

## Instalaci¨®n desde Cero

### 1. Instalar dependencias

```bash
npm install
```

### 2. Verificar versi¨®n de React

Aseg¨²rate de que tu `package.json` tiene React 17:

```json
"react": "^17.0.2",
"react-dom": "^17.0.2"
```

Si no es as¨ª:

```bash
npm install react@17.0.2 react-dom@17.0.2
```

### 3. Configurar el logo

Coloca el archivo `logo-gapsi.png` en la carpeta `public/`

### 4. Configurar la URL del backend

Si tu backend NO est¨¢ en `http://localhost:8080`, edita:

**Archivo:** `src/api/axiosClient.js`

```javascript
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080', // <- Cambiar aqu¨ª
  // ...
});
```

### 5. Iniciar el proyecto

```bash
npm start
```

La aplicaci¨®n se abrir¨¢ en `http://localhost:3000`

---

## Instalaci¨®n Manual de Dependencias

Si prefieres instalar las dependencias una por una:

```bash
# React 17
npm install react@17.0.2 react-dom@17.0.2

# Redux
npm install @reduxjs/toolkit@1.9.7 react-redux@8.1.3

# Axios
npm install axios@1.6.2

# React Router v5
npm install react-router-dom@5.3.4

# Material-UI
npm install @mui/material@5.14.20 @mui/icons-material@5.14.19
npm install @emotion/react@11.11.1 @emotion/styled@11.11.0

# Virtual Scroll
npm install react-window@1.8.10

# Toasts
npm install react-toastify@9.1.3
```

---

## Verificaci¨®n

### Verificar que el backend est¨¢ corriendo

```bash
curl http://localhost:8080/api/welcome
```

Deber¨ªa responder: `"Bienvenido Candidato 01"`

### Verificar que React est¨¢ en versi¨®n 17

```bash
npm list react react-dom
```

Deber¨ªa mostrar:

```
react@17.0.2
react-dom@17.0.2
```

---

## Soluci¨®n de Problemas Comunes

### Error: "Cannot find module"

```bash
# Borrar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 is already in use"

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

### El backend no responde

1. Verifica que el backend estÃ© corriendo
2. Revisa la configuraci¨®n en `src/api/axiosClient.js`
3. Revisa errores CORS en la consola del navegador

---

## Estructura de Archivos Creados

```
frontend-gapsi/
â”œâ”€â”€ public/
â”?  â”œâ”€â”€ index.html âœ?
â”?  â”œâ”€â”€ manifest.json âœ?
â”?  â””â”€â”€ logo-gapsi.png âš ï¸ (Debes colocarlo tÃº)
â”œâ”€â”€ src/
â”?  â”œâ”€â”€ api/ âœ?
â”?  â”œâ”€â”€ components/ âœ?
â”?  â”œâ”€â”€ layout/ âœ?
â”?  â”œâ”€â”€ pages/ âœ?
â”?  â”œâ”€â”€ store/ âœ?
â”?  â”œâ”€â”€ styles/ âœ?
â”?  â”œâ”€â”€ App.jsx âœ?
â”?  â””â”€â”€ index.js âœ?
â”œâ”€â”€ .gitignore âœ?
â”œâ”€â”€ package.json âœ?
â”œâ”€â”€ README.md âœ?
â””â”€â”€ INSTALACION.md âœ?
```

---

## Scripts Disponibles

```bash
# Modo desarrollo
npm start

# Compilar para producci¨®n
npm run build

# Ejecutar tests
npm test

# Eject (NO recomendado)
npm run eject
```

---

## Checklist Final

- [ ] Node.js instalado (v14+)
- [ ] Dependencias instaladas (`npm install`)
- [ ] React 17 verificado
- [ ] Backend corriendo en puerto 8080
- [ ] Logo colocado en `public/logo-gapsi.png` (opcional)
- [ ] Proyecto ejecut¨¢ndose en `http://localhost:3000`

---

Â¡Listo! El proyecto deber¨ªa estar corriendo sin problemas. ğŸ‰

Si encuentras algÃºn problema, consulta el README.md completo.
