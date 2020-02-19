const db = require('../data/db-config.js');

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id }).first()
    .then(scheme => {
      if (scheme === undefined) return null;
      return scheme;
    });
}

function findSteps(id) {
  return db('schemes as sc').
    join('steps as st', 'sc.id', 'st.scheme_id')
    .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
    .where({ scheme_id: id })
    .orderBy('step_number');
}

module.exports = {
  find,
  findById,
  findSteps
};