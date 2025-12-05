import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAdminAuth, AdminProtectedRoute } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Code2,
  Trophy,
  Laptop,
  Users,
  Download,
  Search,
  Trash2,
  LogOut,
  Shield,
  Eye,
  User,
  Mail,
  Phone,
  Building,
  Home,
  ArrowLeft,
  Calendar,
  Award,
  Settings,
  UserCheck
} from "lucide-react";
import type { HackathonRegistrationWithMembers, WorkshopRegistration } from "@shared/schema";

function AdminDashboardContent() {
  const [, setLocation] = useLocation();
  const { admin, logout } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [hackathonSearch, setHackathonSearch] = useState("");
  const [workshopSearch, setWorkshopSearch] = useState("");
  const [workshopCollegeFilter, setWorkshopCollegeFilter] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState<HackathonRegistrationWithMembers | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ type: "hackathon" | "workshop"; id: string } | null>(null);

  // Fetch stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  // Fetch hackathon registrations
  const { data: hackathonRegistrations, isLoading: hackathonLoading } = useQuery<HackathonRegistrationWithMembers[]>({
    queryKey: ["/api/admin/hackathon"],
  });

  // Fetch workshop registrations
  const { data: workshopRegistrations, isLoading: workshopLoading } = useQuery<WorkshopRegistration[]>({
    queryKey: ["/api/admin/workshop"],
  });

  // Delete mutations
  const deleteHackathonMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/hackathon/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hackathon"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "Team deleted successfully" });
      setDeleteDialog(null);
    },
    onError: (error: any) => {
      toast({ variant: "destructive", title: "Failed to delete", description: error.message });
    },
  });

  const deleteWorkshopMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/workshop/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/workshop"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "Registration deleted successfully" });
      setDeleteDialog(null);
    },
    onError: (error: any) => {
      toast({ variant: "destructive", title: "Failed to delete", description: error.message });
    },
  });

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
  };

  const handleExportCSV = async (type: "hackathon" | "workshop" | "users") => {
    try {
      const response = await fetch(`/api/admin/export/${type}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_data.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({ title: `${type.charAt(0).toUpperCase() + type.slice(1)} data exported successfully` });
    } catch (error) {
      console.error('Export error:', error);
      toast({ 
        variant: "destructive", 
        title: "Export failed", 
        description: "Failed to download data. Please try again." 
      });
    }
  };

  // Filter hackathon registrations
  const filteredHackathon = hackathonRegistrations?.filter((team) =>
    team.teamName.toLowerCase().includes(hackathonSearch.toLowerCase()) ||
    team.leaderName.toLowerCase().includes(hackathonSearch.toLowerCase()) ||
    team.leaderEmail.toLowerCase().includes(hackathonSearch.toLowerCase()) ||
    team.leaderCollege.toLowerCase().includes(hackathonSearch.toLowerCase())
  ) || [];

  // Get unique colleges for filter
  const uniqueColleges = [...new Set(workshopRegistrations?.map((r) => r.college) || [])];

  // Filter workshop registrations
  const filteredWorkshop = workshopRegistrations?.filter((reg) => {
    const matchesSearch =
      reg.name.toLowerCase().includes(workshopSearch.toLowerCase()) ||
      reg.email.toLowerCase().includes(workshopSearch.toLowerCase()) ||
      reg.college.toLowerCase().includes(workshopSearch.toLowerCase());
    const matchesCollege = workshopCollegeFilter === "all" || reg.college === workshopCollegeFilter;
    return matchesSearch && matchesCollege;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
                  <Code2 className="h-5 w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-xl text-gray-800 block">Coding Club</span>
                  <span className="text-sm text-red-600 font-medium block">Chandigarh University</span>
                </div>
              </div>
            </Link>
            <Badge className="gap-1 bg-red-600 text-white border-0">
              <Shield className="h-3 w-3" />
              Admin Panel
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:inline" data-testid="text-admin-email">
              {admin?.email}
            </span>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout} 
              data-testid="button-logout"
              className="text-gray-600 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800" data-testid="text-title">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage event registrations and participants</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="gap-2 bg-red-600 text-white hover:bg-red-700 border-0 shadow-sm"
              onClick={() => handleExportCSV("users")}
              data-testid="button-export-users"
            >
              <UserCheck className="h-4 w-4" />
              Export All Users
            </Button>
            <Link href="/">
              <Button variant="outline" className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hackathon Teams</p>
                  {statsLoading ? (
                    <Skeleton className="h-8 w-16 bg-gray-200" />
                  ) : (
                    <p className="text-3xl font-bold text-gray-800" data-testid="text-hackathon-count">
                      {stats?.totalHackathonTeams || 0}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                  <Laptop className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Workshop Participants</p>
                  {statsLoading ? (
                    <Skeleton className="h-8 w-16 bg-gray-200" />
                  ) : (
                    <p className="text-3xl font-bold text-gray-800" data-testid="text-workshop-count">
                      {stats?.totalWorkshopParticipants || 0}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  {statsLoading ? (
                    <Skeleton className="h-8 w-16 bg-gray-200" />
                  ) : (
                    <p className="text-3xl font-bold text-gray-800" data-testid="text-users-count">
                      {stats?.totalUsers || 0}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="hackathon" className="space-y-4">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger 
              value="hackathon" 
              className="gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-700"
              data-testid="tab-hackathon"
            >
              <Trophy className="h-4 w-4" />
              Hackathon
            </TabsTrigger>
            <TabsTrigger 
              value="workshop" 
              className="gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-700"
              data-testid="tab-workshop"
            >
              <Laptop className="h-4 w-4" />
              Workshop
            </TabsTrigger>
          </TabsList>

          {/* Hackathon Tab */}
          <TabsContent value="hackathon">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Hackathon Registrations
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search teams..."
                        className="pl-10 w-full sm:w-64 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        value={hackathonSearch}
                        onChange={(e) => setHackathonSearch(e.target.value)}
                        data-testid="input-hackathon-search"
                      />
                    </div>
                    <Button
                      className="gap-2 bg-white text-red-600 hover:bg-gray-50 border-0 shadow-sm"
                      onClick={() => handleExportCSV("hackathon")}
                      data-testid="button-export-hackathon"
                    >
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {hackathonLoading ? (
                  <div className="p-6 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full bg-gray-200" />
                    ))}
                  </div>
                ) : filteredHackathon.length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">No hackathon registrations yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                          <TableHead className="text-gray-900 font-semibold">Team Name</TableHead>
                          <TableHead className="text-gray-900 font-semibold">Team Leader</TableHead>
                          <TableHead className="text-gray-900 font-semibold">College</TableHead>
                          <TableHead className="text-gray-900 font-semibold">Members</TableHead>
                          <TableHead className="text-right text-gray-900 font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHackathon.map((team) => (
                          <TableRow key={team.id} className="border-gray-200 hover:bg-gray-50" data-testid={`row-hackathon-${team.id}`}>
                            <TableCell className="font-medium text-gray-900">{team.teamName}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">{team.leaderName}</p>
                                <p className="text-xs text-gray-600">{team.leaderEmail}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-700">{team.leaderCollege}</TableCell>
                            <TableCell>
                              <Badge className="bg-red-600 text-white border-0">
                                {(team.members?.length || 0) + 1} members
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setSelectedTeam(team)}
                                  className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                                  data-testid={`button-view-${team.id}`}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => setDeleteDialog({ type: "hackathon", id: team.id })}
                                  data-testid={`button-delete-${team.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workshop Tab */}
          <TabsContent value="workshop">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Laptop className="h-5 w-5" />
                    Workshop Registrations
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search participants..."
                        className="pl-10 w-full sm:w-64 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        value={workshopSearch}
                        onChange={(e) => setWorkshopSearch(e.target.value)}
                        data-testid="input-workshop-search"
                      />
                    </div>
                    <Select value={workshopCollegeFilter} onValueChange={setWorkshopCollegeFilter}>
                      <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500" data-testid="select-college-filter">
                        <SelectValue placeholder="Filter by college" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 text-gray-900">
                        <SelectItem value="all" className="focus:bg-red-50 focus:text-red-600">All Colleges</SelectItem>
                        {uniqueColleges.map((college) => (
                          <SelectItem key={college} value={college} className="focus:bg-red-50 focus:text-red-600">
                            {college}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      className="gap-2 bg-white text-red-600 hover:bg-gray-50 border-0 shadow-sm"
                      onClick={() => handleExportCSV("workshop")}
                      data-testid="button-export-workshop"
                    >
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {workshopLoading ? (
                  <div className="p-6 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full bg-gray-200" />
                    ))}
                  </div>
                ) : filteredWorkshop.length === 0 ? (
                  <div className="text-center py-12">
                    <Laptop className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">No workshop registrations yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                          <TableHead className="text-gray-900 font-semibold">Name</TableHead>
                          <TableHead className="text-gray-900 font-semibold">Email</TableHead>
                          <TableHead className="text-gray-900 font-semibold">Phone</TableHead>
                          <TableHead className="text-gray-900 font-semibold">College</TableHead>
                          <TableHead className="text-right text-gray-900 font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredWorkshop.map((reg) => (
                          <TableRow key={reg.id} className="border-gray-200 hover:bg-gray-50" data-testid={`row-workshop-${reg.id}`}>
                            <TableCell className="font-medium text-gray-900">{reg.name}</TableCell>
                            <TableCell className="text-gray-700">{reg.email}</TableCell>
                            <TableCell className="text-gray-700">{reg.phone}</TableCell>
                            <TableCell className="text-gray-700">{reg.college}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => setDeleteDialog({ type: "workshop", id: reg.id })}
                                data-testid={`button-delete-workshop-${reg.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Team Details Dialog */}
      <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent className="max-w-lg bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800">
              <Trophy className="h-5 w-5 text-red-600" />
              {selectedTeam?.teamName}
            </DialogTitle>
            <DialogDescription className="text-gray-600">Team details and members</DialogDescription>
          </DialogHeader>

          {selectedTeam && (
            <div className="space-y-6">
              {/* Team Leader */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-800">
                  <User className="h-4 w-4 text-red-600" />
                  Team Leader
                </h4>
                <Card className="p-4 bg-gray-50 border border-gray-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{selectedTeam.leaderName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{selectedTeam.leaderEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{selectedTeam.leaderPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span>{selectedTeam.leaderCollege} - {selectedTeam.leaderYear}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Team Members */}
              {selectedTeam.members && selectedTeam.members.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-800">
                    <Users className="h-4 w-4 text-red-600" />
                    Team Members ({selectedTeam.members.length})
                  </h4>
                  <ScrollArea className="max-h-48">
                    <div className="space-y-2">
                      {selectedTeam.members.map((member, index) => (
                        <Card key={member.id} className="p-3 bg-gray-50 border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-sm font-medium text-white">
                              {index + 1}
                            </div>
                            <div className="space-y-1 text-sm">
                              <p className="font-medium text-gray-800">{member.name}</p>
                              <p className="text-gray-600">{member.email}</p>
                              <p className="text-gray-600">{member.phone}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSelectedTeam(null)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent className="bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-800">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete this {deleteDialog?.type === "hackathon" ? "team registration" : "workshop registration"}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialog(null)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700 border-0"
              onClick={() => {
                if (deleteDialog?.type === "hackathon") {
                  deleteHackathonMutation.mutate(deleteDialog.id);
                } else if (deleteDialog?.type === "workshop") {
                  deleteWorkshopMutation.mutate(deleteDialog.id);
                }
              }}
              disabled={deleteHackathonMutation.isPending || deleteWorkshopMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteHackathonMutation.isPending || deleteWorkshopMutation.isPending
                ? "Deleting..."
                : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminProtectedRoute>
      <AdminDashboardContent />
    </AdminProtectedRoute>
  );
}