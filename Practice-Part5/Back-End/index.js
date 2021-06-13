const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose')
// DATABASE = mongodb://localhost/application
mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB Connection Succeeded.')
    })
    .catch(err => {
        console.log('Error in DB connection: ' + err)
    })
// // const mongoose = require('mongoose');
// // mongoose.Promise = global.Promise;
// // // Connect MongoDB at default port 27017.
// // mongoose.connect('mongodb://localhost:27017/DB Name', {
// //     useNewUrlParser: true,
// //     useCreateIndex: true,
// // }, (err) => {
// //     if (!err) {
// //         console.log('MongoDB Connection Succeeded.')
// //     } else {
//     // console.log('Error in DB connection: ' + err)
// //     }
// // });

// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String,
//     phone: [String],
//     isAdmin: Boolean
// })

// const Userdb = mongoose.model('userdbname', userSchema)

// async function createUser() {
//     const user = new Userdb({
//         name: 'Daniyal',
//         age: 24,
//         email: 'daniyalzakir03@gmail.com',
//         phone: ['0132231321', '0324423432'],
//         isAdmin: false,
//     })
//     const result = await user.save()
//     console.log(result)
// }
// createUser()

// async function update(id){
//     const result= await Userdb.update({_id: id}, {
//     $set:{   
//         name="hello",
//         isAdmin=false
//     },
//     $inc:{   
//         age= 1    //-1 for decrease
//     },
// }, {new: true}// to retrieve new updated value
// )
// // console.log(result) // to use console findByIdAndUpdate()

// // OR

// // const user= await Userdb.findById(id) 
// // if(user){
// //    user.name="hello"
// //    user.isAdmin="false"
// //     let result= await user.save() 
// //     console.log(result) }
// // return
// }
// update('_4edfsfsa32d324drs')

// async function getUsers(){
//     let page= 4
//     let limit= 10
// const result= await Userdb.find()   
// const result= await User.findById('_4edfsfsa32d324drs')   
// const result= await User.find()
// .skip((page-1) * limit).select('_id').limit(limit)  // formula to get pagignation
// .skip(2) //skip starting 2 records
// .countDocuments() // doc counts
// .and([{name: 'Daniyal'}, {isAdmin: false}])  //.or([{isAdmin: false}])
// .select({name: 1,_id: 0})  //0 =>don't select,    1 =>select
// .sort({name: 1}) //acending order
// .limit(1)
// .sort({name: -1}) //acending order   
// console.log(result)
// }
// getUsers()

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
