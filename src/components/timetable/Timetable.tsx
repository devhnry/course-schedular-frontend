"use client"

import type React from "react"
import {useMemo} from "react"
import {Calendar, Clock, MapPin} from "lucide-react"
import type {TimetableEntry} from "../../hooks/useTimetable.ts"

interface TimetableTableProps {
    timetable: TimetableEntry[]
}

interface TimeSlotData {
    [day: string]: {
        [timeRange: string]: Array<{
            courseCode: string
            lecturers: Array<{ id: number; fullName: string }>
            venueName: string
        }>
    }
}

export const TimetableTable: React.FC<TimetableTableProps> = ({ timetable }) => {
    console.log("TimetableTable received:", timetable, "Type:", typeof timetable, "IsArray:", Array.isArray(timetable))

    const { organizedData, timeSlots, days } = useMemo(() => {
        if (!Array.isArray(timetable)) {
            console.error("Timetable is not an array:", timetable)
            return {
                organizedData: {},
                timeSlots: [],
                days: [],
            }
        }

        const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
        const timeSlotSet = new Set<string>()
        const daySchedules: TimeSlotData = {}

        daysOfWeek.forEach((day) => {
            daySchedules[day] = {}
        })

        timetable.forEach((entry) => {
            if (!entry) {
                console.warn("Skipping null/undefined entry")
                return
            }

            // Safely handle time range
            const startTime = entry.startTime?.substring(0, 5) || "00:00" // Remove seconds
            const endTime = entry.endTime?.substring(0, 5) || "00:00"
            const timeRange = `${startTime}-${endTime}`
            timeSlotSet.add(timeRange)

            const day = entry.day || "MONDAY"

            if (!daySchedules[day]) {
                daySchedules[day] = {}
            }
            if (!daySchedules[day][timeRange]) {
                daySchedules[day][timeRange] = []
            }

            const lecturers = entry.lecturers || []

            daySchedules[day][timeRange].push({
                courseCode: entry.courseCode || "Unknown Course",
                lecturers: lecturers,
                venueName: entry.venueName || "Unknown Venue",
            })
        })

        const sortedTimeSlots = Array.from(timeSlotSet).sort((a, b) => {
            const timeA = a.split("-")[0]
            const timeB = b.split("-")[0]
            return timeA.localeCompare(timeB)
        })

        const activeDays = daysOfWeek.filter((day) => Object.keys(daySchedules[day]).length > 0)

        return {
            organizedData: daySchedules,
            timeSlots: sortedTimeSlots,
            days: activeDays,
        }
    }, [timetable])

    if (!timetable || !Array.isArray(timetable) || timetable.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Schedule Data</h3>
                    <p className="text-gray-500">
                        {!Array.isArray(timetable) ? "Invalid timetable data format" : "No timetable entries found to display."}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Weekly Schedule
                </h3>
                <p className="text-sm text-gray-600 mt-1">Total Classes: {timetable.length}</p>
            </div>
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                        <tr className="bg-gray-50">
                            <th className="border border-gray-200 p-2 text-left font-medium min-w-[100px]">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Day
                                </div>
                            </th>
                            {timeSlots.map((timeSlot) => (
                                <th key={timeSlot} className="border border-gray-200 p-2 text-center font-medium min-w-[150px]">
                                    <div className="flex items-center justify-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {timeSlot}
                                    </div>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {days.map((day) => (
                            <tr key={day} className="hover:bg-gray-50">
                                <td className="border border-gray-200 p-2 font-medium text-sm bg-gray-50 min-w-[100px]">
                                    <div className="text-center font-semibold">{day.charAt(0) + day.slice(1).toLowerCase()}</div>
                                </td>
                                {timeSlots.map((timeSlot) => (
                                    <td key={`${day}-${timeSlot}`} className="border border-gray-200 p-1 min-w-[150px] align-top">
                                        <div className="space-y-1">
                                            {organizedData[day][timeSlot]?.map((entry, index) => (
                                                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-2 space-y-1">
                                                    {/* Course Code */}
                                                    <div className="font-semibold text-blue-900 text-xs">{entry.courseCode}</div>

                                                     {/*Venue*/}
                                                    <div className="flex items-center gap-1 text-gray-600 text-[10px]">
                                                        <MapPin className="h-3 w-3 flex-shrink-0" />
                                                        <span className="truncate">{entry.venueName}</span>
                                                    </div>


                                                    {/* Lecturers */}
                                                    {/*<div className="flex items-center gap-1 text-xs text-gray-600">*/}
                                                    {/*    <User className="h-3 w-3 flex-shrink-0" />*/}
                                                    {/*    <span className="truncate">*/}
                                                    {/*        {entry.lecturers && entry.lecturers.length > 0*/}
                                                    {/*            ? entry.lecturers*/}
                                                    {/*                .map((lecturer) => lecturer.fullName || "Unknown Lecturer")*/}
                                                    {/*                .join(", ")*/}
                                                    {/*            : "No lecturer assigned"}*/}
                                                    {/*    </span>*/}
                                                    {/*</div>*/}
                                                </div>
                                            )) || <div className="text-gray-400 text-sm text-center py-4">-</div>}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
