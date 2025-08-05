CREATE DATABASE IF NOT EXISTS sysdb;
USE sysdb;

-- ============================
-- TABLA CATEGORIES
-- ============================
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Insertar 5 categorías reales
INSERT INTO categories (name, description) VALUES
('Moda', 'Ropa, calzado y accesorios de moda'),
('Electrónica', 'Dispositivos electrónicos y gadgets'),
('Hogar y Cocina', 'Artículos y utensilios para el hogar'),
('Deportes', 'Equipamiento y accesorios deportivos'),
('Libros', 'Literatura, textos académicos y revistas');

-- ============================
-- TABLA PRODUCTS
-- ============================
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insertar 5 productos reales asociados a categorías
INSERT INTO products (name, description, price, category_id) VALUES
('Cámara Canon EOS Rebel T7', 'Cámara DSLR para fotografía profesional', 650.00, 2),
('Zapatillas Nike Air Max 270', 'Calzado deportivo de alto rendimiento', 150.00, 1),
('Olla de Presión T-fal', 'Olla de presión de acero inoxidable', 80.00, 3),
('Balón de Fútbol Adidas Tango', 'Balón oficial de entrenamiento', 35.00, 4),
('Libro: Cien Años de Soledad', 'Novela de Gabriel García Márquez', 18.00, 5);
