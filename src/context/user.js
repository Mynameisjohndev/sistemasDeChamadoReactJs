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

    return (
        <UserContext.Provider value={{ signed: !!user, user, loading}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;