import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth, ProtectedRoute } from "@/lib/auth";
import { workshopFormSchema, type WorkshopFormInput } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import {
  Code2,
  Laptop,
  User,
  Mail,
  Phone,
  Building,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle,
  LogOut,
  Home,
} from "lucide-react";

function WorkshopRegisterContent() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);

  const { data: registrations } = useQuery({
    queryKey: ["/api/user/registrations"],
  });

  const form = useForm<WorkshopFormInput>({
    resolver: zodResolver(workshopFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      college: user?.college || "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: WorkshopFormInput) => {
      const response = await apiRequest("POST", "/api/workshop/register", data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/registrations"] });
      setSuccess(true);
      toast({
        title: "Registration successful!",
        description: "You have been registered for the Python Workshop.",
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

  const onSubmit = (data: WorkshopFormInput) => {
    registerMutation.mutate(data);
  };

  // Already registered
  if (registrations?.workshop) {
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
                You are already registered for the Python Workshop.
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
                You have been registered for the Python Workshop. 
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

      <main className="max-w-lg mx-auto px-4 sm:px-6 py-8">
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
                <Laptop className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">Python Workshop</CardTitle>
                <CardDescription className="text-red-100">
                  Register for the hands-on learning experience
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    data-testid="input-name"
                    {...form.register("name")}
                  />
                </div>
                {form.formState.errors.name && (
                  <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@university.edu"
                    className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    data-testid="input-email"
                    {...form.register("email")}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-xs text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">Phone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    data-testid="input-phone"
                    {...form.register("phone")}
                  />
                </div>
                {form.formState.errors.phone && (
                  <p className="text-xs text-red-600">{form.formState.errors.phone.message}</p>
                )}
              </div>

              {/* College Field */}
              <div className="space-y-2">
                <Label htmlFor="college" className="text-gray-700">College/University *</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="college"
                    placeholder="Chandigarh University"
                    className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    data-testid="input-college"
                    {...form.register("college")}
                  />
                </div>
                {form.formState.errors.college && (
                  <p className="text-xs text-red-600">{form.formState.errors.college.message}</p>
                )}
              </div>

              {/* Submit Button */}
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
                    Register for Workshop
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

export default function WorkshopRegister() {
  return (
    <ProtectedRoute>
      <WorkshopRegisterContent />
    </ProtectedRoute>
  );
}