import {useRoutes} from 'react-router-dom';
import LandingPage from "../pages/LandingPage.tsx";

const AppRoutes = () => {
    return useRoutes([
        {path: '/', element: <LandingPage/>},
        { path: '*', element: <div>Not FOUND 404</div> }, // 404 fallback
    ]);
};

export default AppRoutes;
