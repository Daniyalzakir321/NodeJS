const express= require('express')
const app= express();
app.use(express.json());
PORT= process.env | 3000
app.listen(PORT,()=>{
    console.log('listening on port',PORT)
})

employee=[
{ id:'1', name:'Daniyal'},
{ id:'2', name:'Zayan'},
{ id:'3',name:'Basiq'},
]

app.get('/', ( req, res )=>{
    res.status(200).send(employee)
})


app.post('/api/employee', ( req, res )=>{
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


app.put('/api/employee/:id', ( req, res )=>{
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
// app.put('/api/employee/:id', ( req, res )=>{
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


app.delete('/api/employee/:id', ( req, res )=>{
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
app.get('/api/employee', ( req, res )=>{
    let qp= req.query
    console.log("NAME:"+qp.name, " ORDERBY:"+qp.orderby, " PAGE:"+qp.page)
    res.status(200).send(qp)
})
