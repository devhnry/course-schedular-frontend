import * as React from 'react';
import {LucideIcon} from "lucide-react";

type InfoCardProps = {
    icon: LucideIcon;
    title: string;
    description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({icon: Icon, title, description}) => {
    return (
        <div className={`bg-[#F8F9FA] shadow-md text-black w-[320px] rounded-lg flex flex-col gap-2 p-4`}>
            <div className={`bg-black p-2 rounded-sm w-fit text-[18px] text-white`}>
                {<Icon />}
            </div>
            <h3 className={`font-bold`}>{title}</h3>
            <p className={`text-black/80 font-light`}>{description}</p>
        </div>
    );
};

export default InfoCard;