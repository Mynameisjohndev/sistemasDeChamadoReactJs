import { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './SignIn.module.css'
import Logo from '../../assets/logo.png'

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Clicou")
    }

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles.loginArea}>
                    <img src={Logo} alt="logo-do-sistema" />
                </div>

                    <form onSubmit={handleSubmit}>
                        <h1>Entrar</h1>
                        <input onChange={(e)=>setEmail(e.target.valuea)} type="text" placeholder="Insira seu email" />
                        <input onChange={(e)=>setPassword(e.target.valuea)} type="password" placeholder="********" />
                        <button type="submit">Acessar</button>
                    </form>

                    <Link to="/register">Criar uma nova conta</Link>
            </div>
        </div>
    );
}

export default Signin;
