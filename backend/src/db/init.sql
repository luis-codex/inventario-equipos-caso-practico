CREATE DATABASE IF NOT EXISTS inventario_equipos;
USE inventario_equipos;

CREATE TABLE IF NOT EXISTS equipos (
  codigo VARCHAR(20) PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  laboratorio VARCHAR(80) NOT NULL,
  estado ENUM('Disponible', 'En uso', 'Mantenimiento', 'Baja') NOT NULL DEFAULT 'Disponible',
  responsable VARCHAR(120) NOT NULL
);

INSERT INTO equipos (codigo, nombre, categoria, laboratorio, estado, responsable) VALUES
('EQ-001', 'PC Dell OptiPlex 7090', 'Computador de escritorio', 'Laboratorio de Redes', 'Disponible', 'Ing. Luis Castillo'),
('EQ-002', 'Router Cisco 2911', 'Networking', 'Laboratorio de Redes', 'En uso', 'Ing. Luis Castillo'),
('EQ-003', 'Switch Cisco Catalyst 2960', 'Networking', 'Laboratorio de Redes', 'Disponible', 'Ing. Luis Castillo'),
('EQ-004', 'Proyector Epson PowerLite', 'Audiovisual', 'Laboratorio de Software', 'Mantenimiento', 'Luis Tenorio'),
('EQ-005', 'Servidor HP ProLiant DL360', 'Servidor', 'Laboratorio de Base de Datos', 'Disponible', 'Luis Tenorio'),
('EQ-006', 'Access Point Ubiquiti UniFi', 'Networking', 'Laboratorio de Redes', 'Baja', 'Ing. Luis Castillo')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);
