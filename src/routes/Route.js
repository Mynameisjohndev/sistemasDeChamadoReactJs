import { Redirect, Route } from 'react-router-dom';
import {useContext} from 'react'

import { UserContext } from '../context/user'

const RouteWrapper  = ({
    component: Component,
    isPrivate,
    ...rest
})  => {

    const { signed, loading } = useContext(UserContext)

    if(loading){
        return(
            <div>
            </div>
        )
    }

    if(!signed && isPrivate){
        return <Redirect to="/"/>
    }

    if(signed && !isPrivate){
        return <Redirect to="/dashboard"/>
    }

    return (
        <Route
            {...rest}
            render={ props => (
                <Component {...props} />
            )}
        />
    )
}

export default RouteWrapper;