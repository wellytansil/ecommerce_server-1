'use strict';

const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      { name: 'Heineken', img_url: 'https://i.ibb.co/FKhZHjg/studio-36-west-jewelry-photography-product-on-white-01.jpg', price: 32000, stock: 40, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bintang', img_url: 'https://i.ibb.co/FmptcFr/Bintang-Pilsner.jpg', price: 87000, stock: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jack Daniels', img_url: 'https://i.ibb.co/rt9FpcR/K5-9243-jack-daniels-product-shot.jpg', price: 28000, stock: 30, createdAt: new Date(), updatedAt: new Date() }
    ]
    return queryInterface.bulkInsert('Products', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
};
