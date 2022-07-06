import React, { useContext, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/massage.hook'
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({ 
        email: '', password: '',
    })

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.username)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue-grey darken-4">
        `           <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="goni mulo" id="email" type="text" name="email" className="yellow-input" value={form.email} onChange={changeHandler}/>
                                <label htmlFor="email"></label>
                            </div>
                            <div className="input-field">
                                <input placeholder="goni parol" id="password" type="password" name="password" className="yellow-input" value={form.password} onChange={changeHandler}/>
                                <label htmlFor="password"></label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{marginRight: 10}} onClick={loginHandler} disabled = {loading}>Войти</button>
                        <button className="btn gray darken-4" onClick={registerHandler} disabled = {loading}>Регистрация</button>
                    </div>
                </div>`
            </div>
        </div>
    )
}