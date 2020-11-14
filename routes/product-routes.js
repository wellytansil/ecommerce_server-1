const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', ProductController.readProducts)
router.get('/:id', ProductController.readProductById)
router.use('/:id', authorization)
router.post('/', ProductController.create)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router