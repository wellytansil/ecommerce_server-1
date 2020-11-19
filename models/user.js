'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cart, { foreignKey: 'ProductId' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'email should not be empty'
        },
        notNull: {
          args: true,
          msg: 'email should not be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password should not be empty'
        },
        notNull: {
          args: true,
          msg: 'password should not be empty'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate (instances, options) {
        instances.role = 'customer'
        instances.password = hashingPassword(instances.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};