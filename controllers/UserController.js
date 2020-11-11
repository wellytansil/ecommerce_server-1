const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')

class UserController {

    static async signIn(req, res, next) {
        const { email, password } = req.body

        try{
            const result = await User.findOne({
                where: {
                    email
                }
            })
            if(!result){
                throw {msg: 'email/password is invalid'}
            }
            else {
                if(password != result.password){
                    throw {msg: 'email/password is invalid'}
                }
                else{
                    const access_token = generateToken({ email: result.email })
                    console.log(access_token)
                    res.status(200).json({access_token})
                }
            }
        } 
        catch(err) {
            next(err)
        }
    }
}

module.exports = UserController