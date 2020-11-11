const jwt = require("jsonwebtoken")

function generateToken(payload) {
    const token = jwt.sign(payload, 'rahasia')
    return token
}

function decodingToken(token) {
    const decoded = jwt.verify(token, 'rahasia')
    return decoded
}

module.exports = { generateToken, decodingToken }