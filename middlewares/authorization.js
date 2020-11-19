const { Product } = require("../models")

async function authorization(req, res, next) {
    const id = +req.params.id
    const { role } = req.isSignedIn

    try{
        const result = await Product.findAll({
            where: {
                id: id
            }
        })
        
        if(result.length == 0){
            throw {msg: 'Product Not Found', status: 401}
        } else {
            if(role === 'admin') {
                next()
            } else {
                throw {msg: 'Not Authorized', status: 401}
            }
        }
    }
    catch(err){
        next(err)
    }
}

module.exports = authorization




