
# Project Management System

## Overview

Project Management System is a web application that helps users manage projects and tasks efficiently.

Built using:

- React.js
- Node.js
- Express.js
- MySQL
- JWT Authentication

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

### Project Management

- Create Project
- Edit Project
- Delete Project
- Search Projects
- Project Status Tracking

### Task Management

- Create Task
- Edit Task
- Delete Task
- Task Priority Management
- Task Status Management
- Task Filtering

### Dashboard

- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks
- Projects In Progress

---

## Technologies Used

### Frontend

- React.js
- Axios
- React Router DOM
- Bootstrap

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs

### Database

- MySQL

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/project-management-system.git
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

## Environment Variables

Create a .env file inside backend folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=project_management

JWT_SECRET=mysecretkey
```

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Dashboard

GET /api/dashboard

### Projects

GET /api/projects

POST /api/projects

PUT /api/projects/:id

DELETE /api/projects/:id

### Tasks

GET /api/tasks

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id

---

## Database

MySQL Database

Tables:

- users
- projects
- tasks

---

## Author

Venmathi P
=======
# project_management_system
Project Management System is a web-based application that allows users to create, manage, update, and track projects and tasks. Built with React.js, Node.js, Express.js, and MySQL, it provides authentication, dashboard statistics, task tracking, and project management features.
>>>>>>> 9b300d1dd838f5804db9df9e0f74223c369f01d1
