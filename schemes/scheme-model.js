const db = require('../data/db-config.js');

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id }).first()
    .then(scheme => {
      return scheme ? scheme : null;
    });
}

function findSteps(id) {
  return db('schemes as sc')
    .join('steps as st', 'sc.id', 'st.scheme_id')
    .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
    .where({ scheme_id: id })
    .orderBy('step_number');
}

function add(scheme) {
  return db('schemes').insert(scheme)
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db('schemes').where({ id }).update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return findById(id).then(async scheme => {
    await db('schemes').where({ id }).del();
    return scheme;
  });
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};