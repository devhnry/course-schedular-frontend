import {Navigate} from 'react-router-dom';
import {useAuthStore} from '../store/useAuthStore';
import {JSX} from "react";

const ProtectedRoute = ({ children, role }: { children: JSX.Element; role?: string }) => {
    const { token, role: userRole } = useAuthStore();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role && userRole !== role) {
        return <Navigate to="/not-found" replace />;
    }

    return children;
};

export default ProtectedRoute;
