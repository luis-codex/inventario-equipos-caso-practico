require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createPool = require('./src/db/pool');
const buildEquiposRouter = require('./src/routes/equipos.routes');

const PORT = process.env.PORT || 3000;
const pool = createPool();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok', service: 'inventario-equipos-api' }));
app.use('/api/equipos', buildEquiposRouter(pool));

if (require.main === module) {
  app.listen(PORT, () => console.log(`API de Inventario de Equipos escuchando en puerto ${PORT}`));
}

module.exports = app;
