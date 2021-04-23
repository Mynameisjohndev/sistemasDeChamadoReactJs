import { useState, useEffect, useContext } from 'react';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user'
import { format } from 'date-fns'

import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';
import Firebase from '../../services/firebaseConection';

import './dashboard.css'
const listREF = Firebase.firestore().collection("Chamados").orderBy("created_at", "desc");

const Dashboard = () => {
    const { } = useContext(UserContext)
    const [chamados, setChamados] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const [ showPostModal, setShoePostModal ] = useState(false);
    const [ details, setDetails ] = useState();

    useEffect(() => {
        const loadChamados = async () => {
            await listREF.limit(5)
                .get()
                .then((res) => {
                    updateState(res);
                    setLoadingMore(false);
                })
                .catch(() => {
                });
            setLoading(false);
        }
        loadChamados();
        return () => {
        }
    }, [])


    const updateState = async (res) => {
        const isCollectionEmpty = res.size === 0;
        if (!isCollectionEmpty) {
            let list = [];
            res.forEach((item) => {
                list.push({
                    id: item.id,
                    assunto: item.data().subject,
                    cliente: item.data().customer,
                    clienteId: item.data().customer_id,
                    created: item.data().created_at,
                    createdFormated: format(item.data().created_at.toDate(), 'dd/MM/yyyy'),
                    status: item.data().status,
                    complemento: item.data().complement
                })
            })

            const lastDoc = res.docs[res.docs.length - 1]
            setChamados(chamados => [...chamados, ...list]);
            setLastDocs(lastDoc);
        } else {
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    const handleMore = async () => {
        setLoadingMore(true);
        await listREF.startAfter(lastDocs).limit(5)
            .get()
            .then((snapshot) => {
                updateState(snapshot)
            })
    }
    const loadItem = (item) =>{
        setShoePostModal(!showPostModal);
        setDetails(item);
    }

    if (loading) {
        return (
            <div>
                <Header />
                <div className="content">
                    <Title name="Atendimentos">
                        <FiMessageSquare size={25} />
                    </Title>
                    <div className="container dashboard">
                        <span>Buscando chamados...</span>
                    </div>
                </div>
            </div>
        )
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
                                {chamados.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-label="Cliente">{item.cliente}</td>
                                            <td data-label="Assunto">{item.assunto}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{ backgroundColor: item.status === "Aberto" ? '#5cb85c' : "#999" }}>{item.status}</span>
                                            </td>
                                            <td data-label="Cadastrado">{item.createdFormated}</td>
                                            <td data-label="#">
                                                <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => loadItem(item)}>
                                                    <FiSearch color="#FFF" size={17} />
                                                </button>
                                                <button className="action" style={{ backgroundColor: '#F6a935' }}>
                                                    <FiEdit2 color="#FFF" size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {loadingMore && <h3 style={{ textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>}
                        {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button>}
                    </>
                )}

            </div>

            {showPostModal && (
                <Modal
                    conteudo={details}
                    close={loadItem}
                />
            )}

        </div>
    );
}

export default Dashboard;