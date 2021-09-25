const express = require('express')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const redis = require("redis");
const redisStore = require('connect-redis')(session);
require('dotenv').config();
const mongoose = require('mongoose');
const { userLogin, userSignUp, checkUserToken } = require('./controller/auth.js')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

const client = redis.createClient({
    host: '127.0.0.1',
    port: '6379',
})
// const client = redis.createClient("redis://localhost:6379")
client.on("error", function (error) {
    console.error("Redis Error: ", error);
});
client.on('connect', function () {
    console.log('Redis Connected!');
});


const corsOptions = {
    origin: process.env.ORIGIN,
    // methods: GET,HEAD,PUT,PATCH,POST,DELETE,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

const app = express();
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: process.env.SESSIO,
     // create new redis store.
    // store: new redisStore({ host: 'localhost', port: 6379, client: client}),
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true, // secure true will cause not intialize session error 
        maxAge: oneDay
    },
    // genid: (req) => {
    //     // Returns a random string to be used as a session ID 
    //     console.log(req.sessionID)
    // }
}))
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors());
app.use(cors(corsOptions));
// app.use(express.text())
// app.use(express.static('./public'))
app.use(cookieParser())
app.use(morgan('tiny'))
const { router, router2 } = require('./router/router.js')
app.use(router)
app.use('/api/students', router2)
const { authRouter } = require('./router/auth-routes.js')
app.use('/auth', authRouter)
PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})

module.exports = { client , app}