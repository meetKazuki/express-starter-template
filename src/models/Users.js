import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'suspended'),
      defaultValue: 'active',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {});

  Users.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });

  Users.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = +process.env.SALT;
    return bcrypt.hash(this.password, saltRounds);
  };

  Users.prototype.getSafeDataValues = function getSafeDataValues() {
    const { password, ...data } = this.dataValues;
    return data;
  };

  Users.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  Users.generateVerificationToken = async () => {
    const secret = `${this.password}!${this.createdAt.toISOString()}`;
    return jwt.sign({ id: this.id }, secret, { expiresIn: '10m' });
  };

  Users.decodeVerificationToken = async (token) => {
    const secret = `${this.password}!${this.createdAt.toISOString()}`;
    return jwt.verify(token, secret);
  };

  Users.getExistingUser = async (queryString, column = 'email') => {
    const customer = await Users.findOne({
      where: { [column]: queryString },
    });

    return customer;
  };

  Users.associate = (models) => {
    Users.hasMany(models.Review, {
      foreignKey: {
        name: 'customerId',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
    Users.hasMany(models.Order, {
      foreignKey: {
        name: 'customerId',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
    Users.hasOne(models.Address, {
      foreignKey: {
        name: 'customerId',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
  };

  return Users;
};
