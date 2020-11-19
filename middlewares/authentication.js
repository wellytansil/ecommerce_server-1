const { decodingToken } = require('../helpers/jwt')
const { User } = require('../models/')

async function authentication(req, res, next) {
    const { token } = req.headers
    try{
        if(!token || token == '') {
            throw { msg: 'Authentication failed', status: 401 }
        }
        else {
            const decoded = decodingToken(token)
            const result = await User.findOne({
                where: {
                    email: decoded.email
                }
            })

            if(!result) {
                throw { msg: 'Authentication failed', status: 401 }
            }
            else {
                req.isSignedIn = decoded
                next()
            }
        }
    }
    catch(err) {
        next(err)
    }
}

module.exports = authentication