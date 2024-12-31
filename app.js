require('dotenv').config()
require("./database/database.js").connect()
const express = require('express')

const app = express()
app.use(express.json())

app.get("/", (req,res) => {
    res.send("<h1>server is working today .... </h1>")
})

app.post("/register", async (req,res) => {
    try {
        // get all data from body
        const {firstName, lastName, email, password} = req.body
        // all the data should exist
        if (!(firstName && lastName && email && password)) {
            res.status(400)
        }
        // check if user already exists
        // encrypt the password
        // save the user in db
        // generate a token for user and send it
        
    } catch (error) {
        console.log(error();
        );
        
    }
})

module.exports = app