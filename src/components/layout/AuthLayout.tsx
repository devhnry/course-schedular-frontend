import {FC, ReactNode} from 'react';
import Navbar from "../shared/Navbar.tsx";

interface AuthLayoutProps {
    classname?: string;
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({classname, children}) => {
    return (
        <div className={`${classname}`}>
            <Navbar loginButton={false} />
            {children}
        </div>
    );
};

export default AuthLayout;