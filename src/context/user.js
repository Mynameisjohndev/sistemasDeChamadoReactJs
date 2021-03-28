import { createContext, useState, useEffect } from 'react';
import Firebase from '../services/firebaseConection';

export const UserContext = createContext({});

function UserProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStorage = () => {
            const storageUser = localStorage.getItem("sistemaUser");
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, [])

    async function signup(email, password, name) {
        setLoadingAuth(true);
        await Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await Firebase.firestore().collection('users')
                    .doc(uid).set({
                        name: name,
                        avatarUrl: null
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email,
                            avatarUrl: null
                        }
                        setUser(data)
                        storageUser(data)
                        setLoadingAuth(false);
                    })
            })
            .catch((error) => {
                console.log("Error");
                setLoadingAuth(false);
            })
    }

    const storageUser = (data) => {
        localStorage.setItem("sistemaUser", JSON.stringify(data))
    }

    const signout = async () => {
        await Firebase.auth().signOut();
        localStorage.removeItem('sistemaUser');
        setUser(null);
    }

    const signin = async (email, password) => {      
        setLoadingAuth(true);
        await Firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                const userProfile = await Firebase.firestore().collection('users')
                    .doc(uid).get()
                let data = {
                    uid: uid,
                    name: userProfile.data().name,
                    email: value.user.email,
                    avatarUrl: userProfile.data().avatarUrl,
                }
                setUser(data)
                storageUser(data)
                setLoadingAuth(false);
            })
            .catch((error) => {
                console.log(error)
                setLoadingAuth(false);
            })
    }

    return (
        <UserContext.Provider value={{
            signed: !!user,
            user,
            loading,
            loadingAuth,
            signup,
            signout,
            signin
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;