const { Router } = require('express');
const buildEquiposController = require('../controllers/equipos.controller');

function buildEquiposRouter(pool) {
  const router = Router();
  const controller = buildEquiposController(pool);

  router.get('/', controller.getAll);
  router.get('/:codigo', controller.getByCodigo);
  router.post('/', controller.create);
  router.put('/:codigo/estado', controller.updateEstado);

  return router;
}

module.exports = buildEquiposRouter;
