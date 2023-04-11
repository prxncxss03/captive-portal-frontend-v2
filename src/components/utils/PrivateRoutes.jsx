import {Outlet, Navigate} from 'react-router-dom';

export const PrivateRoutes = ({children}) => {
    const token = localStorage.getItem('token');
    if(token){
        return <Outlet />
    }else{
        return <Navigate to="/auth/login" />
    }
}