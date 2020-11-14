if (process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require("express")
const app = express()
const port = 3000
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.get('/', (req, res) => {
    res.status(200).json('HALO')
})

app.use(errorHandler)


app.listen(port, () => {
    console.log('listen at http://localhost:' + port)
})


module.exports = app
