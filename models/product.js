'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Cart, { foreignKey: 'ProductId' })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name should not be empty'
        },
        notNull: {
          args: true,
          msg: 'name should not be empty'
        }
      }
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'image should not be empty'
        },
        notNull: {
          args: true,
          msg: 'image should not be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'price should not be empty'
        },
        notNull: {
          args: true,
          msg: 'price should not be empty'
        },
        isPositive(value) {
          if(value && value <= 0){
            throw new Error('price should be greater than 0')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'stock should not be empty'
        },
        notNull: {
          args: true,
          msg: 'stock should not be empty'
        },
        isGreaterThan0(value) {
          if(value < 1){
            throw new Error('stock should be at least 1')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};