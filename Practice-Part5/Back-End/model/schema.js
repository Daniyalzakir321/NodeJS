const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength:8,
    },
    password: {
        type: String,
        required: true,
        minlength:8,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    authToken:{
        type: [String],
        unique: true,
        minlength:15,
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        // validate: {
        //     validator: function(v) {
        //         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        //     },
        //     message: "Please enter a valid email"
        // },
        required: [true, "Email required"]
    },
})
// loginSchema.plugin(autoIncrement.plugin, 'loginSchema');
const Logindb = mongoose.model('loginSchema', loginSchema)


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // age: Number,
    // email: String,
    // phone: [String],
    // isAdmin: Boolean
})
userSchema.plugin(autoIncrement.plugin, 'userdbnames');
const Userdb = mongoose.model('userdbnames', userSchema)



const salarySchema = new mongoose.Schema({
    salary: Boolean,
    rupees: Number
})
salarySchema.plugin(autoIncrement.plugin, 'salaries');
const Salarydb = mongoose.model('salaries', salarySchema)


module.exports = { Userdb, Salarydb, Logindb };