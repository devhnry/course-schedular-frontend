import {FC, ReactNode} from "react";

type ContainerProps = {
    children: ReactNode;
    className?: string;
};

const Container: FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={`w-full max-w-[1440px] px-4 sm:px-6 lg:px-14 mx-auto ${className}`}>
            {children}
        </div>
    );
};

export default Container;
