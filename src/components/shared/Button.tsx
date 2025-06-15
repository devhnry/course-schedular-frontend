import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

interface ButtonProps {
    text: string;
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
    classname?: string;
    to?: string;
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ text, type, classname = 'p-1.5 px-3 hover:scale-[105%]', to, onClick }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (to) { navigate(to);
        } else if (onClick) { onClick();}
    };

    return (
        <button type={type} className={`border-[1px] ${classname} font-medium rounded-md text-[12px] cursor-pointer transition-all`}
            onClick={handleClick} >
            {text}
        </button>
    );
};

export default Button;