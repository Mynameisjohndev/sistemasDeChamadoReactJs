import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import './styles.css';

import Header from '../../components/Header';
import Title from '../../components/Title';


const Customers = () => {

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    const handleCreateUser = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Meu perfil">
                    <FiUser size={24} color="#000" />
                </Title>

                <div className="container">
                    <form className="form-profile customer" onSubmit={handleCreateUser}>

                        <label>Nome fantasia</label>
                        <input type="text" value={nomeFantasia}
                            placeholder="Nome" onChange={(e) => setNomeFantasia(e.target.value)} />

                        <label>Cnpj</label>
                        <input type="text" value={cnpj}
                            placeholder="Cnpj" onChange={(e) => setCnpj(e.target.value)} />

                        <label>Endereço</label>
                        <input type="text" value={endereco}
                            placeholder="Endereço" onChange={(e) => setEndereco(e.target.value)} />

                        <button type="submit">Cadastrar</button>

                    </form>
                </div>

            </div>

        </div>
    )
}

export default Customers;
