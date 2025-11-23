# Gestión de Casos - Backend (NestJS)

Backend de la prueba técnica NXT: API RESTful robusta para la gestión de expedientes legales con autenticación JWT y base de datos SQLite.

## 🚀 Tecnologías

- **NestJS 11** (Framework progresivo de Node.js)
- **TypeScript** (type-safe)
- **Prisma ORM 7** (Acceso a datos)
- **SQLite** (Base de datos ligera y portable)
- **Passport + JWT** (Estrategia de autenticación)
- **Class Validator** (Validación de DTOs)
- **Bcrypt** (Hashing de contraseñas)

## 📋 Requisitos Previos

- Node.js 20+
- npm 10+

## 🔧 Instalación

```bash
npm install
```

## ⚙️ Variables de Entorno

Crear un archivo `.env` en la raíz con el siguiente contenido:

```env
PORT=4000
DATABASE_URL="file:./dev.db"
JWT_SECRET="cambia-este-valor-por-un-secreto-seguro"
FRONTEND_URL="http://localhost:3000" # Para configuración CORS
```

> **Nota**: `DATABASE_URL` apunta al archivo SQLite local.

## 🏃 Ejecución

### Inicialización de Base de Datos

Antes de correr el servidor, asegúrate de generar el cliente de Prisma y sincronizar la base de datos:

```bash
npx prisma generate
npx prisma db push
```

### Modo Desarrollo

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:4000/api`

### Modo Producción

```bash
npm run build
npm run start:prod
```

## 📁 Estructura del Proyecto

```
src/
├── auth/                   # Módulo de Autenticación
│   ├── dto/                # Data Transfer Objects (Login/Register)
│   ├── guards/             # Guardias JWT
│   ├── strategies/         # Estrategia Passport JWT
│   ├── auth.controller.ts  # Endpoints de auth
│   └── auth.service.ts     # Lógica de negocio de auth
├── casos/                  # Módulo de Casos (Expedientes)
│   ├── dto/                # DTOs (Create/Update/Filter)
│   ├── casos.controller.ts # Endpoints CRUD
│   └── casos.service.ts    # Lógica de negocio de casos
├── common/                 # Utilidades compartidas
│   ├── decorators/         # Decoradores personalizados
│   ├── filters/            # Filtros de excepción
│   └── interceptors/       # Interceptores de respuesta
├── prisma/                 # Configuración de Prisma
│   └── prisma.service.ts   # Servicio de conexión a BD
├── app.module.ts           # Módulo raíz
└── main.ts                 # Punto de entrada
```

## 🔐 Autenticación y Seguridad

### Flujo JWT

1. **Login/Registro**: El usuario envía credenciales.
2. **Validación**: Se verifican credenciales y se genera un JWT firmado.
3. **Respuesta**: El token se devuelve (idealmente en cookie httpOnly para máxima seguridad, o en body para clientes móviles).
4. **Protección**: El `JwtAuthGuard` intercepta requests a rutas protegidas y valida el token.

### Medidas de Seguridad

- **Hashing**: Contraseñas hasheadas con `bcrypt` (salt rounds: 10).
- **Validación**: Todos los inputs se validan con `class-validator` y `class-transformer`.
- **CORS**: Configurado para permitir peticiones solo desde el frontend autorizado.
- **Sanitización**: Prevención básica de inyección mediante ORM y validadores.

## 📊 API Endpoints

### Autenticación (`/api/auth`)

- `POST /register`: Registrar nuevo usuario
- `POST /login`: Iniciar sesión

### Casos (`/api/casos`)

- `GET /`: Listar casos (con paginación, filtros y ordenamiento)
- `GET /:id`: Obtener detalle de un caso
- `POST /`: Crear nuevo caso
- `PATCH /:id`: Actualizar caso
- `DELETE /:id`: Eliminar caso

## 🏗️ Arquitectura y Patrones

### Patrones de Diseño

1. **Dependency Injection**: Inyección de servicios y repositorios en controladores.
2. **Repository Pattern**: Abstracción de datos vía Prisma Service.
3. **DTO Pattern**: Transferencia de datos tipada y validada entre capas.
4. **Decorator Pattern**: Uso extensivo para rutas, validaciones y guardias.

### Principios SOLID

- **S**: Servicios dedicados por dominio (AuthService, CasosService).
- **O**: Módulos extensibles sin modificar el núcleo.
- **L**: Interfaces consistentes en servicios.
- **I**: DTOs específicos para cada operación.
- **D**: Inyección de dependencias en todo el framework.

## 🚀 Despliegue

### Railway / Render / AWS

1. **Build**: `npm run build`
2. **Start**: `npm run start:prod`
3. **Variables**: Configurar `DATABASE_URL`, `JWT_SECRET`, `PORT`.
4. **Base de Datos**:
   - Para producción, se recomienda migrar de SQLite a **PostgreSQL**.
   - Cambiar el provider en `schema.prisma` a `postgresql`.

## 📝 Decisiones Técnicas

### ¿Por qué NestJS?

- **Estructura**: Arquitectura angular-like que fuerza buenas prácticas.
- **TypeScript**: Soporte de primera clase.
- **Escalabilidad**: Modularidad nativa.

### ¿Por qué Prisma?

- **Type-safety**: Cliente generado automáticamente basado en el esquema.
- **Productividad**: Migraciones y consultas intuitivas.

## 📚 Scripts Útiles

```bash
npm run lint          # Linter
npm run format        # Prettier
```