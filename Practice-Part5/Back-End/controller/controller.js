const Vonage = require('@vonage/server-sdk')
const { Userdb, Salarydb } = require('../model/schema.js')
const { client } = require('../index')

const vonageMessage = (req, res) => {
    const vonage = new Vonage({
        apiKey: "3f0540e7",
        apiSecret: "rkLwbOB1rd805AXL"
    })

    const from = "Todo NodeJS"
    const to = "923128793647"
    const text = 'A text message sent using the \nVonage SMS API. \nYour Meeting will be scheduled on this Monday at 12:00pm. \nThanks Regards \nVonage '
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}

const getData = async (req, res) => {
    try {
        // client.set("DATA", async function (err) {
        //     console.error(err);
            let user = await Userdb.find().sort({ _id: 1 })

        // });
        res.status(200).json(user)
        // client.get("hello", function (err) {
        //     console.error(err); 
        // });

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const postData = async (req, res) => {
    let name = req.body.name
    let salary = req.body.salary
    let rupees = req.body.rupees
    console.log(name, salary, rupees, req.body)
    try {
        if (name) {
            const user = new Userdb({
                name: name,
            })
            const result = await user.save()
            console.log(result)
            res.status(200).json(result)
        }
        else if (salary && rupees) {
            const userSalary = new Salarydb({
                salary: salary,
                rupees: rupees
            })
            const result2 = await userSalary.save()
            console.log(result2)
            res.status(200).json(result2)
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const putData = async (req, res) => {
    let id = req.params.id
    let name = req.body.name
    console.log(id, name)
    try {
        const user = await Userdb.findById(id)
        if (user) {
            user.name = name
            user.isAdmin = "false"
            let result = await user.save()
            console.log(result)
            res.status(200).json(result)
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteData = async (req, res) => {
    let id = req.params.id
    console.log(id)
    try {
        const user = await Userdb.findById(id)
        if (user) {
            let result = await user.delete()
            console.log(result)
            res.status(200).json(result)
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteAllData = async (req, res) => {
    try {
        if (Userdb) {
            let result = await Userdb.collection.drop()
            console.log(result)
            res.status(200).json(result)
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = { getData, postData, putData, deleteData, deleteAllData, vonageMessage };



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
// console.log(result) // to use console findByIdAndUpdate()
// // OR
// const user= await Userdb.findById(id) 
// if(user){
//    user.name="hello"
//    user.isAdmin="false"
//     let result= await user.save() 
//     console.log(result) }
// return
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






// mongoose.connect(process.env.DATABASE, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log('MongoDB Connection Succeeded.')
//     })
//     .catch(err => {
//         console.log('Error in DB connection: ' + err)
//     })

// mongoose.Promise = global.Promise;
// Connect MongoDB at default port 27017.
