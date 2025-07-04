import {ClockIcon} from "lucide-react";
import {useNavigate} from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/')} className={`flex gap-2 items-baseline font-medium cursor-pointer`}>
            <div className={`p-2 bg-black text-white shadow-md text-2xl font-bold rounded-xl relative`}>
                CU
                <div className={`absolute -bottom-[6px] -right-[4px] text-black bg-white rounded-full`}>
                    <ClockIcon className={`size-[20px]`} />
                </div>
            </div>
            <p className={`text-xl`}>TimetablePro</p>
        </div>
    );
};

export default Logo;
