import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth, ProtectedRoute } from "@/lib/auth";
import { updateProfileSchema, type UpdateProfileInput } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import {
  Code2,
  User,
  Phone,
  Building,
  GraduationCap,
  ArrowLeft,
  Loader2,
  LogOut,
  Save,
  Mail,
  Settings,
  Shield,
  Calendar,
  Award
} from "lucide-react";

function ProfileContent() {
  const [, setLocation] = useLocation();
  const { user, logout, updateUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      college: user?.college || "",
      year: user?.year || "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateProfileInput) => {
      const response = await apiRequest("PATCH", "/api/user/profile", data);
      return response;
    },
    onSuccess: (data: any) => {
      updateUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["/api/user/registrations"] });
      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "Could not update profile. Please try again.",
      });
    },
  });

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const onSubmit = (data: UpdateProfileInput) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-red-600">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{user?.name || "User"}</h3>
                  <p className="text-sm text-gray-600 mb-4">{user?.email}</p>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-red-600" />
                      <span className="text-gray-600">Member since 2025</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Award className="h-4 w-4 text-red-600" />
                      <span className="text-gray-600">2 Events Registered</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50">
                    <ArrowLeft className="h-4 w-4 mr-3" />
                    Back to Dashboard
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50">
                    <Calendar className="h-4 w-4 mr-3" />
                    Browse Events
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Full width on mobile, 3/4 on desktop */}
          <div className="lg:col-span-3">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Profile Settings</h1>
                  <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
                </div>
              </div>

              {/* Mobile Back Button */}
              <Link href="/dashboard" className="sm:hidden">
                <Button variant="outline" size="sm" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information Card */}
              <Card className="border border-gray-200 shadow-sm md:col-span-2">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                  <CardTitle className="text-white flex items-center gap-3">
                    <Settings className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-red-100">
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                          Full Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
                            {...form.register("name")}
                          />
                        </div>
                        {form.formState.errors.name && (
                          <p className="text-sm text-red-600">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={user?.email || ""}
                            disabled
                            className="pl-10 bg-gray-50 text-gray-600 border-gray-300 h-11"
                          />
                        </div>
                        <p className="text-xs text-gray-500">Email cannot be changed</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone Field */}
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
                            {...form.register("phone")}
                          />
                        </div>
                      </div>

                      {/* Year Field */}
                      <div className="space-y-3">
                        <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                          Year of Study
                        </Label>
                        <Select
                          value={form.watch("year") || ""}
                          onValueChange={(value) => form.setValue("year", value)}
                        >
                          <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500 h-11">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-gray-400" />
                              <SelectValue placeholder="Select year" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1st Year">1st Year</SelectItem>
                            <SelectItem value="2nd Year">2nd Year</SelectItem>
                            <SelectItem value="3rd Year">3rd Year</SelectItem>
                            <SelectItem value="4th Year">4th Year</SelectItem>
                            <SelectItem value="Graduate">Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* College Field */}
                    <div className="space-y-3">
                      <Label htmlFor="college" className="text-sm font-medium text-gray-700">
                        College/University
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="college"
                          type="text"
                          placeholder="Chandigarh University"
                          className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
                          {...form.register("college")}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                      <Button
                        type="submit"
                        className="sm:flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={updateMutation.isPending}
                      >
                        {updateMutation.isPending ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            Saving Changes...
                          </>
                        ) : (
                          <>
                            <Save className="h-5 w-5 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Link href="/dashboard">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 py-3"
                        >
                          Cancel
                        </Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Security Note */}
              <Card className="border border-gray-200 shadow-sm md:col-span-2">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Data is Secure</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        We use industry-standard encryption and security practices to protect your personal information. 
                        Your data is never shared with third parties without your explicit consent.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}