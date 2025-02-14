CREATE DATABASE todo_db;

USE todo_db;

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (title, completed) VALUES
    ('Learn JavaScript', false),
    ('Finish React tutorial', false),
    ('Learn Node.js', true),
    ('Learn Express.js', false),
    ('Learn MongoDB', false);