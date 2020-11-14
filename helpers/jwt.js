const jwt = require("jsonwebtoken")

function generateToken(payload) {
    const token = jwt.sign(payload, 'hehe')
    return token
}

function decodingToken(token) {
    const decoded = jwt.verify(token, 'hehe')
    return decoded
}

module.exports = { generateToken, decodingToken }