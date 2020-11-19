const express = require('express')
const router = express.Router()
const userRoutes = require('./user-routes')
const productRoutes = require('./product-routes')
const cartRoutes = require('./cart-routes')
const authentication = require('../middlewares/authentication')

router.use('/users', userRoutes)

router.use(authentication)
router.use('/products', productRoutes)
router.use('/carts', cartRoutes)

module.exports = router