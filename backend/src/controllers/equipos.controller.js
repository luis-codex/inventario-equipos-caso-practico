const ESTADOS_VALIDOS = ['Disponible', 'En uso', 'Mantenimiento', 'Baja'];

// Recibe el pool de conexiones por inyeccion para poder probar el controlador
// con un pool simulado, sin necesitar una base de datos real en los tests.
function buildEquiposController(pool) {
  async function getAll(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM equipos ORDER BY codigo');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: 'Error al consultar los equipos' });
    }
  }

  async function getByCodigo(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM equipos WHERE codigo = ?', [req.params.codigo]);
      if (rows.length === 0) {
        return res.status(404).json({ error: `No existe un equipo con codigo ${req.params.codigo}` });
      }
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Error al consultar el equipo' });
    }
  }

  async function create(req, res) {
    const { codigo, nombre, categoria, laboratorio, estado, responsable } = req.body;
    if (!codigo || !nombre || !categoria || !laboratorio || !responsable) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    if (estado && !ESTADOS_VALIDOS.includes(estado)) {
      return res.status(400).json({ error: `Estado invalido. Use uno de: ${ESTADOS_VALIDOS.join(', ')}` });
    }
    try {
      await pool.query(
        'INSERT INTO equipos (codigo, nombre, categoria, laboratorio, estado, responsable) VALUES (?, ?, ?, ?, ?, ?)',
        [codigo, nombre, categoria, laboratorio, estado || 'Disponible', responsable]
      );
      res.status(201).json({ codigo, nombre, categoria, laboratorio, estado: estado || 'Disponible', responsable });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: `Ya existe un equipo con codigo ${codigo}` });
      }
      res.status(500).json({ error: 'Error al registrar el equipo' });
    }
  }

  async function updateEstado(req, res) {
    const { estado } = req.body;
    if (!estado || !ESTADOS_VALIDOS.includes(estado)) {
      return res.status(400).json({ error: `Estado invalido. Use uno de: ${ESTADOS_VALIDOS.join(', ')}` });
    }
    try {
      const [result] = await pool.query('UPDATE equipos SET estado = ? WHERE codigo = ?', [estado, req.params.codigo]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: `No existe un equipo con codigo ${req.params.codigo}` });
      }
      res.json({ codigo: req.params.codigo, estado });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el estado' });
    }
  }

  return { getAll, getByCodigo, create, updateEstado };
}

module.exports = buildEquiposController;
