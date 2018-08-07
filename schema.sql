// - MYSQL:

DROP DATABASE ig_clone;
CREATE DATABASE ig_clone;           
USE ig_clone;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,  
    `password` VARCHAR(100) UNIQUE NOT NULL,  
    email VARCHAR(70) UNIQUE NOT NULL,  
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE images (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(40) NOT NULL,
    user_id INTEGER NOT NULL,               
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE comments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    comment_text VARCHAR(255) NOT NULL,     
    image_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(image_id) REFERENCES images(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE likes (
    user_id INTEGER NOT NULL,
    image_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(image_id) REFERENCES images(id),
    PRIMARY KEY(user_id, image_id) 
);


// - POSTGRES:

DROP DATABASE youfeatured-db;
CREATE DATABASE youfeatured-db;           
USE youfeatured-db;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,   
    password VARCHAR(100) UNIQUE NOT NULL,   
    email TEXT UNIQUE NOT NULL,  
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE images (
    id serial PRIMARY KEY,
    image_url VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(40) NOT NULL,
    user_id INTEGER NOT NULL,               
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE comments (
    id serial PRIMARY KEY,
    comment_text VARCHAR(255) NOT NULL,     
    image_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(image_id) REFERENCES images(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE likes (
    user_id INTEGER NOT NULL,
    image_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(image_id) REFERENCES images(id),
    PRIMARY KEY(user_id, image_id) 
);