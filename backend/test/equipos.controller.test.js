const test = require('node:test');
const assert = require('node:assert/strict');
const buildEquiposController = require('../src/controllers/equipos.controller');

function mockRes() {
  const res = { statusCode: 200, body: undefined };
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (payload) => { res.body = payload; return res; };
  return res;
}

test('getAll responde con la lista de equipos', async () => {
  const pool = { query: async () => [[{ codigo: 'EQ-001', nombre: 'PC' }]] };
  const res = mockRes();
  await buildEquiposController(pool).getAll({}, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.length, 1);
  assert.equal(res.body[0].codigo, 'EQ-001');
});

test('getByCodigo responde 404 si no existe', async () => {
  const pool = { query: async () => [[]] };
  const res = mockRes();
  await buildEquiposController(pool).getByCodigo({ params: { codigo: 'EQ-999' } }, res);
  assert.equal(res.statusCode, 404);
});

test('create rechaza campos faltantes', async () => {
  const pool = { query: async () => [{}] };
  const res = mockRes();
  await buildEquiposController(pool).create({ body: { nombre: 'PC' } }, res);
  assert.equal(res.statusCode, 400);
});

test('create registra un equipo valido', async () => {
  const pool = { query: async () => [{ affectedRows: 1 }] };
  const res = mockRes();
  await buildEquiposController(pool).create(
    { body: { codigo: 'EQ-010', nombre: 'PC', categoria: 'Cat', laboratorio: 'Lab', responsable: 'Luis' } },
    res
  );
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.codigo, 'EQ-010');
  assert.equal(res.body.estado, 'Disponible');
});

test('updateEstado rechaza un estado invalido', async () => {
  const pool = { query: async () => [{ affectedRows: 1 }] };
  const res = mockRes();
  await buildEquiposController(pool).updateEstado(
    { params: { codigo: 'EQ-001' }, body: { estado: 'Roto' } },
    res
  );
  assert.equal(res.statusCode, 400);
});

test('updateEstado actualiza correctamente', async () => {
  const pool = { query: async () => [{ affectedRows: 1 }] };
  const res = mockRes();
  await buildEquiposController(pool).updateEstado(
    { params: { codigo: 'EQ-001' }, body: { estado: 'En uso' } },
    res
  );
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.estado, 'En uso');
});

test('updateEstado responde 404 si el codigo no existe', async () => {
  const pool = { query: async () => [{ affectedRows: 0 }] };
  const res = mockRes();
  await buildEquiposController(pool).updateEstado(
    { params: { codigo: 'EQ-999' }, body: { estado: 'En uso' } },
    res
  );
  assert.equal(res.statusCode, 404);
});
