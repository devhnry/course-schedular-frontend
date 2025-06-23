"use client"
import {TimetableTable} from "../../timetable/Timetable.tsx"
import {useTimetable} from "../../../hooks/useTimetable.ts"
import PageHeader from "../common/PageHeader.tsx"
import {AlertCircle, Calendar, RefreshCw} from "lucide-react"
import Button from "../../shared/Button.tsx"

const TimetableView = () => {
  const { timetable, stats, isLoading, error, generateTimetable, clearTimetable } = useTimetable()

  return (
      <div className="p-6 space-y-6">
        <PageHeader
            title="Timetable Generator"
            description="Generate and view optimized course schedules for all departments"
            icon={Calendar}
            actions={
              <div className="flex gap-3">
                {timetable && (
                    <Button
                        text="Clear Timetable"
                        onClick={clearTimetable}
                        classname="border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50"
                    />
                )}
                <Button
                    text={isLoading ? "Generating..." : "Generate Timetable"}
                    onClick={generateTimetable}
                    disabled={isLoading}
                    classname={`bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${isLoading ? "opacity-50" : ""}`}
                />
              </div>
            }
        />

        {/* Generation Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Timetable Generation</h3>
              <p className="text-gray-600 text-sm mt-1">
                Generate optimized schedules based on course assignments and venue availability
              </p>
            </div>
            {isLoading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Processing...</span>
                </div>
            )}
          </div>

          {!timetable && !isLoading && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Timetable Generated</h3>
                <p className="text-gray-500 mb-4">Click the button above to generate a new timetable</p>
              </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Generation Failed</h3>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
        )}

        {/* Stats */}
        {stats && timetable && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Generation Statistics</h3>
                <Button
                    text="Export Timetable"
                    onClick={() => {
                      // TODO: Implement export functionality
                      console.log("Export timetable")
                    }}
                    classname="border border-gray-300 text-gray-700 px-3 py-1.5 text-sm rounded-md hover:bg-gray-50 flex items-center gap-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-800">{stats.totalAssignments}</div>
                  <div className="text-blue-600 text-sm">Total Assignments</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-800">{stats.successfulAssignments}</div>
                  <div className="text-green-600 text-sm">Successful</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-800">{stats.failedAssignments}</div>
                  <div className="text-red-600 text-sm">Failed</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-800">{stats.successRate}%</div>
                  <div className="text-purple-600 text-sm">Success Rate</div>
                </div>
              </div>
            </div>
        )}

        {/* Timetable Table */}
        {timetable && <TimetableTable timetable={timetable} />}
      </div>
  )
}

export default TimetableView
