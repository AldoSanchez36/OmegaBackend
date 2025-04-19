# OmegaBackend

A Node.js + Express REST API for the Omega CRM application, built on Supabase (PostgreSQL).  
Supports multi‑role authentication (admin, user, client), plant & process management, dynamic formulas, and report generation.

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
- [API Reference](#api-reference)  
  - [Authentication (`/api/auth`)](#authentication--apiauth-)  
  - [Plants (`/api/plantas`)](#plants--apiplantas-)  
  - [Processes (`/api/procesos`)](#processes--apiprocesos-)  
  - [Variables (`/api/variables`)](#variables--apivariables-)  
  - [Formulas (`/api/formulas`)](#formulas--apiformulas-)  
  - [Access Control (`/api/accesos`)](#access-control--apiaccesos-)  
  - [Reports (`/api/reportes`)](#reports--apireportes-)  
- [Error Handling](#error-handling)  
- [License](#license)  

## Features

- 🔐 JWT‑based auth with **4‑hour** expiry  
- 👤 Three roles: **admin**, **user**, **client**  
- 🏭 Manage plants & processes, each with variables  
- ⚙️ Dynamic formulas tied to processes  
- 📊 Generate & retrieve reports  
- ⚙️ Row‑Level Security (RLS) policies handled in Supabase + backend checks  

## Tech Stack

- **Node.js** & **Express**  
- **Supabase** (PostgreSQL)  
- **bcryptjs** for password hashing  
- **jsonwebtoken** for JWT  
- **express-validator** for request validation  

## Getting Started

### Prerequisites

- Node.js v16+ / npm  
- A Supabase project with your schema & RLS enabled  
- Git (to clone this repo)  

### Installation

```bash
git clone https://github.com/AldoSanchez36/OmegaBackend.git
cd OmegaBackend
npm install