const mongoose = require('mongoose')
const  autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const userSchema = new mongoose.Schema({
    name: String,
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


module.exports = {Userdb, Salarydb};