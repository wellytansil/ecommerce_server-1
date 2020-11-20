'use strict';

const fs = require('fs')
const { hashingPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = hashingPassword('12345')
    const data = [{ email: 'we2y.tansil@gmail.com', password, role: 'admin', createdAt: new Date(), updatedAt: new Date() }]
    return queryInterface.bulkInsert('Users', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
