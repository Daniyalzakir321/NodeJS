const express= require('express')
const studentData= require('./student')
const app= express()
app.use(express.json()) //To get posted data through req.body

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})

app.get('/hello',(req,res)=>{
    res.json(studentData)
    // res.json({
    // message:"Hello Get Api",
    // message2:"Hello Get Api",
    // message3:"Hello Get Api",})
    // res.send("Hello Get Api")
})

// app.post('/hello',(req,res)=>{
//     console.log("REQUEST1:",req.body)

//     const request= req.body
//     console.log("REQUEST2:",request)
//     res.send("Posted..")
// })

app.post('/hello',(req,res)=>{
if(!req.body.email){
res.status(400)
return  res.send("400-Error..")
}

if(req.body.email){
res.status(200)
const singleRecord={
    id: studentData.length + 1,
    first_name: req.body.first_name ,
    last_name: req.body.last_name ,
    email: req.body.email ,
    gender: req.body.gender ,
    ip_address: req.body.ip_address 
}
studentData.push(singleRecord)
res.json(singleRecord)
return  res.send("200-Success..")
}

})


app.put(('/hello/:id'),(req, res)=>{
  let id= req.params.id
  let first_name= req.body.first_name 
  let last_name= req.body.last_name 
  let email= req.body.email 
  let gender= req.body.gender 
  let ip_address= req.body.ip_address 

const index = studentData.findIndex((stu)=>{
return (stu.id == Number.parseInt(id))
})
console.log("PUT-ID= ",id+"  FN= "+ first_name+"  Index= "+ index+"  Stu.id= ")

if (index>= 0){
  const new1 =studentData[index]
  new1.first_name= first_name
  new1.last_name= last_name
  new1.email= email
  new1.gender= gender
  new1.ip_address= ip_address
  res.json(new1)
}
else{
  res.status(404)
  res.end()
}
})



app.delete(('/hello/:id'),(req, res)=>{
  let id= req.params.id

const index = studentData.findIndex((stu)=>{
return (stu.id == Number.parseInt(id))
})

if (index>=0){
  const new1 =studentData[index]
  studentData.splice(index, 1)
  res.json(new1)
}
else{
  res.status(400)
}
})


// console.log("Runnning")
