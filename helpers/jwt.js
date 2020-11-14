const jwt = require("jsonwebtoken")

function generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET)
    return token
}

function decodingToken(token) {
    const decoded = jwt.verify(token, process.env.SECRET)
    return decoded
}

module.exports = { generateToken, decodingToken }