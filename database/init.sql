-- Drop existing tables
DROP TABLE IF EXISTS user_logged_cookies;
DROP TABLE IF EXISTS template_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS components;
DROP TABLE IF EXISTS modules;
DROP TABLE IF EXISTS templates;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS levels;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS users;

-- Create teams table
CREATE TABLE teams (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    img_url VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create team_members table
CREATE TABLE team_members (
    id INT PRIMARY KEY,
    team_id INT,
    user_id INT,
    role VARCHAR(255),
    position_title VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create projects table
CREATE TABLE projects (
    id INT PRIMARY KEY,
    team INT,
    name VARCHAR(255),
    created_by INT,
    theme_color VARCHAR(255),
    visibility VARCHAR(255),
    parent_template_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (parent_template_id) REFERENCES templates(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);



-- Create components table
CREATE TABLE components (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    parent_template_or_component INT,
    created_by INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create templates table
CREATE TABLE templates (
    id INT PRIMARY KEY,
    description VARCHAR(255),
    name VARCHAR(255),
    theme_color VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create template_tags table
CREATE TABLE template_tags (
    id INT PRIMARY KEY,
    template_id INT,
    tag_id INT,
);

-- Create tags table
CREATE TABLE tags (
    id INT PRIMARY KEY,
    tag_name VARCHAR(255),
    theme_color VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create user_logged_cookies table
CREATE TABLE user_logged_cookies (
    user_id INT,
    cookie VARCHAR(255),
    logged_in_at TIMESTAMP,
    PRIMARY KEY (user_id, cookie)
);

-- Create levels table
CREATE TABLE levels (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    parent_team_id INT,
    created_by INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create roles table
CREATE TABLE roles (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    parent_level_id INT,
    created_by INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create modules table
CREATE TABLE modules (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    assigned_user INT,
    theme_color VARCHAR(255),
    parent_component_id INT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    weekly_working_hours FLOAT,
    created_by INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    status VARCHAR(255),
    img_url VARCHAR(255),
    pronouns VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
