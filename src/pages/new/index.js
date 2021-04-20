import React, { useState, useEffect, useContext } from 'react';
import { FiPlusCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'

import { UserContext } from '../../context/user'
import Firebase from '../../services/firebaseConection';

import './new.css';
import Header from '../../components/Header';
import Title from '../../components/Title';


const New = () => {

    const [assunto, setAssunto] = useState("Suporte");
    const [status, setStatus] = useState("Em aberto");
    const [descricao, setDescricao] = useState("");

    const [customers, setCustomers] = useState([]);
    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const loadCustomers = async () => {
            await Firebase.firestore().collection('Customers')
                .get()
                .then((response) => {

                    let lista = [];

                    response.forEach((customer) => {
                        lista.push({
                            id: customer.id,
                            nomeFantasia: customer.data().nomeFantasia
                        })
                    })

                    if (lista === 0) {
                        setLoadCustomers(false);
                        setCustomers([{ id: '1', nomeFantasia: 'Freela' }])
                        return;
                    }

                    setCustomers(lista);
                    setLoadCustomers(false);

                })
                .catch(() => {
                    setLoadCustomers(false);
                    setCustomers([{ id: '1', nomeFantasia: '' }])
                    toast.error("Erro ao carregar os dados");
                })
        }
        loadCustomers();
    }, [])

    const handleRegister = async (e) => {
        e.preventDefault();
        Firebase.firestore().collection("Chamados")
            .add({
                created_at: new Date(),
                customer: customers[customerSelected].nomeFantasia,
                customer_id: customers[customerSelected].id,
                subject: assunto,
                status: status,
                complement: descricao,
                user_id: user.uid
            })
            .then(() => {
                setDescricao("");
                setCustomerSelected(0);
                toast.success("Chamado cadastrado com sucesso!");
            })
            .catch(() => {
                toast.error("Houve um erro ao cadastrar!");
            })
    }

    const handleOption = (e) => {
        setAssunto(e.target.value);
    }

    const handleStatus = (e) => {
        setStatus(e.target.value);
    }

    const handleCustomerSelected = (e) => {
        setCustomerSelected(e.target.value)
        console.log(customers[e.target.value])
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
                        {customers.length === 0 ? (
                            <input type="text" disabled={true} value="Carregando clientes ..." />
                        ) : (
                            <select value={customerSelected} onChange={handleCustomerSelected}>
                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    )
                                })}
                            </select>
                        )}

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
                                onChange={handleStatus}
                                checked={status === "Aberto"}
                            />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleStatus}
                                checked={status === "Progresso"}
                            />
                            <span>Progresso</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleStatus}
                                checked={status === "Atendido"}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder="Descreva seu problema (opcional)."
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                        <button type="submit">Registrar</button>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default New;