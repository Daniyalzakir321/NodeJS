import React, { useState, } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import '../App.css';

export default function LogIn() {
    const baseUrl = 'http://localhost:8000'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const token = localStorage.getItem("auth-token")
    // console.log('pp==>', token)

    const logInFunction = async (e) => {
        e.preventDefault()
        // const data = { email, password, token }
        const data = { email, password }
        console.log('Front :', data)
        await axios.post(`${baseUrl}/auth/login`, data)
            .then((res) => {
                console.log('Login :', res)
                res.data && res.data.token && localStorage.setItem("auth-token", res.data.token)
                alert(res.data.message)
            })
    }
    // console.log(result)

    return (
        <div>
            <form>
                <Paper elevation={5} className="Add__Todo">
                    <TextField className="Text__Field"
                        label="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    /> <br /> <br />
                    <TextField className="Text__Field"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    /> <br /> <br />
                    <Button type="sumit"
                        variant="contained"
                        color="primary"
                        onClick={logInFunction}>Sign In &nbsp;
                        <AddBoxOutlinedIcon />
                    </Button>
                </Paper>
            </form>
        </div>
    )
}
