import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { signupSchema, type SignupInput } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { ArrowRight, Loader2, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupInput) => {
      const response = await apiRequest("POST", "/api/auth/signup", data);
      return response;
    },
    onSuccess: (data: any) => {
      login(data.user, data.token);
      toast({
        title: "Account created!",
        description: "Welcome to TechFest 2025!",
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "Could not create account. Please try again.",
      });
    },
  });

  const onSubmit = (data: SignupInput) => {
    signupMutation.mutate(data);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/assets/images/bg-image.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Single Mobile Layout for Both Desktop and Mobile */}
      <div className="w-full max-w-md relative z-10">
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
                <User className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">CLUB REGISTRATION</h2>
              </div>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Full Name"
                className="bg-black/50 border-white/30 text-white placeholder-white/60 h-12 text-base rounded-xl border-2 focus:border-white focus:ring-white"
                data-testid="input-name"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-red-300 text-sm" data-testid="error-name">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-black/50 border-white/30 text-white placeholder-white/60 h-12 text-base rounded-xl border-2 focus:border-white focus:ring-white"
                data-testid="input-email"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-red-300 text-sm" data-testid="error-email">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-black/50 border-white/30 text-white placeholder-white/60 h-12 text-base rounded-xl border-2 focus:border-white focus:ring-white pr-12"
                  data-testid="input-password"
                  {...form.register("password")}
                />
                
                {/* Eye Button for Password Visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-all duration-300 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-testid="toggle-password"
                >
                  <div className="relative w-6 h-6">
                    <EyeOff 
                      className={`absolute transition-all duration-300 ${
                        showPassword 
                          ? 'opacity-0 scale-0 rotate-12' 
                          : 'opacity-100 scale-100 rotate-0'
                      }`}
                      size={20}
                    />
                    <Eye 
                      className={`absolute transition-all duration-300 ${
                        showPassword 
                          ? 'opacity-100 scale-100 rotate-0' 
                          : 'opacity-0 scale-0 -rotate-12'
                      }`}
                      size={20}
                    />
                  </div>
                </button>
              </div>
              
              {form.formState.errors.password && (
                <p className="text-red-300 text-sm" data-testid="error-password">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="bg-black/50 border-white/30 text-white placeholder-white/60 h-12 text-base rounded-xl border-2 focus:border-white focus:ring-white pr-12"
                  data-testid="input-confirm-password"
                  {...form.register("confirmPassword")}
                />
                
                {/* Eye Button for Confirm Password Visibility */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-all duration-300 focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  data-testid="toggle-confirm-password"
                >
                  <div className="relative w-6 h-6">
                    <EyeOff 
                      className={`absolute transition-all duration-300 ${
                        showConfirmPassword 
                          ? 'opacity-0 scale-0 rotate-12' 
                          : 'opacity-100 scale-100 rotate-0'
                      }`}
                      size={20}
                    />
                    <Eye 
                      className={`absolute transition-all duration-300 ${
                        showConfirmPassword 
                          ? 'opacity-100 scale-100 rotate-0' 
                          : 'opacity-0 scale-0 -rotate-12'
                      }`}
                      size={20}
                    />
                  </div>
                </button>
              </div>
              
              {form.formState.errors.confirmPassword && (
                <p className="text-red-300 text-sm" data-testid="error-confirm-password">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-red-600 text-white hover:bg-red-700 font-bold text-base rounded-xl"
              disabled={signupMutation.isPending}
              data-testid="button-submit"
            >
              {signupMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  CREATING ACCOUNT...
                </>
              ) : (
                "CREATE ACCOUNT"
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
                data-testid="link-login"
              >
                CLICK HERE FOR LOGIN
              </span>
            </Link>
          </div>

          <div className="text-center mt-4">
            <Link href="/admin/login">
              <span className="text-white/80 hover:text-white cursor-pointer text-xs" data-testid="link-admin-login">
                Admin Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}