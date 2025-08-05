CREATE DATABASE IF NOT EXISTS sysdb;
USE sysdb;

-- Tabla categories
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insertar 5 categorías con created_at actual
INSERT INTO categories (name, description, created_at) VALUES
('Moda', 'Ropa, calzado y accesorios de moda', NOW()),
('Electrónica', 'Dispositivos electrónicos y gadgets', NOW()),
('Hogar y Cocina', 'Artículos y utensilios para el hogar', NOW()),
('Deportes', 'Equipamiento y accesorios deportivos', NOW()),
('Libros', 'Literatura, textos académicos y revistas', NOW());

-- Tabla products
CREATE TABLE IF NOT EXISTS products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DOUBLE NOT NULL CHECK (price >= 0.1)
);

-- Insertar 5 productos
INSERT INTO products (name, description, price) VALUES
('Cámara Canon EOS Rebel T7', 'Cámara DSLR para fotografía profesional', 650.00),
('Zapatillas Nike Air Max 270', 'Calzado deportivo de alto rendimiento', 150.00),
('Olla de Presión T-fal', 'Olla de presión de acero inoxidable', 80.00),
('Balón de Fútbol Adidas Tango', 'Balón oficial de entrenamiento', 35.00),
('Libro: Cien Años de Soledad', 'Novela de Gabriel García Márquez', 18.00);
