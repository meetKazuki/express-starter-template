const debug = require('debug')('dev');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        roleId: {
          allowNull: true,
          foreignKey: true,
          type: Sequelize.UUID,
        },
        isAdmin: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        firstName: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        lastName: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        userName: {
          allowNull: true,
          type: Sequelize.STRING,
          unique: true,
        },
        bio: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
        },
        notify: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        avatarUrl: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
        },
      });
    } catch (error) {
      debug(error);
    }
  },
  down: async (queryInterface) => {
    try {
      await queryInterface.dropTable('Users');
    } catch (error) {
      debug(error);
    }
  },
};
