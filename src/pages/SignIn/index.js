import { useState } from 'react';
import { Link } from 'react-router-dom'

import styles from './SignIn.module.css'
import Logo from '../../assets/logo.png'

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles.loginArea}>
                    <img src={Logo} alt="logo-do-sistema" />
                </div>

                    <form>
                        <h1>Entrar</h1>
                        <input type="text" placeholder="Insira seu email" />
                        <input type="password" placeholder="********" />
                        <button type="submit">Acessar</button>
                    </form>

                    <Link to="/register">Criar uma nova conta</Link>
            </div>
        </div>
    );
}

export default Signin;
