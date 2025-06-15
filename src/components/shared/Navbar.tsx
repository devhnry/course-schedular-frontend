import Container from "../layout/Container.tsx";
import Logo from "./Logo.tsx";

const Navbar = () => {
    return (
        <Container className={`shadow-md`}>
            <nav className={`py-4 flex items-center justify-between`}>
                <Logo />
                <div>
                    <button className={`border-2 p-1.5 px-3 font-bold rounded-md text-[12px] cursor-pointer hover:scale-105 transition-all`}>Login</button>
                </div>
            </nav>
        </Container>
    );
};

export default Navbar;