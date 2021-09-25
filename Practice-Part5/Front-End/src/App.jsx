import React, { useState, useEffect } from 'react';
import './App.css';
// import db from './firebase';
// import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import axios from 'axios';
import LogIn from './auth/login'
import SignUp from './auth/signup'


function App() {
  // const baseUrl= 'https://employeetodo.herokuapp.com'
  const baseUrl = 'http://localhost:8000'

  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const employee = { name: text, salary: true, rupees: 100000 }
  const [log, setLog] = useState(null)

  useEffect( async() => {
    getData()
    
    await axios.get(`${baseUrl}/auth/checkuser`,
      {
        headers: { token: localStorage.getItem("auth-token") }
      })
      .then((res) => {
        console.log('Check User :', res)
        setLog(res.data._id?res.data._id:null)
      })
  }, [])

  function Logout(){
    localStorage.removeItem("auth-token")
  }
  
  // Get  
  const getData = async () => {
    await axios.get(baseUrl)
      .then((result) => {
        console.log(result.data)
        setTodos(result.data)
      })
  }

  // Add
  const Add = async (e) => {
    e.preventDefault()
    console.log(text)
    await axios.post(`${baseUrl}/api/employee/`, employee)
      .then((result) => {
        console.log(result)
        getData()
      })
  }

  // Update
  const Update = async (id, dname) => {
    console.log(id)
    const modify = prompt('Enter Todo To Add', dname)
    if (modify) {
      await axios.put(`${baseUrl}/api/employee/${id}`, { name: modify })
        .then((result) => {
          console.log(result)
          getData()
        })
    }
  }


  // Delete
  const Delete = async (id) => {
    console.log(id)
    await axios.delete(`${baseUrl}/api/employee/${id}`)
      .then(() => {
        console.log('
  // DeleteAll
  const DeleteAll = async () => {
    await axios.delete(`${baseUrl}/api/employee/deleteall`)
      .then(() => {
        console.log('success')
        getData()
      })
  }


  const vonageMessage = async () => {
    console.log('vonagemessage')
    await axios.post(`${baseUrl}/vonagemessage`)
      .then(() => {
        console.log('success')
      })
  }

  return (
    <div>
      <h1 className="Todo__Header">☑ TODO APP WITH Node JS<Button variant="outlined" color="primary" size="medium" onClick={() => vonageMessage()}> <MessageOutlinedIcon /> </Button> </h1>
      {log?<>{`You are LogIn : ${log}`}
      <Button  variant="contained" 
      color="primary" 
      onClick={()=>Logout()}>
        Logout</Button></>
      :
      <> <SignUp /><LogIn /></>}

      <form>
        <Paper elevation={5} className="Add__Todo">
          <TextField className="Text__Field" label="Enter Todos" value={text} onChange={(e) => setText(e.target.value)}
            inputProps={{ maxLength: 55 }}
          /> <br /> <br />
          <Button type="sumit" variant="contained" color="primary" disabled={!text} onClick={Add}>ADD &nbsp;<AddBoxOutlinedIcon /></Button>
          <Button variant="contained" color="primary" onClick={DeleteAll}>DELETE ALL &nbsp;<DeleteOutlinedIcon /></Button>

        </Paper>
      </form>

      {todos.map((data, i) => {
        return <Paper elevation={5} className="Todos_Rendering" key={i}>
          <p> {data._id} &nbsp;&nbsp;&nbsp;  {data.name}</p>
          <div>
            <Button variant="contained" color="primary" onClick={() => Update(data._id, data.name)}>UPDATE &nbsp; <UpdateIcon /></Button>
            <Button variant="contained" color="primary" onClick={() => Delete(data._id)}>DELETE &nbsp;<DeleteOutlinedIcon /></Button>
          </div>
          <span>{data.timeF}</span>
        </Paper>
      })
      }

      <div>
        {/* <iframe src="https://tokbox.com/embed/embed/ot-embed.js?embedId=6b42a9bc-0387-48c1-a826-888b5a1abf21&room=DEFAULT_ROOM&iframe=true" width="700" height="500" scrolling="auto" allow="microphone; camera"></iframe> */}
      </div>
    </div>
  );
}

export default App;





