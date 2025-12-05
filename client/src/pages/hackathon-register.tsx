import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth, ProtectedRoute } from "@/lib/auth";
import { hackathonFormSchema, type HackathonFormInput } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import {
  Code2,
  Trophy,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Users,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Plus,
  Trash2,
  CheckCircle,
  LogOut,
  Home,
} from "lucide-react";

function HackathonRegisterContent() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);

  const { data: registrations } = useQuery({
    queryKey: ["/api/user/registrations"],
  });

  const form = useForm<HackathonFormInput>({
    resolver: zodResolver(hackathonFormSchema),
    defaultValues: {
      teamName: "",
      leaderName: user?.name || "",
      leaderEmail: user?.email || "",
      leaderPhone: user?.phone || "",
      leaderCollege: user?.college || "",
      leaderYear: user?.year || "",
      members: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  const registerMutation = useMutation({
    mutationFn: async (data: HackathonFormInput) => {
      const response = await apiRequest("POST", "/api/hackathon/register", data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/registrations"] });
      setSuccess(true);
      toast({
        title: "Registration successful!",
        description: "Your team has been registered for the hackathon.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "Could not register. Please try again.",
      });
    },
  });

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const onSubmit = (data: HackathonFormInput) => {
    registerMutation.mutate(data);
  };

  const addMember = () => {
    if (fields.length < 4) {
      append({ name: "", email: "", phone: "" });
    }
  };

  // Already registered
  if (registrations?.hackathon) {
    return (
      <div className="min-h-screen bg-gray-50">
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
        <main className="max-w-md mx-auto px-4 sm:px-6 py-8">
          <Card className="border border-gray-200 shadow-sm text-center">
            <CardContent className="pt-8 pb-8">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Already Registered!</h2>
              <p className="text-gray-600 mb-6">
                Your team <span className="font-medium text-red-600">{registrations.hackathon.teamName}</span> is already registered for the hackathon.
              </p>
              <Link href="/dashboard">
                <Button className="gap-2 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
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
          </div>
        </header>
        <main className="max-w-md mx-auto px-4 sm:px-6 py-8">
          <Card className="border border-gray-200 shadow-sm text-center">
            <CardContent className="pt-8 pb-8">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your team has been registered for Hackathon 2025. 
                A confirmation email has been sent to your email address.
              </p>
              <Link href="/dashboard">
                <Button className="gap-2 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white" data-testid="button-back-dashboard">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/dashboard">
            <span className="text-sm text-gray-600 hover:text-red-600 cursor-pointer inline-flex items-center gap-1" data-testid="link-back-dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </span>
          </Link>
        </div>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">Hackathon Registration</CardTitle>
                <CardDescription className="text-red-100">
                  Register your team for the 48-hour coding marathon
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Team Name */}
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-gray-700">Team Name *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="teamName"
                    placeholder="Enter your team name"
                    className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    data-testid="input-team-name"
                    {...form.register("teamName")}
                  />
                </div>
                {form.formState.errors.teamName && (
                  <p className="text-xs text-red-600">{form.formState.errors.teamName.message}</p>
                )}
              </div>

              <Separator className="bg-gray-200" />

              {/* Team Leader Section */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-red-600" />
                  Team Leader Details
                </h3>
                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="leaderName" className="text-gray-700">Full Name *</Label>
                      <Input
                        id="leaderName"
                        placeholder="John Doe"
                        className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                        data-testid="input-leader-name"
                        {...form.register("leaderName")}
                      />
                      {form.formState.errors.leaderName && (
                        <p className="text-xs text-red-600">{form.formState.errors.leaderName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leaderEmail" className="text-gray-700">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="leaderEmail"
                          type="email"
                          placeholder="john@university.edu"
                          className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          data-testid="input-leader-email"
                          {...form.register("leaderEmail")}
                        />
                      </div>
                      {form.formState.errors.leaderEmail && (
                        <p className="text-xs text-red-600">{form.formState.errors.leaderEmail.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="leaderPhone" className="text-gray-700">Phone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="leaderPhone"
                          placeholder="+91 98765 43210"
                          className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          data-testid="input-leader-phone"
                          {...form.register("leaderPhone")}
                        />
                      </div>
                      {form.formState.errors.leaderPhone && (
                        <p className="text-xs text-red-600">{form.formState.errors.leaderPhone.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leaderCollege" className="text-gray-700">College *</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="leaderCollege"
                          placeholder="Chandigarh University"
                          className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          data-testid="input-leader-college"
                          {...form.register("leaderCollege")}
                        />
                      </div>
                      {form.formState.errors.leaderCollege && (
                        <p className="text-xs text-red-600">{form.formState.errors.leaderCollege.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaderYear" className="text-gray-700">Year of Study *</Label>
                    <Select
                      value={form.watch("leaderYear") || ""}
                      onValueChange={(value) => form.setValue("leaderYear", value)}
                    >
                      <SelectTrigger 
                        className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                        data-testid="select-leader-year"
                      >
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-gray-400" />
                          <SelectValue placeholder="Select year" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="1st Year" className="focus:bg-red-50 focus:text-red-600">1st Year</SelectItem>
                        <SelectItem value="2nd Year" className="focus:bg-red-50 focus:text-red-600">2nd Year</SelectItem>
                        <SelectItem value="3rd Year" className="focus:bg-red-50 focus:text-red-600">3rd Year</SelectItem>
                        <SelectItem value="4th Year" className="focus:bg-red-50 focus:text-red-600">4th Year</SelectItem>
                        <SelectItem value="Graduate" className="focus:bg-red-50 focus:text-red-600">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.leaderYear && (
                      <p className="text-xs text-red-600">{form.formState.errors.leaderYear.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-200" />

              {/* Team Members Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Users className="h-4 w-4 text-red-600" />
                    Team Members ({fields.length}/4)
                  </h3>
                  {fields.length < 4 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addMember}
                      className="gap-1 border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                      data-testid="button-add-member"
                    >
                      <Plus className="h-4 w-4" />
                      Add Member
                    </Button>
                  )}
                </div>

                {fields.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-3">
                      No team members added yet
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addMember}
                      className="gap-1 border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                    >
                      <Plus className="h-4 w-4" />
                      Add Team Member
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <Card key={field.id} className="p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-800">Member {index + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            data-testid={`button-remove-member-${index}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid gap-3">
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs text-gray-700">Name *</Label>
                              <Input
                                placeholder="Member name"
                                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                                data-testid={`input-member-name-${index}`}
                                {...form.register(`members.${index}.name`)}
                              />
                              {form.formState.errors.members?.[index]?.name && (
                                <p className="text-xs text-red-600">
                                  {form.formState.errors.members[index]?.name?.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs text-gray-700">Email *</Label>
                              <Input
                                type="email"
                                placeholder="member@email.com"
                                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                                data-testid={`input-member-email-${index}`}
                                {...form.register(`members.${index}.email`)}
                              />
                              {form.formState.errors.members?.[index]?.email && (
                                <p className="text-xs text-red-600">
                                  {form.formState.errors.members[index]?.email?.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-gray-700">Phone *</Label>
                            <Input
                              placeholder="+91 98765 43210"
                              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                              data-testid={`input-member-phone-${index}`}
                              {...form.register(`members.${index}.phone`)}
                            />
                            {form.formState.errors.members?.[index]?.phone && (
                              <p className="text-xs text-red-600">
                                {form.formState.errors.members[index]?.phone?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full gap-2 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={registerMutation.isPending}
                data-testid="button-submit"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    Register Team
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function HackathonRegister() {
  return (
    <ProtectedRoute>
      <HackathonRegisterContent />
    </ProtectedRoute>
  );
}