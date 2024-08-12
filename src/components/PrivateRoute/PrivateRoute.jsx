import React from 'react';
import { Navigate } from 'react-router-dom';
import { LOGIN } from '../../Routes/Routes';
import { isTokenValid } from '../../Util/Util';


const PrivateRoute = ({ element }) => {
    return isTokenValid() ? element : <Navigate to={LOGIN} replace />
};


export default PrivateRoute;
