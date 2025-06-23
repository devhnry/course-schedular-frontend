"use client"

import {useState} from "react"
import apiClient from "../api/clients/apiClient"

export interface TimetableEntry {
    courseCode: string
    lecturers: Array<{
        id: number
        fullName: string
        department: {
            id: number
            name: string
            code: string
            collegeBuilding: {
                id: number
                name: string
                code: string
                college: {
                    id: number
                    name: string
                    code: string
                }
            }
        }
    }>
    venueName: string
    day: string
    startTime: string
    endTime: string
}

export interface TimetableStats {
    totalAssignments: number
    successfulAssignments: number
    failedAssignments: number
    successRate: number
    unassignedCourses: string[]
}

export const useTimetable = () => {
    const [timetable, setTimetable] = useState<TimetableEntry[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [stats, setStats] = useState<TimetableStats | null>(null)

    const generateTimetable = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await apiClient.get("/test/scheduler/run")
            console.log("Raw API Response:", response.data)

            // Handle the specific API response structure
            let data: TimetableEntry[] = []

            if (response.data.days && Array.isArray(response.data.days)) {
                data = response.data.days
            } else if (Array.isArray(response.data)) {
                data = response.data
            } else if (response.data.data && Array.isArray(response.data.data)) {
                data = response.data.data
            } else {
                console.error("Unexpected response structure:", response.data)
                throw new Error("Invalid response format from server")
            }

            console.log("Processed timetable data:", data)

            if (!Array.isArray(data)) {
                throw new Error("Timetable data is not an array")
            }

            setTimetable(data)

            // Calculate stats
            const totalAssignments = data.length
            const successfulAssignments = totalAssignments
            const failedAssignments = 0
            const successRate = totalAssignments > 0 ? 100 : 0

            setStats({
                totalAssignments,
                successfulAssignments,
                failedAssignments,
                successRate,
                unassignedCourses: [],
            })
        } catch (err: any) {
            const errorMessage = err?.response?.data?.statusMessage || err?.message || "Failed to generate timetable"
            setError(errorMessage)
            console.error("Timetable generation error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const clearTimetable = () => {
        setTimetable(null)
        setStats(null)
        setError(null)
    }

    return {
        timetable,
        stats,
        isLoading,
        error,
        generateTimetable,
        clearTimetable,
    }
}
