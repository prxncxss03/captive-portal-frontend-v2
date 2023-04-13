import {Outlet, Navigate} from 'react-router-dom';

export const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    console.log('token in private routes', token);
    if(token){
        return <Outlet />
    }else{
        return <Navigate to="/auth/login" />
    }
}