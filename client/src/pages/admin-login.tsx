import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAdminAuth } from "@/lib/auth";
import { loginSchema, type LoginInput } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Code2, Mail, Lock, ArrowRight, Loader2, Shield } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAdminAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await apiRequest("POST", "/api/admin/login", data);
      return response;
    },
    onSuccess: (data: any) => {
      login(data.admin, data.token);
      toast({
        title: "Welcome, Admin!",
        description: "You have successfully logged in.",
      });
      // Use setTimeout to ensure state is updated before navigation
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 100);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials.",
      });
    },
  });

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data);
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: "url('/assets/images/CUCodingClubBgBanner.jpeg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-black/70 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img 
                  src="/assets/images/culogo.png" 
                  alt="University Logo" 
                  className="h-12 w-12 object-contain bg-white rounded-lg p-1"
                />
                <div className="text-white">
                  <h1 className="text-lg font-bold">Chandigarh University</h1>
                  <p className="text-white/80 text-sm">Unnao Campus</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-3 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">ADMIN LOGIN</h2>
                </div>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@techfest.edu"
                    className="pl-10 bg-black/50 border-white/30 text-white placeholder-white/60 h-12 text-base rounded-xl border-2 focus:border-white focus:ring-white"
                    data-testid="input-email"
                    {...form.register("email")}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-red-300 text-sm" data-testid="error-email">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    className="pl-10 bg-black/50 border-white/30 text-white placeholder-white/60 h-12 text-base rounded-xl border-2 focus:border-white focus:ring-white"
                    data-testid="input-password"
                    {...form.register("password")}
                  />
                </div>
                {form.formState.errors.password && (
                  <p className="text-red-300 text-sm" data-testid="error-password">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-red-600 text-white hover:bg-red-700 font-bold text-base rounded-xl"
                disabled={loginMutation.isPending}
                data-testid="button-submit"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    SIGNING IN...
                  </>
                ) : (
                  "SIGN IN"
                )}
              </Button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-white/30"></div>
              <span className="px-3 text-white text-sm font-medium">OR</span>
              <div className="flex-1 border-t border-white/30"></div>
            </div>

            <div className="text-center">
              <Link href="/login">
                <span 
                  className="inline-block w-full bg-white text-black hover:bg-gray-200 font-bold text-sm py-2 rounded-xl cursor-pointer"
                  data-testid="link-user-login"
                >
                  CLICK HERE FOR USER LOGIN
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}