import Button from "../../shared/Button.tsx";
import {CalendarClock, Sparkles} from "lucide-react";
import toast from "react-hot-toast";

const TimetableView = () => {
    const handleGenerate = () => {

        // Replace this with your actual logic (API call or mutation)
        toast.success("Still Coming...");
    };

    return (
        <section className="p-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 max-w-4xl mx-auto">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-full bg-black text-white">
                        <CalendarClock size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Timetable Generator</h2>
                        <p className="text-gray-600 text-sm">
                            Generate optimized course timetables across all departments, ensuring constraints like venue availability,
                            lecturer clashes, and course priorities are satisfied. <br />
                            Once generated, the timetable will be available for viewing and export.
                        </p>
                    </div>
                </div>

                <div className="border-t pt-6 flex gap-2 items-center ">
                    <Sparkles size={18} />
                    <Button
                        text="Generate Timetable"
                        classname="bg-black hover:bg-gray-900 text-white px-6 py-3 text-base font-semibold rounded-md flex items-center gap-2"
                        onClick={handleGenerate}
                    >
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default TimetableView;
