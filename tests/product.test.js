const request = require('supertest')
const app = require('../app')

let token = '';

beforeAll((done) => {
    request(app)
    .post('/signIn')
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
        .post('/products/create')
        .send({
            name: 'Books',
            img_url: 'iasmdak',
            price: 100000,
            stock: 10
        })
        .set('token', token)
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(201)
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    

    it('Test authentication wrong token', (done) => {
        request(app)
        .post('/products/create')
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
        .post('/products/create')
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
            expect(body).toEqual('image should not be empty, name should not be empty, price should not be empty, stock should not be empty')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    /*

    it('Test price should be positive integer', (done) => {
        request(app)
        .post('/products/create')
        .send({
            name: 'Harry Potter Books',
            image_url: 'imgkaskak.png',
            price: -10000,
            stock: 10
        })
        .set('token', token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(400)
            expect(body).toEqual('')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    

    it('Test stock should be at least 1', (done) => {
        request(app)
        .post('/create')
        .send({
            name: 'Harry Potter Books',
            image_url: 'imgkaskak.png',
            price: '100000',
            stock: '10'
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(404)
            expect(body).toHaveProperty('price', expect.any(Number))
            expect(body.price).toBeLessThanOrEqual(0)
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    */

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
})

// AKHIR TEST READ PRODUCT

// MEMULAI UPDATE PRODUCT

describe('Test UPDATE product', () => {

    it('UPDATE success', (done) => {
        request(app)
        .put('/products/4')
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

    it('Test authentication wrong token', (done) => {
        request(app)
        .put('/products/3')
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
        .put('/products/3')
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
            expect(body).toEqual('name should not be empty, price should not be empty, stock should not be empty')
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
        .delete('/products/4')
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

    it('Test authentication wrong token', (done) => {
        request(app)
        .delete('/products/5')
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
