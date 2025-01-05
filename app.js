require('dotenv').config()
require("./database/database.js").connect()
const User = require('./models/user')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.get("/", (req,res) => {
    res.send("<h1>server is working today .... </h1>")
})

app.post("/register", async (req,res) => {
    try {
        // get all data from body
        const {firstName, lastName, email, password} = req.body
        // certain data should exist
        if (!(firstName || lastName)) {
            res.status(400).send('At least one name field must be provided')
        }
        if (!(email && password)) {
            res.status(400).send('Email and Password are mandatory')
        }
        // check if user already exists
        const existingUser = await User.findOne({email})
        if (existingUser) {
            res.status(400).send('User already exists with this email')
        }
        // encrypt the password
        const myEncryptedPassword = await bcrypt.hash(password, 10)
        // save the user in db
        const newUser = await User.create({
            firstName, lastName, email, password : myEncryptedPassword
        })
/*        // generate a token for user and send it
        const token = jwt.sign(
            {id: newUser._id},
            'secret', // should set to access process.env.jwtsecret
            {
                expiresIn: "1h"
            }
        )
        newUser.token = token
        newUser.password = undefined
*/
        // send to front end
        res.status(201).json(newUser)

    } catch (error) {
        console.log(error)      
    }
})

app.post('/login', async (req,res) => {
    try {
        // get all data from request
        const {email, password} = req.body
        if (!(email && password)) {
            res.status(400).send('missing input')
        }
        // find user in db
        const singingInUser = await User.findOne({email})
        if (!(singingInUser)) {
            res.status(400).send('User does not exist')
        }
        // validate password
        const isPwdMatch = await bcrypt.compare(password, singingInUser.password)
        console.log("isPwdMatch: " + isPwdMatch);
        
        if (!isPwdMatch) {
            res.status(401).send("password didn't match!")            
        }
        const {JWT_SECRET} = process.env
        //if (singingInUser && isPwdMatch) { // getting errors with this being true for valid scenarios
            const token = jwt.sign(
                {id: singingInUser._id},
                JWT_SECRET, 
                {
                    expiresIn: "1h"
                }
            );
            singingInUser.token = token
            singingInUser.password = undefined
        //} // left out if condition to avoid error

        // if valid send a token 

        // cookie section
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000), // expires in 3 days using units of milliseconds
            httpOnly: true
        };
        res.status(200).cookie("token", singingInUser.token, options).json({
            success: true,
            token,
            singingInUser
        })

    } catch (error) {
        console.log(error);        
    }
})

app.get("/dashboard", (req,res) => {
    // grab token from cookie

    // stop if no token

    // decode token

    res.send('Welcome to dashboard')
})

module.exports = app