import {FC, ReactNode} from 'react';
import Navbar from "../shared/Navbar.tsx";

interface DashboardLayoutProps {
    classname?: string;
    children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({classname, children}) => {
    return (
        <div className={`${classname}`}>
            <Navbar loginButton={false} />
            {children}
        </div>
    );
};

export default DashboardLayout;
