import * as React from 'react';
import {LucideIcon} from "lucide-react";

type InfoCardProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    classname?: string
}

const InfoCard: React.FC<InfoCardProps> = ({icon: Icon, title, description, classname}) => {
    return (
        <div className={`bg-[#F8F9FA] shadow-md text-black max-w-[320px] lg:max-w-[380px] rounded-lg flex flex-col gap-2 p-4 ${classname} 
        hover:scale-[102%] hover:-translate-y-[5px] transition-all cursor-pointer`}>
            <div className={`bg-black p-2 rounded-sm w-fit text-[18px] lg:text-[20px] text-white`}>
                {<Icon />}
            </div>
            <h3 className={`font-bold lg:text-[18px]`}>{title}</h3>
            <p className={`text-black/80 font-light`}>{description}</p>
        </div>
    );
};

export default InfoCard;