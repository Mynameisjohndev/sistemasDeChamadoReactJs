import { useState, useContext } from 'react'
import { FiSettings, FiUpload } from 'react-icons/fi'

import { UserContext } from '../../context/user'
import './profile.css';

import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    return (
        <div >
            <Header />
            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings size={24} color="#000" />
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="white" size={24} />
                            </span>
                            <input type="file" accept="image/*" /><br />
                            {avatarUrl === null ? (
                                <img width="250" height="250" alt="foto-do-usuario" src={avatar} />
                            ) : (
                                <img width="250" height="250" alt="foto-do-usuario" src={avatarUrl} />
                            )}
                        </label>

                        <label>Nome</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <label>Email</label>
                        <input type="text" value={email} disabled={true}></input>
                        <button type="submit">Salvar</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Profile;