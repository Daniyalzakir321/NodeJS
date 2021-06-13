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
import axios from 'axios';

function App() {
  // const baseUrl= 'https://employeetodo.herokuapp.com/'
  const baseUrl = 'http://localhost:8000'

  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const employee = { name: text, salary: true, rupees: 100000 }

  useEffect(() => {
    getData()
  }, [])

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
        console.log('success')
        getData()
      })

  }


  // DeleteAll
  const DeleteAll = async () => {
    await axios.delete(`${baseUrl}/api/employee/deleteall`)
      .then(() => {
        console.log('success')
        getData()
      })
  }


  return (
    <div>
      <h1 className="Todo__Header">☑ TODO APP WITH Node JS</h1>
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
    </div>
  );
}

export default App;

