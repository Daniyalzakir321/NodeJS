const express= require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const app= express();
app.use(express.json());
// app.use(express.urlencoded())
// app.use(express.text())
// app.use(express.static('./public'))
app.use(cookieParser())
app.use(morgan('tiny'))

const {router, router2}= require('./router-handler/routerpath')
app.use(router)
app.use('/api/students',router2)



PORT= process.env | 3000
app.listen(PORT,()=>{
    console.log('listening on port',PORT)
})
