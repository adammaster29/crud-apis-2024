

CREATE DATABASE VEHICULOS;
USE  VEHICULOS;





CREATE TABLE Vehiculos (
    id INT PRIMARY KEY IDENTITY(1,1),
    tipo VARCHAR(10), -- 'Carro' o 'Moto'
    marca VARCHAR(50),
    modelo VARCHAR(50),
    año INT,
    color VARCHAR(20),
    precio DECIMAL(10, 2),
	imagen_url VARCHAR(555)
);

ALTER TABLE Vehiculos
ADD imagen_url VARCHAR(555);

--actualizar datos de un campo de una base de datos
UPDATE Vehiculos
SET modelo ='Bugatti Chiron '
WHERE id = 2;






INSERT INTO Vehiculos (tipo, marca, modelo, año, color, precio, imagen_url)
VALUES ('Motos', ' Yamaha', 'R1', 2025, 'Negro', 50000.00, 'images/motos/yamahaYzf_R1_Negra.png');



SELECT * FROM sys.tables WHERE name = 'Vehiculos'; --ver si la tabla existe
SELECT * FROM Vehiculos
SELECT * FROM carros;
SELECT * FROM Vehiculos WHERE tipo = 'Carro';
SELECT * FROM Vehiculos WHERE tipo = 'Motos';
CREATE TABLE carros (
id int primary key,
vehiculo_id int,
foreign key (vehiculo_id) REFERENCES vehiculos(id)
)

CREATE TABLE motos (
id int primary key,
vehiculo_id int,
foreign key (vehiculo_id) REFERENCES vehiculos(id)
)



--borrar procedimiento procedure
DROP PROCEDURE sp_GetVehiculo;

--Crear procedimiento procedure para vehiculo

CREATE PROCEDURE sp_GetVehiculo
    @vehiculo_id INT
AS
BEGIN
    -- Selecciona la fila basada en la identificaci�n proporcionada
    SELECT *
    FROM Vehiculos
    WHERE id = @vehiculo_id;
END;






-- Elimina el procedimiento si ya existe
DROP PROCEDURE IF EXISTS  sp_GetMotoPorId



-- agregar vehiculos

CREATE PROCEDURE sp_AddVehiculo
    @tipo VARCHAR(10),  -- 'Carro' o 'Moto'
    @marca VARCHAR(50),
    @modelo VARCHAR(50),
    @año INT,
    @color VARCHAR(20),
    @precio DECIMAL(10, 2),
    @imagen_url VARCHAR(555)
AS
BEGIN
    INSERT INTO Vehiculos (tipo, marca, modelo, año, color, precio, imagen_url)
    VALUES (@tipo, @marca, @modelo, @año, @color, @precio, @imagen_url);

    -- Puedes devolver el ID del vehículo recién insertado si lo necesitas
    SELECT SCOPE_IDENTITY() AS VehiculoID;
END;





