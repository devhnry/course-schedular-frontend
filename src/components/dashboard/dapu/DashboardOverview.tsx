import {useDapuDashboard} from "../../../store/useDapuDashboard.ts"
import {useDepartments} from "../../../hooks/useDepartments.ts"
import {useEffect} from "react"
import {useHods} from "../../../hooks/useHods.ts"
import {useVenues} from "../../../hooks/useVenue.ts"
import {usePrograms} from "../../../hooks/useProgram.ts"
import {useCollegeBuildings} from "../../../hooks/useCollegeBuilding.ts"
import StatsCard from "../common/StatsCard.tsx"
import QuickActionCard from "../common/QuickActionCard.tsx"
import { Book, Building2, Calendar, Landmark, MapPin, UserCheck, Users } from "lucide-react"

const DashboardOverview = () => {
  const { refetch, departments } = useDepartments()
  const { data, refresh: refreshHod } = useHods()
  const { venues } = useVenues()
  const { programs } = usePrograms()
  const { buildings } = useCollegeBuildings()
  const { setSelectedIndex } = useDapuDashboard()

  useEffect(() => {
    refetch().catch((err) => console.error(err))
    refreshHod().catch((err) => console.error(err))
  }, [])

  // Calculate stats
  // const totalHods = data?.content.length || 0
  const activeHods = data?.content.filter((hod) => hod.status === "ACCEPTED").length || 0
  const pendingHods = data?.content.filter((hod) => hod.status === "PENDING").length || 0
  const availableVenues = venues?.filter((venue) => venue.available).length || 0

  const stats = [
    {
      title: "Total Departments",
      value: departments?.length || 0,
      icon: Landmark,
      color: "blue" as const,
      subtitle: "University departments",
    },
    {
      title: "Active HODs",
      value: activeHods,
      icon: UserCheck,
      color: "green" as const,
      subtitle: `${pendingHods} pending invitations`,
    },
    {
      title: "Available Venues",
      value: availableVenues,
      icon: MapPin,
      color: "purple" as const,
      subtitle: `${venues?.length || 0} total venues`,
    },
    {
      title: "Academic Programs",
      value: programs?.length || 0,
      icon: Book,
      color: "orange" as const,
      subtitle: "Across all departments",
    },
    {
      title: "College Buildings",
      value: buildings?.length || 0,
      icon: Building2,
      color: "blue" as const,
      subtitle: "Campus infrastructure",
    },
    {
      title: "Total Venues",
      value: venues?.length || 0,
      icon: MapPin,
      color: "green" as const,
      subtitle: "Lecture halls & rooms",
    },
  ]

  const quickActions = [
    {
      title: "Invite New HOD",
      description: "Send invitation to department heads",
      icon: Users,
      color: "blue" as const,
      onClick: () => setSelectedIndex(1),
    },
    {
      title: "Add Department",
      description: "Create a new university department",
      icon: Landmark,
      color: "green" as const,
      onClick: () => setSelectedIndex(4),
    },
    {
      title: "Add Venue",
      description: "Register new lecture halls or rooms",
      icon: MapPin,
      color: "purple" as const,
      onClick: () => setSelectedIndex(3),
    },
    {
      title: "Generate Timetable",
      description: "Create optimized course schedules",
      icon: Calendar,
      color: "orange" as const,
      onClick: () => setSelectedIndex(2),
    },
  ]

  return (
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your timetable system.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                  <QuickActionCard key={index} {...action} />
              ))}
            </div>
          </div>

          {/* System Status */}
          {/*<div className="bg-white rounded-lg border border-gray-200 p-6">*/}
          {/*  <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>*/}
          {/*  <div className="space-y-4">*/}
          {/*    <div className="flex items-center justify-between">*/}
          {/*      <div className="flex items-center gap-3">*/}
          {/*        <div className="w-3 h-3 bg-green-500 rounded-full"></div>*/}
          {/*        <span className="text-sm text-gray-700">HOD Management</span>*/}
          {/*      </div>*/}
          {/*      <span className="text-sm text-green-600 font-medium">Operational</span>*/}
          {/*    </div>*/}
          {/*    <div className="flex items-center justify-between">*/}
          {/*      <div className="flex items-center gap-3">*/}
          {/*        <div className="w-3 h-3 bg-green-500 rounded-full"></div>*/}
          {/*        <span className="text-sm text-gray-700">Venue Management</span>*/}
          {/*      </div>*/}
          {/*      <span className="text-sm text-green-600 font-medium">Operational</span>*/}
          {/*    </div>*/}
          {/*    <div className="flex items-center justify-between">*/}
          {/*      <div className="flex items-center gap-3">*/}
          {/*        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>*/}
          {/*        <span className="text-sm text-gray-700">Timetable Generation</span>*/}
          {/*      </div>*/}
          {/*      <span className="text-sm text-yellow-600 font-medium">In Development</span>*/}
          {/*    </div>*/}
          {/*    {pendingHods > 0 && (*/}
          {/*        <div className="flex items-center justify-between">*/}
          {/*          <div className="flex items-center gap-3">*/}
          {/*            <AlertTriangle className="w-3 h-3 text-orange-500" />*/}
          {/*            <span className="text-sm text-gray-700">Pending HOD Invitations</span>*/}
          {/*          </div>*/}
          {/*          <span className="text-sm text-orange-600 font-medium">{pendingHods}</span>*/}
          {/*        </div>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        {/* Recent Activities Placeholder */}
        {/*<div className="bg-white rounded-lg border border-gray-200 p-6">*/}
        {/*  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>*/}
        {/*  <div className="text-center py-8">*/}
        {/*    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />*/}
        {/*    <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>*/}
        {/*    <p className="text-gray-500">Activity tracking will be available in a future update.</p>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
  )
}

export default DashboardOverview
