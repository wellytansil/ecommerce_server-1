const request = require('supertest')
const app = require('../app')

let token = '';
let last_id = '';

beforeAll((done) => {
    request(app)
    .post('/users/signIn')
    .send({
        email: 'welly@gmail.com',
        password: '12345'
    })
    .then(response => {
        token = response.body.access_token
        done()
    })
    .catch(err => {
        console.log(err)
    })
})

// MEMULAI TEST CREATE PRODUCT
describe('Test endpoint POST create', () => {

    it('Test POST create success', (done) => {
        request(app)
        .post('/products')
        .send({
            name: 'Books',
            img_url: 'iasmdak',
            price: 100000,
            stock: 10
        })
        .set('token', token)
        .then(response => {
            last_id = response.body.result.id
            const { body, status } = response
            expect(status).toEqual(201)
            expect(body).toHaveProperty('msg', 'Successfully created')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    
    it('Test authentication without token', (done) => {
        request(app)
        .post('/products')
        .send({
            name: 'Books',
            img_url: 'iasmdak',
            price: 100000,
            stock: 10
        })
        .set('token', '')
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(401)
            expect(body).toEqual('Authentication failed')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    
    it('Test empty field', (done) => {
        request(app)
        .post('/products')
        .send({
            name: '',
            img_url: '',
            price: '',
            stock: ''
        })
        .set('token', token)
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(400)
            expect(body).toEqual('stock should be at least 1, name should not be empty, image should not be empty, price should not be empty, stock should not be empty')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('Test price should be positive integer', (done) => {
        request(app)
        .post('/products')
        .send({
            name: 'Harry Potter Books',
            img_url: 'imgkaskak.png',
            price: -10000,
            stock: 10
        })
        .set('token', token)
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(400)
            expect(body).toEqual('price should be greater than 0')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('Test stock should be at least 1', (done) => {
        request(app)
        .post('/products')
        .send({
            name: 'Harry Potter Books',
            img_url: 'imgkaskak.png',
            price: 100000,
            stock: 0
        })
        .set('token', token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(400)
            expect(body).toEqual('stock should be at least 1')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})

// AKHIR TEST CREATE PRODUCT

// MEMULAI TEST READ PRODUCT

describe('Test GET read all products', () => {

    it('GET Read success', (done) => {
        request(app)
        .get('/products')
        .set('token', token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(200)
            expect(body.msg).toEqual('Read successfully')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('GET Read failed because no token for Authentication', (done) => {
        request(app)
        .get('/products')
        .set('token', '')
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toEqual('Authentication failed')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})

// AKHIR TEST READ PRODUCT

// MEMULAI TEST READ PRODUCT BY ID

describe('Test GET read all products', () => {

    it('GET Read By Id success', (done) => {
        request(app)
        .get(`/products/${last_id}`)
        .set('token', token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(200)
            expect(body.msg).toEqual('Read successfully')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('GET Read failed because no token for Authentication', (done) => {
        request(app)
        .get(`/products/${last_id}`)
        .set('token', '')
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toEqual('Authentication failed')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})

// AKHIR TEST READ PRODUCT BY ID

// MEMULAI UPDATE PRODUCT

describe('Test UPDATE product', () => {

    it('UPDATE success', (done) => {
        request(app)
        .put(`/products/${last_id}`)
        .send({
            name: 'Ticket',
            img_url: 'iasjafjka',
            price: 80000,
            stock: 20
        })
        .set('token', token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(201)
            expect(body.msg).toEqual('Update successfully')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('Test UPDATE without token for authentication', (done) => {
        request(app)
        .put(`/products/${last_id}`)
        .send({
            name: 'Ticket',
            img_url: 'iasjafjka',
            price: 80000,
            stock: 20
        })
        .set('token', '')
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toEqual('Authentication failed')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('Test empty field', (done) => {
        request(app)
        .put(`/products/${last_id}`)
        .send({
            name: '',
            image_url: '',
            price: '',
            stock: ''
        })
        .set('token', token)
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(400)
            expect(body).toEqual('stock should be at least 1, name should not be empty, price should not be empty, stock should not be empty')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('Test price should be positive integer', (done) => {
        request(app)
        .put(`/products/${last_id}`)
        .send({
            name: 'Harry Potter Books',
            img_url: 'imgkaskak.png',
            price: -10000,
            stock: 10
        })
        .set('token', token)
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(400)
            expect(body).toEqual('price should be greater than 0')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('Test stock should be at least 1', (done) => {
        request(app)
        .put(`/products/${last_id}`)
        .send({
            name: 'Harry Potter Books',
            img_url: 'imgkaskak.png',
            price: 100000,
            stock: 0
        })
        .set('token', token)
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(400)
            expect(body).toEqual('stock should be at least 1')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})

// AKHIR UPDATE PRODUCT

// MEMULAI DELETE PRODUCT

describe('Test DELETE product', () => {

    it('DELETE success', (done) => {
        request(app)
        .delete(`/products/${last_id}`)
        .set('token', token)
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(200)
            expect(body.msg).toEqual('Delete successfully')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('Test DELETE without token for authentication', (done) => {
        request(app)
        .delete(`/products/${last_id}`)
        .set('token', '')
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toEqual('Authentication failed')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})

// AKHIR DELETE PRODUCT
