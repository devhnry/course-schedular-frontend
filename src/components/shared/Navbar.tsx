const Navbar = () => {
    return (
        <nav className={`px-6 py-4 shadow-md flex items-center justify-between`}>
            <div className={`flex gap-1 items-baseline font-medium`}>
                <p className={`p-2 bg-black text-white text-2xl font-bold rounded-xl`}>CU</p>
                <p className={`text-xl`}>Timetable</p>
            </div>
            <div>
                <button className={`border-2 p-1.5 px-4 font-bold rounded-md text-[14px] cursor-pointer hover:scale-105 transition-all`}>Login</button>
            </div>
        </nav>
    );
};

export default Navbar;