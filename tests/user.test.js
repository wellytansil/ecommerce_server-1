const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll(() => {
    const email = 'welly@gmail.com'
    const password = 12345
    const role = 'admin'

    queryInterface.bulkInsert('Users', [{
        email,
        password, 
        createdAt: new Date(),
        updatedAt: new Date(),
        role,
    }])
    .then(result => {
        console.log('sukses')
    })
    .catch(err => {
        console.log(err)
    })
})

// MEMULAI TEST SIGNIN
describe('Test endpoint POST signIn', () => {
    it('Test signIn success', (done) => {
        request(app)
        .post('/users/signIn')
        .send({
            email: 'welly@gmail.com',
            password: '12345'
        })
        .then(response => {
            
            const { body, status } = response

            expect(status).toEqual(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('Wrong Email', (done) => {
        request(app)
        .post('/users/signIn')
        .send({
            email: 'wly@gmail.com',
            password: '12345'
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toEqual('email/password is invalid')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('Wrong Password', (done) => {
        request(app)
        .post('/users/signIn')
        .send({
            email: 'welly@gmail.com',
            password: '123askda'
        })
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(401)
            expect(body).toEqual('email/password is invalid')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('No Email/Password inserted', (done) => {
        request(app)
        .post('/users/signIn')
        .send({
            email: null,
            password: null
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toEqual('email/password is invalid')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})
// AKHIR TEST SIGNIN

