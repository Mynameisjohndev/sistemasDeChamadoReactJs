import { useContext } from 'react';
import { UserContext } from '../../context/user';

import './title.css';

const Title = ({ children, name }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="title">
            {children}
            <span>{name}</span>
            
        </div>
    );
}

export default Title;