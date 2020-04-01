const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { dbConfig, url } = require('../../database/sequelize');

const basename = path.basename(__filename);
const sequelize = new Sequelize(url, dbConfig);
const database = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default.init(sequelize);
    database[model.name] = model;
  });

Object.keys(database).forEach((model) => {
  if (database[model].associate) {
    database[model].models = database;
    database[model].associate(database);
  }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
