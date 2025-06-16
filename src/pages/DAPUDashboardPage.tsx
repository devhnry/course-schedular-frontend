import {FC, JSX, useState} from "react";
import {Building2, CalendarIcon, Landmark, LayoutDashboardIcon, MapPinned, SettingsIcon, UsersIcon} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Container from "../components/shared/Container";

// Page Components
import DashboardOverview from "../components/dashboard/dapu/DashboardOverview.tsx";
import ManageHods from "../components/dashboard/dapu/ManageHods.tsx"
import Timetables from "../components/dashboard/dapu/TimetableView.tsx";
import ManageVenues from "../components/dashboard/dapu/ManageVenue.tsx";
import Departments from "../components/dashboard/dapu/DepartmentView.tsx";
import CollegeBuildings from "../components/dashboard/dapu/CollegeBuildingView.tsx";
import Settings from "../components/dashboard/dapu/Settings.tsx";

interface Page {
    icon: JSX.Element;
    title: string;
    Component?: FC;      // React Function Component
}

const DapuDashboardPage = () => {

    const pages: Page[] = [
        { icon: <LayoutDashboardIcon size={20} />, title: "Dashboard", Component: DashboardOverview },
        { icon: <UsersIcon size={20} />,             title: "Manage HODs",   Component: ManageHods },
        { icon: <CalendarIcon size={20} />,          title: "Timetables", Component: Timetables},
        { icon: <MapPinned size={20} />,             title: "Manage Venues",  Component: ManageVenues},
        { icon: <Landmark size={20} />,              title: "Departments", Component: Departments },
        { icon: <Building2 size={20} />,             title: "College Buildings", Component: CollegeBuildings },
        { icon: <SettingsIcon size={20} />,          title: "Settings",  Component: Settings },
    ];

    const [selectedIndex, setSelectedIndex] = useState(0);
    const SelectedPage = pages[selectedIndex].Component as FC;

    return (
        <DashboardLayout>
            <Container className="grid grid-cols-[minmax(200px,250px)_1fr] gap-8 h-[calc(100vh-80px)] overflow-hidden">
                {/* Sidebar */}
                <section className="border-black/10 shadow-md border p-4 my-4 rounded-md sticky top-4 overflow-auto">
                    <nav className="flex flex-col gap-2">
                        {pages.map((page, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedIndex(i)}
                                className={`flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-md transition cursor-pointer ${
                                    selectedIndex === i
                                        ? "bg-black text-white"
                                        : "text-gray-800 hover:bg-gray-100"
                                }`}
                            >
                                {page.icon}
                                {page.title}
                            </button>
                        ))}
                    </nav>
                </section>

                {/* Main Content */}
                <section className="overflow-y-auto h-full pr-2">
                    <SelectedPage />
                </section>
            </Container>
        </DashboardLayout>
    );
};

export default DapuDashboardPage;
