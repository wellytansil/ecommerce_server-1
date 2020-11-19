const express = require('express')
const router = express.Router()
const CartController = require('../controllers/CartController')
const custAuthorization = require('../middlewares/customer-authorization')

router.get('/', CartController.readCart)
router.post('/:id', CartController.putToCart)
router.patch('/', CartController.updateStatusCart)
router.patch('/minus/:id', custAuthorization, CartController.minusTheCart)
router.delete('/:id', custAuthorization, CartController.deleteCart)

module.exports = router