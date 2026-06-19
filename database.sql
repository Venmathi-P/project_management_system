CREATE DATABASE project_management;

USE project_management;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM(
        'Pending',
        'In Progress',
        'Completed'
    ) DEFAULT 'Pending',
    start_date DATE,
    end_date DATE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(100) NOT NULL,
    description TEXT,
    priority ENUM(
        'Low',
        'Medium',
        'High'
    ) DEFAULT 'Medium',
    status ENUM(
        'Pending',
        'Completed'
    ) DEFAULT 'Pending',
    due_date DATE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    project_id INT,
    FOREIGN KEY(project_id)
    REFERENCES projects(id)
    ON DELETE CASCADE
);