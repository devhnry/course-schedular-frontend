import {Settings} from 'lucide-react';

const times = ['8:00', '10:00', '12:00'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const timetableData = [
    { day: 'Mon', time: '8:00', course: 'CSC 401', venue: 'LT 1', color: 'bg-blue-100' },
    { day: 'Wed', time: '8:00', course: 'CSC 405', venue: 'LT 3', color: 'bg-green-100' },
    { day: 'Fri', time: '8:00', course: 'CSC 409', venue: 'LT 2', color: 'bg-purple-100' },
    { day: 'Tue', time: '10:00', course: 'CSC 403', venue: 'LT 5', color: 'bg-yellow-100' },
    { day: 'Thu', time: '10:00', course: 'CSC 407', venue: 'LT 4', color: 'bg-red-100' },
    { day: 'Mon', time: '12:00', course: 'CSC 411', venue: 'LT 2', color: 'bg-orange-100' },
    { day: 'Wed', time: '12:00', course: 'CSC 413', venue: 'LT 1', color: 'bg-pink-100' },
    { day: 'Fri', time: '12:00', course: 'CSC 415', venue: 'LT 3', color: 'bg-green-100' },
];

const TimetableGrid = () => {
    return (
        <div className="max-w-[465px] mx-auto rounded-xl hover:scale-105 xl:scale-105 xl:hover:scale-[107%] transition-all">
            <div className="bg-white rounded-xl shadow-lg p-2">
                <div className="flex justify-between items-center mb-2 lg:py-2">
                    <h2 className="text-md font-semibold lg:text-lg">Department Timetable</h2>
                    <Settings className="w-5 h-5 text-gray-500" />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-center border-separate border-spacing-1 lg:border-spacing-1.5">
                        <thead>
                            <tr>
                                <th className="w-12 lg:w-[60px] p-2 rounded-xs bg-[#F8F9FA]"></th>
                                {days.map((day) => (
                                    <th key={day} className="font-semibold bg-[#F8F9FA] p-1.5 py-2 rounded-xs">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                        {times.map((time) => (
                            <tr key={time}>
                                <td className="font-medium bg-[#F8F9FA] p-0.5">{time}</td>
                                {days.map((day) => {
                                    const slot = timetableData.find(
                                        (entry) => entry.day === day && entry.time === time
                                    );
                                    return (
                                        <td
                                            key={`${day}-${time}`}
                                            className={`border border-black/10 px-1 text-left align-top  ${slot ? slot.color : ''}`}
                                        >
                                            {slot && (
                                                <div className={`p-0.5 py-1.5`}>
                                                    <div className="font-semibold text-xs">{slot.course}</div>
                                                    <div className="text-xs text-gray-600/50">{slot.venue}</div>
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4 text-xs text-gray-500 lg:p-2">
                    <span>Last updated: Today, 10:45 AM</span>
                    <button className="text-white bg-black hover:bg-gray-800 rounded-md p-1">Export</button>
                </div>
            </div>
        </div>
    );
};

export default TimetableGrid;
