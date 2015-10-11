const thinky = require('./database');
const type = thinky.type;

const Building = thinky.createModel('Building', {
  id: type.string(),
  abbr: type.string(),
  name: type.string(),
  address: type.string(),
  buildingNumber: type.integer(),
  sqft: type.integer(),
});

// Indexes
Building.ensureIndex('abbr');

module.exports = Building;
