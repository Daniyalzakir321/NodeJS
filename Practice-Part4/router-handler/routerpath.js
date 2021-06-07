const express= require('express')
const router= express.Router();
const router2= express.Router();

router2.get('/', ( req, res )=>{
     res.cookie("keys","values")
     res.cookie("cookie1","value1")
     res.cookie("cookie2","value2")
    res.status(200).send('COOKIES SEND')
})

router2.get('/cookie', ( req, res )=>{
   res.status(200).send(req.cookies)
})



employee=[
    { id:1, name:'Daniyal'},
    { id:2, name:'Zayan'},
    { id:3,name:'Basiq'},
    ]
    
    router.get('/', ( req, res )=>{
        res.status(200).send(employee)
    })
    
    
    router.post('/api/employee', ( req, res )=>{
        let name=req.body.name
        if(name){
        let emp={
            id:employee.length+1,
            name: name
        }
        employee.push(emp)
        res.status(200).send(emp)
        }
        res.status(400).send("Not Found")
    })
    
    
    router.put('/api/employee/:id', ( req, res )=>{
        let id= +req.params.id
        let name= req.body.name
        let index= employee.findIndex((i)=>{   
            return (i.id == id)
        })  
        if(index>=0){
        let record= employee[index] 
        record.name= name
        res.status(200).send(record)
        }
        else{
        res.status(400).send('Index Not Found')
        }
    })
    // OR
    // router.put('/api/employee/:id', ( req, res )=>{
    //     let id= +req.params.id
    //     let name= req.body.name
    //     let index= employee.find((i)=>{   
    //         return (i.id == id)
    //     })
    //     console.log(name)    
    //     if(index.id>=0){
    //     index.name= name
    //     res.status(200).send(index)
    //     }
    //     else{
    //     res.status(400).send('Index Not Found')
    //     }
    // })
    
    
    router.delete('/api/employee/:id', ( req, res )=>{
        let id= +req.params.id
        let index= employee.findIndex((i)=>{
            if(i.id == id){
                return i
            }
        })
        if(index>=0){
        let record= employee[index] 
        employee.splice(index, 1)
        res.status(200).send(record)
       }
       else{
        res.status(400).send('Index Not Found')
       }
    })
    
    
    // QUERY PARAMETER
    // http://localhost:3000/api/employee?name=daniyal&orderby=asc&page=20
    router.get('/api/employee', ( req, res )=>{
        let qp= req.query
        console.log("NAME:"+qp.name, " ORDERBY:"+qp.orderby, " PAGE:"+qp.page)
        res.status(200).send(qp)
    })
    
    module.exports= {router,router2}
