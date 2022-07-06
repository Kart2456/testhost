import React, { useContext }from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export const NavBar = () => {
    const history = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history('/')
    }

    return (
        <nav>
        <div className="nav-wrapper blue-grey darken-4" style={{ padding: '0 2rem'}}>
          <span href="#" className="brand-logo">Сокращение ссылок</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">Создать</NavLink></li>
            <li><NavLink to="/links">Ссылки</NavLink></li>
            <li><NavLink to="/detail">detail</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
          </ul>
        </div>
      </nav>
    )
}