import heroContent from "../../data/hero.json";

const Caption = () => {
    return (
        <div className={`mx-2 flex gap-3 items-center`}>
            <div className={`flex`}>
                {['CU','HD','DP'].map((item,index) => (
                    <div className={`border-white border bg-[#CCD0D7] rounded-full p-0.5 text-[12px] -mx-1 relative z-${index*10}`} key={item}>{item}</div>
                ))}
            </div>
            <p className={`text-[14px] text-black tracking-tight`}>{heroContent.caption}</p>
        </div>
    );
};

export default Caption;