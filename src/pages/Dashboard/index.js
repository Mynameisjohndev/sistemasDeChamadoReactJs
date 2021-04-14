import { useState, useContext } from 'react';
import { FiMessageSquare, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/user'
import Header from '../../components/Header';
import Title from '../../components/Title';

import './dashboard.css'

const Dashboard = () => {
  const { signout } = useContext(UserContext)
  const [chamados, setChamados] = useState([]);
  return (
    <div>
    <Header/>

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
      )  : (
        <>
          <Link to="/new" className="new">
            <FiPlus size={25} color="#FFF" />
            Novo chamado
          </Link>
        </>
      )}

    </div>

  </div>
  );
}

export default Dashboard;