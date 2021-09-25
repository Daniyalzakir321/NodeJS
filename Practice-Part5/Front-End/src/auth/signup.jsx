import React, { useState,  } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import '../App.css';


export default function SignUp() {
    const baseUrl = 'http://localhost:8000'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const SignUp = async (e) => {
        e.preventDefault()
        const data = { email: email, password: password }
        console.log(data)
        await axios.post(`${baseUrl}/auth/signup`, data)
            .then((res) => {
                // console.log(res)
                console.log('SignUp :',res.data)
                alert(res.data.message)
                // console.log(res.data.token)
                // setResult(res.data)
                // res.data && res.data.token && localStorage.setItem("auth-token", res.data.token)
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
                        onClick={SignUp}>Sign Up &nbsp;
                        <AddBoxOutlinedIcon />
                    </Button>
                </Paper>
            </form>
        </div>
    )
}
