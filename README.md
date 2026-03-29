
# PrimeTrade Assignment

A full-stack web application for task management with role-based authentication. The backend is built with Java Spring Boot and MySQL, while the frontend uses React with Context API and native CSS for a modern, responsive, dark-themed UI.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Backend (Spring Boot)](#backend-spring-boot)
	- [Authentication & Authorization](#authentication--authorization)
	- [API Endpoints](#api-endpoints)
	- [Database Schema](#database-schema)
- [Frontend (React)](#frontend-react)
	- [Project Structure](#project-structure)
	- [Authentication Flow](#authentication-flow)
	- [Role-Based Dashboard](#role-based-dashboard)
- [Setup & Installation](#setup--installation)
	- [Backend Setup](#backend-setup)
	- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features
- User authentication with JWT (login, signup)
- Role-based access (admin/user)
- Admin: Full CRUD on tasks
- User: Read-only access to tasks
- Responsive, modern dark-themed UI
- Secure API with Spring Security
- MySQL database integration

---

## Tech Stack
**Frontend:**
- React (Context API, React Router)
- Native CSS (custom dark theme, responsive)

**Backend:**
- Java Spring Boot
- Spring Security (JWT-based auth)
- MySQL (database)
- JPA/Hibernate

---

## Architecture Overview
- **Frontend** communicates with the backend via RESTful APIs.
- **Backend** exposes endpoints for authentication and task management, enforcing role-based access.
- **Database** stores users (with roles) and tasks.

---

## Backend (Spring Boot)

### Authentication & Authorization
- JWT-based authentication
- Roles: `ADMIN`, `USER`
- Passwords hashed (BCrypt)
- Endpoints secured via Spring Security

### API Endpoints
| Method | Endpoint              | Description                | Auth Required | Role    |
|--------|----------------------|----------------------------|---------------|---------|
| POST   | /api/auth/signup     | Register new user          | No            | -       |
| POST   | /api/auth/login      | Login, returns JWT         | No            | -       |
| GET    | /api/tasks           | List all tasks             | Yes           | All     |
| POST   | /api/tasks           | Create new task            | Yes           | ADMIN   |
| PUT    | /api/tasks/{id}      | Update task                | Yes           | ADMIN   |
| DELETE | /api/tasks/{id}      | Delete task                | Yes           | ADMIN   |

#### Example Request/Response
- **Login:**
	- Request: `{ "username": "admin", "password": "..." }`
	- Response: `{ "token": "<JWT>" ,role:<Role>, Username:<UserName>}`
- **Get Tasks:**
	- Request: `GET /api/tasks` with `Authorization: Bearer <JWT>`
	- Response: `[ { "id": 1, "title": "...", "description": "..." }, ... ]`

### Database Schema
- **User**: id, username, password (hashed), role
- **Task**: id, title, description, createdBy

### Swagger Documention
```http://localhost:8080/swagger-ui/index.html#/```

<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/5742a119-446d-4b2b-a7fa-e87b3c4da95a" />


---


## Project Structure
## Backend (Spring Boot)
```
com.primetrade
 ├── controller
 ├── service
 ├── repository
 ├── entity
 ├── dto
 ├── config
 └── exception
```

### Frontend (React)
```
src/
	App.jsx
	App.css
	index.css
	main.jsx
	contexts/
		AuthContext.jsx
	components/
		Navbar.jsx
	pages/
		Login.jsx
		Signup.jsx
		Dashboard.jsx
	utils/
		api.js
```

### Authentication Flow
- Uses React Context (`AuthContext`) to manage auth state and JWT
- On login/signup, JWT is stored in localStorage and context
- Protected routes via `PrivateRoute` component
- Redirects after login/signup

### Role-Based Dashboard
- **Admin**: Can add, edit, delete tasks
- **User**: Can view tasks only
- Dashboard displays tasks in a responsive table

---

## Setup & Installation

### Backend Setup
1. Clone the backend repo (if separate)
2. Configure `application.properties` for MySQL connection
3. Run migrations (if any)
4. Build and start the server:
	 ```bash
	 ./mvnw spring-boot:run
	 ```

### Frontend Setup
1. Clone this repo
2. Install dependencies:
	 ```bash
	 npm install
	 ```
3. Create a `.env` file:
	 ```env
	 VITE_API_BASE_URL=http://localhost:8080/api
	 ```
4. Start the dev server:
	 ```bash
	 npm run dev
	 ```

---

## Environment Variables
- **Frontend:** `.env` with `VITE_API_BASE_URL`
- **Backend:** `application.properties` for DB and JWT secret

---

## Usage
- Register a new user or login
- Admin users can manage tasks
- Regular users can view tasks
- Logout via navbar

---

## Screenshots
Login Page

<img width="1917" height="870" alt="image" src="https://github.com/user-attachments/assets/22cb6306-cc6d-4b16-bfe2-e24fd2859d63" />

Register Page

<img width="1913" height="876" alt="image" src="https://github.com/user-attachments/assets/ae03a623-cc4b-4669-851a-86a3457df811" />

**Dashboad**
---
Admin page

<img width="1911" height="870" alt="image" src="https://github.com/user-attachments/assets/d11ede0a-ab9a-4875-aadc-8cc0700f012f" />


Non-admin page
<img width="1919" height="875" alt="image" src="https://github.com/user-attachments/assets/e9e90085-10d3-4640-b4a2-72f09cf03cdf" />



<!-- Add screenshots of login, dashboard, etc. here -->

---

## License
MIT

---


