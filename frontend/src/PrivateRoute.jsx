import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    console.log(userInfo)
    return userInfo ? <Outlet /> : <Navigate to='/sign-in' replace />;
}

export default PrivateRoute