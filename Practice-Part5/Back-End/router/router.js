const router = require('express').Router();
const router2 = require('express').Router();
const {getData, postData, putData, deleteData, deleteAllData} =require('../controller/controller.js')

router.get('/', getData )

router.post('/api/employee', postData)

router.put('/api/employee/:id', putData)

router.delete('/api/employee/:id', deleteData)

router.delete('/api/employee/deleteall', deleteAllData)

// QUERY PARAMETER
// http://localhost:3000/api/employee?name=daniyal&orderby=asc&page=20
router.get('/api/employee', (req, res) => {
    let qp = req.query
    console.log("NAME:" + qp.name, " ORDERBY:" + qp.orderby, " PAGE:" + qp.page)
    res.status(200).send(qp)
})


router2.get('/', (req, res) => {
    res.cookie("keys", "values")
    res.cookie("cookie1", "value1")
    res.cookie("cookie2", "value2")
    res.status(200).send('COOKIES SEND')
})

router2.get('/cookie', (req, res) => {
    res.status(200).send(req.cookies)
})

module.exports = { router, router2 }
