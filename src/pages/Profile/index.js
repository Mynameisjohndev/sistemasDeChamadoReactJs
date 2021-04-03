import { useState, useContext } from 'react'
import { FiSettings, FiUpload } from 'react-icons/fi'
import { toast } from 'react-toastify'

import { UserContext } from '../../context/user'
import './profile.css';

import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';

import Firebase from '../../services/firebaseConection';

const Profile = () => {
    const { user, signout, setUser, storageUser } = useContext(UserContext);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [novoAvatarUrl, setNovoAvatarUrl] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (novoAvatarUrl === null && name !== "") {
            await Firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    name: name
                })
                .then(() => {
                    let data = {
                        ...user,
                        name: name
                    };
                    setUser(data);
                    storageUser(data);
                    toast.success("Nome editado com sucesso!");
                })
                .catch(()=>{
                    toast.error("Erro ao editar nome!");
                })
        } else if (novoAvatarUrl !== null && name !== "") {
            handleUpload()
        }

    }

    
    const handleUpload = () =>{

    }
    
    const handleFile = (event) =>{
        if(event.target.files[0]){
            const image = event.target.files[0]
            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setNovoAvatarUrl(image);
                setAvatarUrl(URL.createObjectURL(event.target.files[0]))
            }
        }else{
            alert("Envie imagens apenas jpeg ou png");
            setNovoAvatarUrl(null);
            return null;
        }
    }


    return (
        <div >
            <Header />
            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings size={24} color="#000" />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="white" size={24} />
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br />
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
                <div className="container">
                    <button className="logout-btn">
                        SAIR
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;