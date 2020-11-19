const { Cart } = require('../models')

async function custAuthorization(req, res, next) {
    const ProductId = +req.params.id
    const role = req.isSignedIn.role
    const UserId = req.isSignedIn.id
    console.log(ProductId, role, UserId)

    try{
        const result = await Cart.findOne({
            where: {
                ProductId
            },
        })
        console.log('1 disini')
        if(result.length == 0 || !result){
            throw {msg: 'Product Not Found', status: 401}
        } else {
            if(role == 'customer' && UserId == result.UserId) {
                console.log('2 disini')
                next()
            } else {
                throw { msg: 'Not Authorized', status: 401 }
            }
        }
    }
    catch(err){
        console.log('helo')
        next(err)
    }
}

module.exports = custAuthorization




