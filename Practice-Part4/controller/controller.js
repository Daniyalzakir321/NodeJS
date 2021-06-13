const { Userdb, Salarydb } = require('../model/user-schema.js')

const getData = async (req, res) => {
    // res.status(200).send(employee)
    try {
        let user = await Userdb.find()
        res.status(200).json(user)
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
    // if (name) {
    //     let emp = {
    //         id: employee.length + 1,
    //         name: name
    //     }
    //     employee.push(emp)
    //     res.status(200).send(emp)
    // }
    // res.status(400).send("Not Found")
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
    // let index = employee.findIndex((i) => {
    //     return (i.id == id)
    // })
    // if (index >= 0) {
    //     let record = employee[index]
    //     record.name = name
    //     res.status(200).send(record)
    // }
    // else {
    //     res.status(400).send('Index Not Found')
    // }
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
// OR
// const putData = (req, res) => {
//     let id = +req.params.id
//     let name = req.body.name
//     let index = employee.find((i) => {
//         return (i.id == id)
//     })
//     console.log(name)
//     if (index.id >= 0) {
//         index.name = name
//         res.status(200).send(index)
//     }
//     else {
//         res.status(400).send('Index Not Found')
//     }
// }

const deleteData = async (req, res) => {
    let id = req.params.id
    console.log(id)
    // let index = employee.findIndex((i) => {
    //     if (i.id == id) {
    //         return i
    //     }
    // })
    // if (index >= 0) {
    //     let record = employee[index]
    //     employee.splice(index, 1)
    //     res.status(200).send(record)
    // }
    // else {
    //     res.status(400).send('Index Not Found')
    // }
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
    // if (employee) {
    //     employee.remove()
    //     res.status(200).send(record)
    // }
    // else {
    //     res.status(400).send('Index Not Found')
    // }
    try {
        if (Userdb) {
            let result = await Userdb.collection.delete()
            console.log(result)
            res.status(200).json(result)
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = { getData, postData, putData, deleteData, deleteAllData };