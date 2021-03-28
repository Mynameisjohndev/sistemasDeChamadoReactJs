import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'

import avatar from '../../assets/avatar.png';
import './header.css';

const Header = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl == null ? avatar : user.avatarUrl} alt="Foto avatar" />
            </div>

            <Link to="/dashboard">
                <FiHome size={24} color="#fff"/>
                Chamados
            </Link>

            <Link to="/dashboard">
                <FiUser size={24} color="#fff"/>
                Clientes
            </Link>

            <Link to="/dashboard">
                <FiSettings size={24} color="#fff"/>
                Configurações
            </Link>

        </div>
    );
}

export default Header;