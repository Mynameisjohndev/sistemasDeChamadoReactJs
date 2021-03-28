import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'

import styles from './SignUp.module.css'
import Logo from '../../assets/logo.png'
import {UserContext} from '../../context/user'

const Signup = () => {

    const { signup, loadingAuth } = useContext(UserContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name != '' && email != '' && password != '' ){
            signup(email, password, name);
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles.loginArea}>
                    <img src={Logo} alt="logo-do-sistema" />
                </div>

                    <form onSubmit={handleSubmit}>
                        <h1>Entrar</h1>
                        <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Insira seu nome" />
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Insira seu email" />
                        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="********" />
                        <button type="submit">{loadingAuth ? "Carregando" : "Cadastrar"}</button>
                    </form>
                    <Link to="/">Já possui uma conta?</Link>
            </div>
        </div>
    );
}

export default Signup;

  