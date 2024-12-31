require('dotenv').config()
require("./database/database.js").connect()
const express = require('express')

const app = express()

app.get("/", (req,res) => {
    res.send("<h1>server is working today .... </h1>")
})

module.exports = app