import {FC} from 'react';

interface ButtonProps {
    text: string;
    classname?: string;
}

const Button: FC<ButtonProps> = ({text, classname='p-1.5 px-3 hover:scale-[105%]'}) => {
    return (
            <button className={`border-[1px] ${classname} font-medium rounded-md text-[12px] cursor-pointer transition-all`}>
                {text}
            </button>
    );
};

export default Button;