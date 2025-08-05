CREATE DATABASE IF NOT EXISTS sysdb;
USE sysdb;

-- Tabla categories
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at DATETIME NOT NULL
);

-- Categorias sin palabras que llevan tilde
INSERT INTO categories (name, description, created_at) VALUES
('Ropa', 'Prendas como camisas pantalones y abrigos', '2025-07-31 10:15:05'),
('Sonido', 'Equipos como radios parlantes y audifonos', '2025-07-31 11:00:40'),
('Cocina', 'Objetos para preparar y servir comida', '2025-07-31 12:30:35'),
('Juegos', 'Elementos para jugar en casa o al parque', '2025-07-31 14:45:22'),
('Escritorio', 'Objetos como reglas hojas y lapiceros', '2025-07-31 16:00:09');

-- Tabla products
CREATE TABLE IF NOT EXISTS products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DOUBLE NOT NULL CHECK (price >= 0.1)
);

-- Productos sin tildes ni palabras que las requieran
INSERT INTO products (name, description, price) VALUES
('Cuaderno Rayado', 'Cuaderno con lineas para escribir', 2.50),
('Anillo Metalico', 'Anillo de acero para mano', 25.00),
('Silla con Ruedas', 'Silla para oficina con base movil', 60.00),
('Radio AM FM', 'Radio portatil con funciones basicas', 35.00),
('Lapicero Negro', 'Lapicero para escribir o dibujar', 0.80);