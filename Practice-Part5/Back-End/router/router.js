const router = require('express').Router();
const router2 = require('express').Router();
const {getData, postData, putData, deleteData, deleteAllData, vonageMessage} =require('../controller/controller.js')
const {userLogin, userSignUp, checkUserToken} =require('../controller/auth.js')

// router.use(userLogin, checkUserToken)

router.get('/', getData )

router.post('/api/employee', postData)

router.put('/api/employee/:id', putData)

router.delete('/api/employee/:id', deleteData)

router.delete('/api/employee/deleteall', deleteAllData)

router.post('/vonagemessage', vonageMessage )

// QUERY PARAMETER
// http://localhost:3000/api/employee?name=daniyal&orderby=asc&page=20
router.get('/api/employee', (req, res) => {
    let qp = req.query
    console.log("NAME:" + qp.name, " ORDERBY:" + qp.orderby, " PAGE:" + qp.page)
    res.status(200).send(qp)
})

// express-session || also can be use with redis store 
router.get("/sessionget", function (req, res) {
    var session = req.session
    console.log(session)
    if (req.session.page_views) {
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
    // To destroy session you can use this function 
    //  req.session.destroy(function(error){
    //     console.log("Session Destroyed")
    // })
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
