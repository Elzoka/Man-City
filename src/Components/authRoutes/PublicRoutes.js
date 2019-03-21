import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PublicRoutes = ({
    user,
    component: Comp,
    restricted = false,
    ...rest,
}) => {
    return (
        <Route {...rest} component={(props) => (
            restricted && user ? 
                <Redirect to="/dashboard" />
                :
                <Comp {...props} user={user} />
                
        )} />
    );
};

export default PublicRoutes;