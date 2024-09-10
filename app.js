const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const config = require('./conexion');







const app = express();
app.use(cors());
app.use(express.json());
// app.use('/images', express.static('public'));

const path = require('path');

// Configura rutas para servir imágenes estáticas
app.use('/images/carros', express.static(path.join(__dirname, 'public', 'imgCar')));
app.use('/images/motos', express.static(path.join(__dirname, 'public', 'imgMotos')));

app.use(express.urlencoded({ extended: true }));

// OBTENER LOS TODOS LOS VEHICULOS
app.get('/vehiculos', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Vehiculos');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error en el servidor', error);
        res.status(500).send('Error en el servidor');
    }
});



// Obtener los carros 
app.get('/carros', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`SELECT * FROM Vehiculos WHERE tipo = 'Carro'`);
        
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).send('No se encontraron carros');
        }
    } catch (error) {
        console.error('Error en el servidor', error);
        res.status(500).send('Error en el servidor');
    }
});

// Obtener las motos
app.get('/motos', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`SELECT * FROM Vehiculos WHERE tipo = 'Motos'`);
        
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).send('No se encontraron Motos');
        }
    } catch (error) {
        console.error('Error en el servidor', error);
        res.status(500).send('Error en el servidor');
    }
});


// obtener vehiculos por id

app.get('/vehiculos/:id', async (req, res) => {
    try {
        const pool = await sql.connect(config);;
        const result = await pool.request()
            .input('vehiculo_id', sql.NVarChar, req.params.id)
            .execute('sp_GetVehiculo ');
        if (result.recordset.length === 0) {
            res.status(404).send('Contacto no encontrado');
        } else {
            res.json(result.recordset[0]);
        }
    } catch (err) {
        console.error('Error al obtener el contacto: ', err);
        res.status(500).send('Error al obtener el contacto');
    }
});

//agregar vehiculos
app.post('/vehiculos', async (req, res) => {
    try {
        const { tipo, marca, modelo, año, color, precio, imagen_url } = req.body;

        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('tipo', sql.VarChar(10), tipo)
            .input('marca', sql.VarChar(50), marca)
            .input('modelo', sql.VarChar(50), modelo)
            .input('año', sql.Int, año)
            .input('color', sql.VarChar(20), color)
            .input('precio', sql.Decimal(10, 2), precio)
            .input('imagen_url', sql.VarChar(555), imagen_url)
            .execute('sp_AddVehiculo');

        res.status(201).json({ id: result.recordset[0].VehiculoID });
    } catch (error) {
        console.error('Error en el servidor', error);
        res.status(500).send('Error en el servidor');
    }
});

// Endpoint para actualizar un vehículo por ID
app.put('/vehiculos/:id', async (req, res) => {
    try {
        const { tipo, marca, modelo, año, color, precio, imagen_url } = req.body;
        const { id } = req.params;

        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('tipo', sql.VarChar(10), tipo)
            .input('marca', sql.VarChar(50), marca)
            .input('modelo', sql.VarChar(50), modelo)
            .input('año', sql.Int, año)
            .input('color', sql.VarChar(20), color)
            .input('precio', sql.Decimal(10, 2), precio)
            .input('imagen_url', sql.VarChar(555), imagen_url)
            .query(`
                UPDATE Vehiculos
                SET tipo = @tipo, marca = @marca, modelo = @modelo, año = @año, color = @color, precio = @precio, imagen_url = @imagen_url
                WHERE id = @id
            `);

        if (result.rowsAffected[0] > 0) {
            res.send('Vehículo actualizado exitosamente');
        } else {
            res.status(404).send('Vehículo no encontrado');
        }
    } catch (error) {
        console.error('Error en el servidor', error);
        res.status(500).send('Error en el servidor');
    }
});


// endpoint para eliminar por id
app.delete('/vehiculos/:id', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Vehiculos WHERE id = @id');
        
        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Vehículo eliminado correctamente');
        } else {
            res.status(404).send('Vehículo no encontrado');
        }
    } catch (error) {
        console.error('Error en el servidor', error);
        res.status(500).send('Error en el servidor');
    }
});




//  const port = 3000;    //puerto local
const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Conectado al puerto: ${port}`);
});
