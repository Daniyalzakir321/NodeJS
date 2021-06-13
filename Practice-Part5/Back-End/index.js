const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose')

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

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
// app.use(express.text())
// app.use(express.static('./public'))
app.use(cookieParser())
app.use(morgan('tiny'))

const { router, router2 } = require('./router/router.js')
app.use(router)
app.use('/api/students', router2)

PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})
