import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import {FC, useState} from "react";
import {useAuthStore} from "../../store/useAuthStore";
import {LogOut, Settings, User2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useLogin} from "../../hooks/useLogin.ts";
import toast from "react-hot-toast";

interface NavbarProps {
    loginButton?: boolean;
}

const Navbar: FC<NavbarProps> = ({ loginButton = true }) => {
    const { token, role, authEmail, logout, fullName } = useAuthStore();
    const { logout: logoutRequest, error } = useLogin()
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setShowMenu(!showMenu);
    const onSubmit = async () => {
        const result = await logoutRequest();
        if (result === "success") {
            logout();
            navigate("/login");
        }else{
            toast.error(error || 'Logout Failed')
        }
    }


    return (
        <Container className="shadow-md">
            <nav className="py-4 flex items-center justify-between relative">
                <Logo />

                {token && role ? (
                    <div className="relative">
                        <div onClick={toggleMenu}
                            className="cursor-pointer flex items-end gap-2 text-md font-medium"
                        >
                            {role.toUpperCase()} {role.toUpperCase() === "DAPU" && 'Admin'}
                            <div className={`bg-white rounded-full p-2.5 shadow-md border-[0.7px]`}><User2 className="size-5" /></div>
                        </div>

                        {showMenu && (
                            <div className="absolute right-0 mt-3 bg-white shadow-md border-[0.7px] border-black/20 rounded-md w-50 z-50 p-3">
                                <div className="border-b border-black/20 text-sm text-gray-600 pb-2">
                                    <p className={`pb-2`}>{fullName || 'Prof. John Doe'}</p>
                                    {authEmail}
                                </div>
                                <div
                                    className="p-2 mt-2 hover:bg-gray-100 rounded-md flex items-center gap-2 cursor-pointer text-sm"
                                    onClick={() => navigate("settings")}
                                >
                                    <Settings className="size-4" /> Settings
                                </div>
                                <div
                                    className="p-2 hover:bg-gray-100 rounded-md flex items-center gap-2 cursor-pointer text-sm text-red-600"
                                    onClick={onSubmit}>
                                    <LogOut className="size-4" /> Logout
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    loginButton && <Button to={"login"} text={"Login"} />
                )}
            </nav>
        </Container>
    );
};

export default Navbar;
