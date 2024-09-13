const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const config = require('./conexion');
const multer = require('multer');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const app = express();

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Vehículos',
      version: '1.0.0',
      description: 'Documentación de la API del concesionario',
    },
    servers: [
      {
        url: 'https://crud-apis-2024.onrender.com', // URL en producción o local
      },
    ],
  },
  apis: ['./app.js'], // Rutas donde se documentan los endpoints
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Ruta de la documentación
app.use('/adamAgudelo', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'imgCar')); // Carpeta de destino para imágenes de carros
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Guarda con extensión original
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen.'));
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 } // Limite de 5MB
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura rutas para servir imágenes estáticas
app.use('/images/carros', express.static(path.join(__dirname, 'public', 'imgCar')));
app.use('/images/motos', express.static(path.join(__dirname, 'public', 'imgMotos')));

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehiculo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         tipo:
 *           type: string
 *           example: "Carro"
 *         marca:
 *           type: string
 *           example: "Chevrolet"
 *         modelo:
 *           type: string
 *           example: "Camaro"
 *         año:
 *           type: integer
 *           example: 2024
 *         color:
 *           type: string
 *           example: "Amarillo"
 *         precio:
 *           type: number
 *           format: float
 *           example: 100000
 *         imagen_url:
 *           type: string
 *           example: "images/carros/camaroAmarillo.png"
 */

/**
 * @swagger
 * /vehiculos:
 *   get:
 *     summary: Obtiene todos los vehículos
 *     responses:
 *       200:
 *         description: Lista de todos los vehículos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehiculo'
 */
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

/**
 * @swagger
 * /carros:
 *   get:
 *     summary: Obtiene todos los carros
 *     responses:
 *       200:
 *         description: Lista de todos los carros.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehiculo'
 */
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

/**
 * @swagger
 * /motos:
 *   get:
 *     summary: Obtiene todas las motos
 *     responses:
 *       200:
 *         description: Lista de todas las motos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehiculo'
 */
app.get('/motos', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM Vehiculos WHERE tipo = 'Moto'`);
    
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

/**
 * @swagger
 * /vehiculos/{id}:
 *   get:
 *     summary: Obtiene un vehículo por id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Detalles del vehículo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehiculo'
 *       404:
 *         description: Vehículo no encontrado
 */
app.get('/vehiculos/:id', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('vehiculo_id', sql.Int, req.params.id)
      .query('SELECT * FROM Vehiculos WHERE id = @vehiculo_id');
    
    if (result.recordset.length === 0) {
      res.status(404).send('Vehículo no encontrado');
    } else {
      res.json(result.recordset[0]);
    }
  } catch (err) {
    console.error('Error al obtener el vehículo: ', err);
    res.status(500).send('Error al obtener el vehículo');
  }
});

/**
 * @swagger
 * /vehiculos:
 *   post:
 *     summary: Agrega un nuevo vehiculo
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               año:
 *                 type: integer
 *               color:
 *                 type: string
 *               precio:
 *                 type: number
 *                 format: float
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Vehículo agregado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehiculo'
 */
app.post('/vehiculos', upload.single('imagen'), async (req, res) => {
  try {
    const { tipo, marca, modelo, año, color, precio } = req.body;
    const imagen_url = req.file ? `images/carros/${req.file.filename}` : null;

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

    res.status(201).json({
      id: result.recordset[0].VehiculoID,
      tipo,
      marca,
      modelo,
      año,
      color,
      precio,
      imagen_url
    });
  } catch (error) {
    console.error('Error en el servidor', error);
    res.status(500).send('Error en el servidor');
  }
});

/**
 * @swagger
 * /vehiculos/{id}:
 *   put:
 *     summary: Actualiza un vehículo por id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vehículo
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehiculo'
 *     responses:
 *       200:
 *         description: Vehículo actualizado exitosamente
 *       404:
 *         description: Vehículo no encontrado
 */
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

/**
 * @swagger
 * /vehiculos/{id}:
 *   delete:
 *     summary: Elimina un vehículo por id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Vehículo eliminado exitosamente
 *       404:
 *         description: Vehículo no encontrado
 */
app.delete('/vehiculos/:id', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM Vehiculos WHERE id = @id');

    if (result.rowsAffected[0] > 0) {
      res.send('Vehículo eliminado exitosamente');
    } else {
      res.status(404).send('Vehículo no encontrado');
    }
  } catch (error) {
    console.error('Error en el servidor', error);
    res.status(500).send('Error en el servidor');
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
