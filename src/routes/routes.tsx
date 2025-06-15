import {useRoutes} from 'react-router-dom';
import LandingPage from "../pages/LandingPage.tsx";
import NotFound from "../pages/NotFoundPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import VerifyOtpPage from "../pages/VerifyOtpPage.tsx";

const AppRoutes = () => {
    return useRoutes([
        {path: '/', element: <LandingPage/>},
        {path: '/login', element: <LoginPage/>},
        {path: '/verify-otp', element: <VerifyOtpPage />},
        { path: '*', element: <NotFound />}, // 404 fallback
    ]);
};

export default AppRoutes;
