import React, { useState } from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';

import './new.css';
import { FiPlusCircle } from 'react-icons/fi'

const New = () => {

    const [assunto, setAssunto] = useState("Suporte");


    function handleRegister(e) {
        e.preventDefault();
        alert('TESTE')
    }

    const handleOption = (e) => {
        setAssunto(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Novo chamado">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">

                    <form className="form-profile" onSubmit={handleRegister} >

                        <label>Cliente</label>
                        <select>
                            <option key={1} value={1}>
                                Jooj
              </option>
                        </select>

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleOption}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value="Aberto"
                            />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                            />
                            <span>Progresso</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Atendido"
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder="Descreva seu problema (opcional)."
                        />

                        <button type="submit">Registrar</button>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default New;