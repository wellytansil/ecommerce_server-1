const { Cart, Product } = require('../models')

class CartController { 

    static readCart (req, res, next) {
        const UserId = req.isSignedIn.id

        Cart
        .findAll({
            where: {
                UserId,
                status: false
            },
        include: [ Product ]
        })
        .then(result => {
            let total = 0
            result.forEach(el => {
                total += (el.Product.price * el.quantity)
            });
            res.status(200).json({ carts: result, total: total })
        })
        .catch(err => {
            console.log('error deng')
            next(err)
        })
    }

    static async putToCart (req, res, next) {
        const ProductId = req.params.id
        const UserId = req.isSignedIn.id

        try{
            const isOnTheCart = await Cart.findOne({
                where: {
                    ProductId,
                    UserId,
                    status: false
                }
            })
            const productInfo = await Product.findOne({
                where: {
                    id: ProductId
                }
            })

            if(isOnTheCart) {
                if(productInfo.stock > isOnTheCart.quantity){
                    const updatedQuantity = await Cart.update({
                        quantity: isOnTheCart.quantity + 1
                    }, {
                    where: {
                        UserId,
                        ProductId,
                        status: false
                    },
                    returning: true
                    })
                    res.status(200).json({updatedQuantity})
                } else {
                    throw { msg: 'Product is out of stock', status: 404 }
                }
            } else {
                if(productInfo.stock > 0){
                    const added = await Cart.create({
                        ProductId,
                        UserId,
                        quantity: 1,
                        status: false
                    })
                    res.status(201).json({added})
                } else {
                    throw { msg: 'Product is out of stocks', status: 404 }
                }
            }
        }
        catch(err){
            next(err)
        }
    }

    static async minusTheCart (req, res, next) {
        const ProductId = +req.params.id
        const UserId = req.isSignedIn.id

        try{
            const productInfo = await Cart.findOne({
                where: {
                    ProductId,
                    UserId,
                    status: false
                }
            })

            if(productInfo.quantity > 1) {
                const result = await Cart.update({
                    quantity: productInfo.quantity - 1
                }, {
                    where: {
                        ProductId,
                        UserId,
                        status: false
                    }     
                })
                res.status(200).json({result})
            } else {
                const result = await Cart.destroy({
                    where: {
                        ProductId,
                        UserId,
                        status: false
                    },
                    returning: true
                })
                res.status(200).json({deleted: result})
            }
        }
        catch(err){
            next(err)
        }
    }
    
    static async updateStatusCart (req, res, next) {
        const UserId = req.isSignedIn.id
        
        const arrayOfData = await Cart.findAll({
            where: {
                UserId,
                status: false
            },
            include: [ Product ]
        })

        await arrayOfData.forEach(el => {
            console.log(el.Product.stock)
            el.Product.stock = el.Product.stock - el.quantity
            console.log(el.Product.stock)
            el.Product.save()
            el.status = true
            el.save()
        })

        res.status(200).json({ updated: arrayOfData })
    }

    static deleteCart (req, res, next) {
        const ProductId = req.params.id
        const UserId = req.isSignedIn.id

        Cart
        .destroy({
            where: {
                ProductId,
                UserId,
                status: false
            },
            returning: true
        })
        .then(result => {
            res.status(200).json({ deleted: result })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CartController