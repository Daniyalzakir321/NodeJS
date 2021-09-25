const { Logindb } = require('../model/schema.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { token } = require('morgan');
require('dotenv').config();


const userSignUp = async (req, res) => {
    // const { email, password } = req.body
    // console.log(email, password)
    // try {
    //     if (!email || !password) return res.status(400).json({ message: 'Enter Email Password SignUp' })
    //     if (email.length < 8 || password.length < 8) return res.status(400).json({ message: 'Email Passqord Length Is Too Short SignUp' })
    //     const user = await Logindb.findOne({ email })
    //     if (user) return res.status(400).json({ message: 'User Already Exists' })
    //     if (email && password) {
    //         const salt = bcrypt.genSalt()
    //         const hash_password = bcrypt.hashSync(password, 10)
    //         if (!hash_password) return res.status(400).json({ message: 'Password is not valid SignUp' })
    //         console.log('==> ', email, hash_password)
    //         const user = new Logindb({
    //             email: email,
    //             password: hash_password,
    //         })
    //         const result = await user.save()
    //         console.log(result)
    //         const token = await jwt.sign({ id: result._id }, process.env.JWT_SECRETKEY)
    //         console.log('Tok==>>  ', token)
    //         if (!token) return res.status(400).json({ message: 'No Token exists SignUp' })
    //         res.status(200).json({
    //             email,
    //             hash_password,
    //             token
    //         })
    //     }
    // }
    // catch (error) {
    //     res.status(400).json({ message: error.message })
    // }

    const { email, password } = req.body
    console.log(email, password)
    try {
        if (!email || !password) return res.status(400).json({ message: 'Enter Email Password SignUp' })
        if (email.length < 8 || password.length < 8) return res.status(400).json({ message: 'Email Passqord Length Is Too Short SignUp' })
        const user = await Logindb.findOne({ email })
        if (user) return res.status(400).json({ message: 'User Already Exists' })
        if (email && password) {
            const salt = bcrypt.genSalt()
            const hash_password = bcrypt.hashSync(password, 10)
            if (!hash_password) return res.status(400).json({ message: 'Password is not valid SignUp' })
            const user = new Logindb({
                email: email,
                password: hash_password,
                authToken: 'demmy'
            })
            const result = await user.save()
            console.log(result)
            res.status(200).json({ message: "User Successfully Registered" })
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}



const userLogin = async (req, res) => {
    // const { email, password, token } = req.body
    // console.log(email, password, token)
    // console.log('rrrrrrrrrrrrrrrrr= : ',req.body)
    // try {
    //     if (email && password) {
    //         if (!email || !password) return res.status(400).json({ message: 'Enter Email Password Login' })
    //         if (email.length < 8 || password.length < 8) return res.status(400).json({ message: 'Email Passqord Length Is Too Short Login' })
    //         const user = await Logindb.findOne({ email })
    //         if (!user) return res.status(400).json({ message: 'No user exists' })
    //         if (user && user.password) {
    //             console.log("user==>>>  :", user)//
    //             const comparePassword = await bcrypt.compare(password, user.password)
    //             console.log("Compare==>>>  :", comparePassword)//
    //             if (!comparePassword) return res.status(400).json({ message: 'Not match' })
    //             const tokenVerify = await jwt.verify(token, process.env.JWT_SECRETKEY)
    //             console.log("Token==>>>  :", tokenVerify)//
    //             if (!tokenVerify) return res.status(400).json({ message: 'No Token exists' })
    //             const user_id = await Logindb.findById(tokenVerify.id);
    //             return res.status(200).json({
    //                 email,
    //                 comparePassword,
    //                 tokenVerify,
    //                 user_id
    //             })
    //         }
    //     }
    // }
    // catch (error) {
    //     res.status(400).json({ message: error.message })
    // }

    const { email, password } = req.body
    console.log(email, password)
    console.log('RRRR= : ', req.body)
    try {
        if (!email || !password) return res.status(400).json({ message: 'Enter Email Password Login' })
        if (email.length < 8 || password.length < 8) return res.status(400).json({ message: 'Email Passqord Length Is Too Short Login' })
        if (email && password) {
            const user = await Logindb.findOne({ email })
            if (!user) return res.status(400).json({ message: 'No user exists' })
            if (user && user.password) {
                const comparePassword = await bcrypt.compare(password, user.password)
                if (!comparePassword) return res.status(400).json({ message: 'Not match' })
                const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY)
                if (!token) return res.status(400).json({ message: 'No Token Exists' })
                user.authToken = token
                const result = await user.save()
                console.log(result)
                res.status(200).json({
                    email,
                    token,
                    message: "You Successfully LogIn"
                })
            }
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const checkUserToken = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ message: 'No Token Exists' })
        if (token) {
            const tokenVerify = await jwt.verify(token, process.env.JWT_SECRETKEY)
            console.log("Token==>>>  :", tokenVerify)//
            if (!tokenVerify) return res.status(400).json({ message: 'No Token exists' })
            const user_id = await Logindb.findById(tokenVerify.id);
            if (!user_id) return res.status(400).json({ message: 'No User Exists' })
            const { _id, email, created } = user_id
            res.status(200).json({
                _id,
            })
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { userLogin, userSignUp, checkUserToken };
