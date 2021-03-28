import './profile.css';
import { FiSettings } from 'react-icons/fi'
import Header from '../../components/Header';
import Title from '../../components/Title';

const Profile = () => {
    return (
        <div >
            <Header />
            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings size={24} color="#000"/>
                </Title>
            </div>
        </div>
    );
}

export default Profile;