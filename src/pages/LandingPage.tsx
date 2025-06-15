import Navbar from "../components/shared/Navbar.tsx";
import {cardInfoContent} from "../data/features.ts"
import heroContent from "../data/hero.json";
import InfoCard from "../components/landing/InfoCard.tsx";
import TimetableGrid from "../components/landing/TimetableGrid.tsx";
import Container from "../components/layout/Container.tsx";

const LandingPage = () => {
    return (
        <main>
            <Navbar />
            <section className={`my-10`}>
                <Container>
                    <section className={`flex flex-col lg:flex-row gap-10 xl:gap-16 items-center mx-auto w-full max-w-[1200px]`}>
                        <div className={`flex flex-col gap-3 pb-6 max-w-[600px] w-full`}>
                            <h1 className={`hero-title pb-2 leading-[100%] lg:leading-[110%]`}>{heroContent.title}</h1>
                            <div className={`grid gap-8`}>
                                <p className={`text-black/85 max-w-[490px] text-[18px]`}>{heroContent.description}</p>
                                <div className={` w-fit grid grid-cols-2 gap-5`}>
                                    <button className={`border-[1px] py-2 px-3 font-medium text-black rounded-md text-[18px] cursor-pointer hover:scale-[101%] transition-all`}>Generate Timetable</button>
                                    <button className={`border-[1px] py-2 px-1.5 font-medium bg-black text-white rounded-md text-[18px] cursor-pointer hover:scale-[101%] hover:bg-black/90 transition-all`}>Login</button>
                                </div>
                                <div className={`mx-2 flex gap-3 items-center`}>
                                    <div className={`flex`}>
                                        {['CU','HD','DP'].map((item,index) => (
                                            <div className={`border-white border bg-[#CCD0D7] rounded-full p-0.5 text-[12px] -mx-1 relative z-${index*10}`} key={item}>{item}</div>
                                        ))}
                                    </div>
                                    <p className={`text-[14px] text-black tracking-tight`}>{heroContent.caption}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`hidden 2lg:block`}>
                            <TimetableGrid />
                        </div>
                    </section>

                    <section>
                        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center mx-auto w-fit my-10 [&>*]:h-full`}>
                            {cardInfoContent.map((info, index) => {
                                return <InfoCard key={info.title} {...info}
                                                 classname={`${index == 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}/>
                            })}
                        </div>
                    </section>
                </Container>
            </section>
        </main>
    );
};
export default LandingPage;