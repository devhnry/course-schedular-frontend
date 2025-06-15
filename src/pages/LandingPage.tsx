import Navbar from "../components/shared/Navbar.tsx";
import {cardInfoContent} from "../data/features.ts"
import heroContent from "../data/hero.json";
import InfoCard from '../components/landing/InfoCard';
import TimetableGrid from "../components/landing/TimetableGrid";
import Container from "../components/layout/Container.tsx";
import Button from "../components/shared/Button.tsx";
import Caption from "../components/landing/Caption.tsx";

const LandingPage = () => {
    return (
        <main>
            <Navbar />
            <section className={`my-10`}>
                <Container>
                    <section className={`flex flex-col lg:flex-row gap-10 xl:gap-16 items-center mx-auto w-full max-w-[1200px]`}>
                        <div className={`flex flex-col gap-3 pb-6 max-w-[600px] w-full`}>
                            <h1 className={`hero-title`}>{heroContent.title}</h1>
                            <div className={`grid gap-8`}>
                                <p className={`text-black/85 max-w-[490px] text-[18px]`}>{heroContent.description}</p>
                                <div className={`w-fit grid grid-cols-2 gap-5`}>
                                    {['Generate Timetable', 'Login'].map((text, i) => (
                                        <Button
                                            key={text}
                                            text={text}
                                            to={'/login'}
                                            classname={`py-2 px-3 hover:scale-[101%] text-[18px] 
                                                ${i === 1 && 'bg-black text-white hover:bg-black/90 px-1.5'}`} />
                                    ))}
                                </div>
                                <Caption />
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