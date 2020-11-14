const { Product } = require('../models'); 

class ProductController{

    static create(req, res, next) {
        const { name, img_url, price, stock } = req.body
        Product
        .create({
            name,
            img_url,
            price,
            stock
        })
        .then(result => {
            res.status(201).json({result, msg: 'Successfully created'})
        })
        .catch(err => {
            next(err);
        })
    }

    static readProducts(req, res, next){
        Product
        .findAll()
        .then(result => {
            res.status(200).json({result, msg: 'Read successfully'})
        })
        .catch(err => {
            next(err)
        })
    }

    static readProductById(req, res, next) {
        console.log('hai')
        console.log(req.params.id)
        const id = req.params.id
        console.log(id)
        Product
        .findAll({
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json({result, msg: 'Read successfully'})
        })
        .catch(err => {
            next(err)
        })
    }

    static updateProduct(req, res, next){
        console.log('hai')
        const { name, img_url, price, stock } = req.body
        const id = req.params.id

        Product
        .update({
            name,
            img_url,
            price,
            stock
        }, { 
            where: {
            id
        }
        })
        .then(result => {
            res.status(201).json({msg: 'Update successfully'})
        })
        .catch(err => {
            next(err)
        })
    }

    static async deleteProduct(req, res, next){
        const id = req.params.id

        Product
        .destroy({ 
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json({msg: 'Delete successfully'})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController