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
userSchema.plugin(autoIncrement.plugin, 'userdbname');
const Userdb = mongoose.model('userdbname', userSchema)



const salarySchema = new mongoose.Schema({
    salary: Boolean,
    rupees: Number
})
salarySchema.plugin(autoIncrement.plugin, 'salary');
const Salarydb = mongoose.model('salary', salarySchema)


module.exports = {Userdb, Salarydb};