const thinky = require('./database');
const type = thinky.type;

const Building = thinky.createModel('Building', {
  id: type.string(),
  abbr: type.string(),
  name: type.string(),
  address: type.string(),
  buildingNumber: type.number().integer(),
  sqft: type.number().integer(),
});

// Indexes
Building.ensureIndex('abbr');

module.exports = Building;
