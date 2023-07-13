import React from 'react';
import './login.scss'
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { doLogin } from '../../hooks/requests';
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        let data = { email, password }
        let res = await doLogin(data)
        if (res) {
            console.log('fail u', res.response.status)
            if (res?.response?.status === 401) {
                setErr('Email wrong')
                setLoading(false)
                setTimeout(() => {
                    setErr('')
                }, 3000);
            }
        }
    }

    return (
        <div className='login'>
            <div className='login-wrapper'>
                <div className='form-group'>
                    <h5 className='text-cetner'>Admin Login</h5>
                </div>
                <br />
                <div className='form-group'>
                    <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} type={'email'} className='form-control' />
                </div>
                <br />
                <div className='form-group'>
                    <input className='form-control' onChange={(e) => setPassword(e.target.value)} placeholder='Paswword' type={'password'} />
                </div>
                <br />
                {
                    err
                    &&
                    <label className='mb-3 text-center' style={{ color: 'red', textAlign: 'center' }}>invalid credentials</label>
                }
                <Button disabled={!email || !password ? true : loading ? true : false} onClick={handleLogin} type="primary" block style={{ width: 300, fontWeight: 'bold', }}>
                    Login
                </Button>
            </div>
        </div>
    );
};

export default Login