import { useState, useEffect, useContext } from 'react';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user'

import Header from '../../components/Header';
import Title from '../../components/Title';

import Firebase from '../../services/firebaseConection';

import './dashboard.css'

const Dashboard = () => {
    const { signout } = useContext(UserContext)
    const [chamados, setChamados] = useState([0]);

    const listREF = Firebase.firestore().collection("Chamados").orderBy("created_at", "desc")
    const [ loadgin, setLoading ] = useState(true);
    const [ loadingMore, setLoadingMore ] = useState(false)

    useEffect(() => {
        loadChamados();
        return () => {

        }
    }, [])

    const loadChamados = async () => {
        await listREF.limit(5)
            .get()
            .then((res) => {
                res.forEach((item) => {
                    console.log(item)
                    setLoadingMore(false);
                })
            })
            .catch(() => {

            });
            setLoading(false);
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Atendimentos">
                    <FiMessageSquare size={25} />
                </Title>

                {chamados.length === 0 ? (
                    <div className="container dashboard">
                        <span>Nenhum chamado registrado...</span>

                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Cliente">Sujeito</td>
                                    <td data-label="Assunto">Suporte</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{ backgroundColor: '#5cb85c' }}>Em aberto</span>
                                    </td>
                                    <td data-label="Cadastrado">20/06/2021</td>
                                    <td data-label="#">
                                        <button className="action" style={{ backgroundColor: '#3583f6' }}>
                                            <FiSearch color="#FFF" size={17} />
                                        </button>
                                        <button className="action" style={{ backgroundColor: '#F6a935' }}>
                                            <FiEdit2 color="#FFF" size={17} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}

            </div>

        </div>
    );
}

export default Dashboard;