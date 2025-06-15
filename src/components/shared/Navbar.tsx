import Container from "../layout/Container.tsx";
import Logo from "./Logo.tsx";
import Button from "./Button.tsx";

const Navbar = () => {
    return (
        <Container className={`shadow-md`}>
            <nav className={`py-4 flex items-center justify-between`}>
                <Logo />
                <Button text={'Login'} />
            </nav>
        </Container>
    );
};

export default Navbar;