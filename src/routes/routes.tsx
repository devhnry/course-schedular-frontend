import {useRoutes} from 'react-router-dom';
import LandingPage from "../pages/LandingPage.tsx";
import NotFound from "../pages/NotFoundPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import VerifyOtpPage from "../pages/VerifyOtpPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import HODDashboardPage from "../pages/HODDashboardPage.tsx";
import DAPUDashboardPage from "../pages/DAPUDashboardPage.tsx";
import AcceptInvitePage from "../pages/AcceptInvitePage.tsx";

const AppRoutes = () => {
    return useRoutes([
        {path: '/', element: <LandingPage/>},
        {path: '/login', element: <LoginPage/>},
        {path: '/verify-otp', element: <VerifyOtpPage />},
        {path: '/accept-invite', element: <AcceptInvitePage />},
        {
            path: '/dashboard/hod',
            element: (
                <ProtectedRoute role="HOD">
                    <HODDashboardPage />
                </ProtectedRoute>
            ),
        },
        {
            path: '/dashboard/dapu',
            element: (
                <ProtectedRoute role="DAPU">
                    <DAPUDashboardPage />
                </ProtectedRoute>
            ),
        },

        { path: '*', element: <NotFound />}, // 404 fallback
    ]);
};

export default AppRoutes;
