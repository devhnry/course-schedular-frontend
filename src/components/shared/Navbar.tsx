import Container from "../layout/Container.tsx";
import Logo from "./Logo.tsx";
import Button from "./Button.tsx";
import {FC} from "react";

interface NavbarProps {
    loginButton?: boolean;
}

const Navbar: FC<NavbarProps> = ({loginButton = true }) => {
    return (
        <Container className={`shadow-md`}>
            <nav className={`py-4 flex items-center justify-between`}>
                <Logo />
                {loginButton && <Button to={'login'} text={'Login'} />}
            </nav>
        </Container>
    );
};

export default Navbar;