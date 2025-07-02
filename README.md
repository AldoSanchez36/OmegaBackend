# OmegaBackend

Backend API for Omega application, managing users, plants, processes, variables, formulas, access control and reporting. Built with Node.js, Express, Supabase (PostgreSQL) and JWT authentication.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Authentication (`/api/auth`)](#authentication-apiauth)
  - [Plants (`/api/plantas`)](#plants-apiplantas)
  - [Processes (`/api/procesos`)](#processes-apiprocesos)
  - [Variables (`/api/variables`)](#variables-apivariables)
  - [Formulas (`/api/formulas`)](#formulas-apiformulas)
  - [Access Control](#access-control)
    - [Plant Access (`/api/accesos/plantas`)](#plant-access-apiaccesosplantas)
    - [Process Access (`/api/accesos/procesos`)](#process-access-apiaccesosprocesos)
  - [Reports (`/api/reportes`)](#reports-apireportes)
  - [File Upload (`/api/upload`)](#file-upload-apiupload)
  - [Mediciones - Filtros avanzados](#mediciones-filtros-avanzados)
  - [Mediciones (`/api/mediciones`)](#mediciones-apimediciones)
  - [Variables Tolerancia (`/api/variables-tolerancia`)](#variables-tolerancia-apivariables-tolerancia)
  - [Documentos PDF (`/api/documentos-pdf`)](#documentos-pdf-apidocumentos-pdf)
  - [Documentos PDF Permisos (`/api/documentos-pdf-permisos`)](#documentos-pdf-permisos-apidocumentos-pdf-permisos)
  - [Documentos PDF Dashboard (`/api/documentos-pdf/dashboard`)](#documentos-pdf-dashboard-apidocumentos-pdf-dashboard)

## Features
- User registration, login, token renewal and role-based access
- Admin/user/client roles with fine-grained permissions
- CRUD for plants, processes, variables and formulas
- Row-level security enforced via Supabase policies
- Access-control tables for assigning plant/process permissions
- Report creation and retrieval per user
- File upload endpoint

## Technologies
- Node.js & Express
- Supabase (PostgreSQL) with RLS
- JWT for authentication
- `express-validator` for request validation
- `bcryptjs` for password hashing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AldoSanchez36/OmegaBackend.git
   cd OmegaBackend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file at project root with the following variables:

```dotenv
JWT_SECRET=your_jwt_secret_key
SUPABASE_URL=https://<your-supabase-project>.supabase.co
SUPABASE_ANON_KEY=<your_anon_key>
PORT=4000
```

Make sure your Supabase database has the tables and RLS policies set up correctly.

## Running the Server

```bash
npm start
```
The server runs at `http://localhost:4000`.

## API Endpoints

### Authentication (`/api/auth`)

| Method | Path                | Description                                      | Protected          |
| ------ | ------------------- | ------------------------------------------------ | ------------------ |
| POST   | `/register`         | Create a new user (`username`, `email`, `password`, `confirmPassword`) | No                 |
| POST   | `/login`            | Login and obtain JWT (`email`, `password`)       | No                 |
| POST   | `/logout`           | Logout (client-side token removal)               | No                 |
| GET    | `/user/:id`         | Get user by ID                                   | Admin-only         |
| GET    | `/users`            | Get all users                                    | Admin-only         |
| PATCH  | `/update/:id`       | Update user (body contains fields to update)     | Admin-only         |
| DELETE | `/delete/:id`       | Delete user                                      | Admin-only         |

### Plants (`/api/plantas`)

| Method | Path                      | Description                              | Protected    |
| ------ | ------------------------- | ---------------------------------------- | ------------ |
| POST   | `/crear`                  | Create a new plant (`nombre`)            | Admin-only   |
| GET    | `/mis-plantas/:usuario_id`| List plants created by the authenticated user | Authenticated |

### Processes (`/api/procesos`)

| Method | Path                            | Description                         | Protected      |
| ------ | ------------------------------- | ----------------------------------- | -------------- |
| POST   | `/crear`                        | Create a new process (`nombre`, `planta_id`, `descripcion`) | Admin-only     |
| GET    | `/planta/:planta_id`            | List processes for a plant         | Authenticated  |
| GET    | `/`                             | List all processes                  | Authenticated  |

### Variables (`/api/variables`)

| Method | Path                            | Description                         | Protected      |
| ------ | ------------------------------- | ----------------------------------- | -------------- |
| POST   | `/crear`                        | Create a new variable (`nombre`, `unidad`, `proceso_id`) | Authenticated  |
| GET    | `/proceso/:proceso_id`          | List variables for a process       | Authenticated  |
| GET    | `/`                             | List all variables                  | Authenticated  |

### Formulas (`/api/formulas`)

| Method | Path                            | Description                         | Protected      |
| ------ | ------------------------------- | ----------------------------------- | -------------- |
| POST   | `/crear`                        | Create a new formula (`nombre`, `expresion`, `proceso_id`, `variables_usadas`) | Admin-only     |
| GET    | `/proceso/:proceso_id`          | List formulas for a process         | Admin-only     |
| GET    | `/`                             | List all formulas                   | Admin-only     |

### Access Control

#### Plant Access (`/api/accesos/plantas`)

| Method | Path                   | Description                                 | Protected    |
| ------ | ---------------------- | ------------------------------------------- | ------------ |
| POST   | `/asignar`             | Assign plant access to a user               | Admin-only   |
| GET    | `/usuario/:usuario_id` | List plants user has access to              | Admin-only   |
| PATCH  | `/actualizar`          | Update plant access permissions for a user  | Admin-only   |
| DELETE | `/revocar`             | Revoke plant access for a user              | Admin-only   |

#### Process Access (`/api/accesos/procesos`)

| Method | Path                   | Description                                  | Protected    |
| ------ | ---------------------- | -------------------------------------------- | ------------ |
| POST   | `/asignar`             | Assign process access to a user              | Admin-only   |
| GET    | `/usuario/:usuario_id` | List processes user has access to            | Admin-only   |
| PATCH  | `/actualizar`          | Update process access permissions for a user | Admin-only   |
| DELETE | `/revocar`             | Revoke process access for a user             | Admin-only   |

### Reports (`/api/reportes`)

| Method | Path                          | Description                          | Protected      |
| ------ | ----------------------------- | ------------------------------------ | -------------- |
| POST   | `/`                           | Create a report (`usuario_id`, `planta_id`, `proceso_id`, `datos`, `observaciones`) | Authenticated  |
| GET    | `/:id`                        | Get report by ID                    | Authenticated  |
| GET    | `/usuario/:usuario_id`        | List all reports by user            | Authenticated  |

### File Upload (`/api/upload`)

| Method | Path | Description             | Protected  |
| ------ | ---- | ----------------------- | ---------- |
| POST   | `/`  | Upload an image (field name `FotoFileI`), returns file path | Public     |

### Mediciones - Filtros avanzados

Puedes filtrar mediciones por nombre de cliente (planta), proceso (sistema) o variable (parámetro):

| Método | Endpoint                                              | Descripción                                 |
|--------|-------------------------------------------------------|---------------------------------------------|
| GET    | `/api/mediciones/cliente/Aluprint SLP`                | Filtra mediciones por nombre de planta      |
| GET    | `/api/mediciones/proceso/Sistema principal de ALUPRINT` | Filtra mediciones por nombre del sistema (proceso) |
| GET    | `/api/mediciones/variable/Cloruros`                   | Filtra mediciones por nombre de parámetro   |

### Mediciones (`/api/mediciones`)

| Método | Path                              | Descripción                                         | Protected      |
|--------|------------------------------------|-----------------------------------------------------|----------------|
| POST   | `/`                               | Crear una nueva medición                            | Authenticated  |
| GET    | `/`                               | Listar todas las mediciones                         | Authenticated  |
| GET    | `/:id`                            | Obtener una medición por ID                         | Authenticated  |
| PATCH  | `/:id`                            | Actualizar una medición por ID                      | Authenticated  |
| DELETE | `/:id`                            | Eliminar una medición por ID                        | Authenticated  |
| GET    | `/variable/:nombre`               | Filtrar mediciones por nombre de variable           | Authenticated  |
| GET    | `/sistema/:sistema`               | Filtrar mediciones por nombre de sistema (S0,S1,S2) | Authenticated  |
| GET    | `/proceso/:nombre`                | Filtrar mediciones por nombre de proceso (sistema X)| Authenticated  |
| GET    | `/cliente/:nombre`                | Filtrar mediciones por nombre de cliente (planta)   | Authenticated  |

### Variables Tolerancia (`/api/variables-tolerancia`)

| Método | Path        | Descripción                                 | Protected     |
|--------|------------|---------------------------------------------|---------------|
| POST   | `/`        | Crear una nueva tolerancia                  | Authenticated |
| GET    | `/`        | Listar todas las tolerancias                | Authenticated |
| GET    | `/:id`     | Obtener una tolerancia por ID               | Authenticated |
| PATCH  | `/:id`     | Actualizar una tolerancia por ID            | Authenticated |
| DELETE | `/:id`     | Eliminar una tolerancia por ID              | Authenticated |

### Documentos PDF (`/api/documentos-pdf`)

| Método | Path    | Descripción                          | Protected     |
|--------|---------|--------------------------------------|---------------|
| POST   | `/`     | Crear un nuevo documento PDF         | Authenticated |
| GET    | `/`     | Listar todos los documentos PDF      | Authenticated |
| GET    | `/:id`  | Obtener un documento PDF por ID      | Authenticated |
| DELETE | `/:id`  | Eliminar un documento PDF por ID     | Authenticated |

### Documentos PDF Permisos (`/api/documentos-pdf-permisos`)

| Método | Path    | Descripción                          | Protected     |
|--------|---------|--------------------------------------|---------------|
| POST   | `/`     | Crear un nuevo permiso PDF           | Authenticated |
| GET    | `/`     | Listar todos los permisos PDF        | Authenticated |
| GET    | `/:id`  | Obtener un permiso PDF por ID        | Authenticated |
| DELETE | `/:id`  | Eliminar un permiso PDF por ID       | Authenticated |

### Documentos PDF Dashboard (`/api/documentos-pdf/dashboard`)

| Método | Path                | Descripción                                                                 | Protected     |
|--------|---------------------|-----------------------------------------------------------------------------|---------------|
| GET    | `/dashboard`        | Devuelve todos los reportes/documentos PDF accesibles para el usuario, con información enriquecida (título, planta, sistema, estado, fecha, ruta_archivo, id) | Authenticated |

## Database Schema

Tables include: