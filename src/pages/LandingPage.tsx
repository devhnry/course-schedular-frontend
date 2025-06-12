import Navbar from "../components/shared/Navbar.tsx";
import {cardInfoContent} from "../data/features.ts"
import heroContent from "../data/hero.json";
import InfoCard from "../components/landing/InfoCard.tsx";
import TimetableGrid from "../components/landing/TimetableGrid.tsx";

const LandingPage = () => {
    return (
        <main>
            <Navbar />

            <section className={`my-10 px-6`}>
                <section>
                    <div className={`flex flex-col gap-2.5 pb-6`}>
                        <h1 className={`hero-title pb-2`}>{heroContent.title}</h1>
                        <p className={`text-black/85`}>{heroContent.description}</p>
                        <div className={`mx-2 flex gap-3 items-center`}>
                            <div className={`flex`}>
                                {['CU','HD','DP'].map((item,index) => (
                                    <div className={`border-white border bg-[#CCD0D7] rounded-full p-0.5 text-[10px] -mx-1 relative z-${index*10}`} key={item}>{item}</div>
                                ))}
                            </div>
                            <p className={`text-[11px] text-black font-medium tracking-tight`}>{heroContent.caption}</p>
                        </div>
                    </div>
                    <div>
                        <TimetableGrid />
                    </div>
                </section>

                <section>
                    <div className={`grid items-center gap-8 mx-auto w-fit my-10`}>
                        {cardInfoContent.map(info => {
                            return <InfoCard key={info.title} {...info}/>
                        })}
                    </div>
                </section>
            </section>
        </main>
    );
};
export default LandingPage;