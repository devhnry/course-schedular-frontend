import Button from "../../shared/Button.tsx";
import {ArchiveIcon} from "lucide-react";
import {useHodDashboard} from "../../../store/useHodDashboard.ts";

const DashboardHodOverview = () => {
    const overviewTabs = [
        {
            title: "Total Courses",
            number: 0
        },
        {
            title: "Total Lecturers",
            number: 0
        }
    ];
    const quickActions = ["Add Course", "Add Lecturer", "Add CourseAssignment"];


    const { setSelectedIndex } = useHodDashboard();
    const actionHandlers = [
        () => setSelectedIndex(1), // Invite New Hod → ManageHods
        () => setSelectedIndex(2), // Generate Timetable → Timetables
        () => setSelectedIndex(3), // Generate Timetable → Timetables
    ];


    return (
        <main className={`dashboard-overview mt-6 grid gap-6`}>
            <div className={`w-full bg-white border-[0.2px] border-black/20 shadow-md rounded-md h-[200px] p-4`}>
                <h2 className={`text-lg font-bold mb-4`}>Overview</h2>
                <div className={`grid grid-cols-3 gap-2`}>
                    {
                        overviewTabs.map((tab, index) => (
                            <div key={index} className={`bg-gray-100/50 shadow-sm w-full h-[110px] rounded-md p-3`}>
                                <p className={`font-bold mb-2`}>{tab.title}</p>
                                <p className={`text-3xl font-bold`}>{tab.number}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={`w-full bg-white border-[0.2px] border-black/20 shadow-md rounded-md h-[140px] p-4`}>
                <h2 className={`text-lg font-bold mb-3`}>Quick Actions</h2>
                <div className={`grid grid-cols-3 gap-2`}>
                    {
                        quickActions.map((action, index) => (
                            <Button
                                key={index}
                                classname={`bg-black text-white font-bold text-[18px] p-4`}
                                text={action}
                                onClick={actionHandlers[index]} // ✅ Wire up
                            />
                        ))
                    }
                </div>
            </div>

            <div className={`w-full bg-white border-[0.2px] border-black/20 shadow-md rounded-md h-[270px] p-4`}>
                <h2 className={`text-lg font-bold`}>Recent Activities</h2>
                <div className={`grid place-items-center gap-2 font-bold text-3xl mt-16`}>
                    <ArchiveIcon size={50} />
                    <p>Page Coming Soon</p>
                </div>
            </div>
        </main>
    );
};

export default DashboardHodOverview;
