import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth, ProtectedRoute } from "@/lib/auth";
import {
  User,
  Trophy,
  Laptop,
  Calendar,
  Users,
  GraduationCap,
  ArrowRight,
  LogOut,
  CheckCircle,
  Clock,
  Settings,
  BookOpen,
  Award,
  Code2,
  BarChart3,
  FileText
} from "lucide-react";

function DashboardContent() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const { data: registrations, isLoading } = useQuery({
    queryKey: ["/api/user/registrations"],
  });

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const hackathonRegistered = registrations?.hackathon;
  const workshopRegistered = registrations?.workshop;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-red-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="h-10 w-10 rounded-lg bg-red-600 flex items-center justify-center">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-gray-800 block">Coding Club</span>
                <span className="text-sm text-red-600 font-medium block">Chandigarh University</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-red-600">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Welcome Section */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">{user?.email}</p>
        </div>

        {/* Quick Stats - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-red-600 flex items-center justify-center">
                  <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Hackathon</p>
                  {isLoading ? (
                    <Skeleton className="h-4 w-16 mt-1" />
                  ) : hackathonRegistered ? (
                    <Badge className="bg-green-100 text-green-600 border-green-200 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Registered
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Register
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-red-600 flex items-center justify-center">
                  <Laptop className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Workshop</p>
                  {isLoading ? (
                    <Skeleton className="h-4 w-16 mt-1" />
                  ) : workshopRegistered ? (
                    <Badge className="bg-green-100 text-green-600 border-green-200 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Registered
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Register
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-red-600 flex items-center justify-center">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Events</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-red-600 flex items-center justify-center">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Profile</p>
                  <Link href="/profile">
                    <span className="text-sm text-red-600 hover:text-red-700 cursor-pointer font-medium">
                      View Profile
                    </span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Events Section - Takes 2/3 on desktop */}
          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Featured Events</h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Hackathon Card */}
              <Card className="border border-red-200 shadow-sm overflow-hidden">
                <div className="bg-red-600 text-white p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/20 flex items-center justify-center">
                      <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {hackathonRegistered && (
                      <Badge className="bg-white text-red-600 border-0 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Registered
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1">Hackathon 2025</h3>
                  <p className="text-red-100 text-sm">
                    48-hour coding competition
                  </p>
                </div>
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-red-600" />
                      <span>March 15-17, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-red-600" />
                      <span>Team Event (2-5 members)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-red-600" />
                      <span>₹50,000 Prize Pool</span>
                    </div>
                  </div>

                  {hackathonRegistered ? (
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-2">Your Registration</p>
                      <div className="space-y-1 text-xs">
                        <p><span className="font-medium">Team:</span> {hackathonRegistered.teamName}</p>
                        <p><span className="font-medium">Members:</span> {(hackathonRegistered.members?.length || 0) + 1}</p>
                      </div>
                    </div>
                  ) : (
                    <Link href="/hackathon/register">
                      <br></br><Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm">
                        Register Team
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              {/* Workshop Card */}
              <Card className="border border-red-200 shadow-sm overflow-hidden">
                <div className="bg-red-600 text-white p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/20 flex items-center justify-center">
                      <Laptop className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {workshopRegistered && (
                      <Badge className="bg-white text-red-600 border-0 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Registered
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1">Python Workshop</h3>
                  <p className="text-red-100 text-sm">
                    Hands-on coding experience
                  </p>
                </div>
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-red-600" />
                      <span>April 5-6, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-red-600" />
                      <span>Beginner Friendly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-red-600" />
                      <span>Certificate Provided</span>
                    </div>
                  </div>

                  {workshopRegistered ? (
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-2">Your Registration</p>
                      <div className="space-y-1 text-xs">
                        <p><span className="font-medium">Name:</span> {workshopRegistered.name}</p>
                        <p><span className="font-medium">College:</span> {workshopRegistered.college}</p>
                      </div>
                    </div>
                  ) : (
                    <Link href="/workshop/register">
                     <br></br><Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm">
                        Register Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Takes 1/3 on desktop */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border border-red-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/events">
                  <Button variant="outline" className="w-full justify-start border-red-200 text-gray-700 hover:bg-red-50 hover:text-red-600">
                    <Calendar className="h-4 w-4 mr-3" />
                    All Events
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start border-red-200 text-gray-700 hover:bg-red-50 hover:text-red-600">
                    <User className="h-4 w-4 mr-3" />
                    My Profile
                  </Button>
                </Link>
                <Link href="/certificates">
                  <Button variant="outline" className="w-full justify-start border-red-200 text-gray-700 hover:bg-red-50 hover:text-red-600">
                    <FileText className="h-4 w-4 mr-3" />
                    Certificates
                  </Button>
                </Link>
                <Link href="/results">
                  <Button variant="outline" className="w-full justify-start border-red-200 text-gray-700 hover:bg-red-50 hover:text-red-600">
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Results
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border border-red-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Profile Updated</p>
                    <p className="text-gray-500 text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Event Registered</p>
                    <p className="text-gray-500 text-xs">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}