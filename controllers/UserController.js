const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { validatingPassword } = require('../helpers/bcrypt')

class UserController {

    static async signUp(req, res, next) {
        const { email, password } = req.body

        try{
            const result = await User.create({
                email,
                password
            })
            res.status(201).json({result})
        } 
        catch(err) {
            next(err)
        }
    }

    static async signIn(req, res, next) {
        const { email, password } = req.body

        try{
            const result = await User.findOne({
                where: {
                    email
                }
            })
            if(!result){
                throw {msg: 'email/password is invalid', status: 401}
            }
            else {
                if(!validatingPassword(password, result.password)){
                    throw {msg: 'email/password is invalid', status: 401}
                }
                else{
                    const access_token = generateToken({id: result.id, email: result.email, role: result.role })
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