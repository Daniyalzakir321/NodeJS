const authRouter = require('express').Router();
const { userLogin, userSignUp, checkUserToken} =require('../controller/auth.js')

authRouter.post('/login', userLogin )

authRouter.post('/signup', userSignUp)

authRouter.get('/checkuser', checkUserToken)

module.exports = { authRouter}
