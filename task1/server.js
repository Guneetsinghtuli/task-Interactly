const express = require('express')
const cors = require('cors')
require('dotenv').config({
    path: '.env.production'

})
const db = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/api", require("./router/contactRouter"))

app.get("/ping", (req, res) => {
    res.send({
        success: true,
        message: "pong"
    })
});

// Wildcard route
app.get("*", (req, res) => {
    res.status(404).send({
        success: false,
        message: "Route does not exist"
    })
})




app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})