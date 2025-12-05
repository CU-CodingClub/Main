import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { forgotPasswordSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Code2, Mail, ArrowLeft, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const { toast } = useToast();
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetMutation = useMutation({
    mutationFn: async (data: ForgotPasswordInput) => {
      const response = await apiRequest("POST", "/api/auth/forgot-password", data);
      return response;
    },
    onSuccess: () => {
      setEmailSent(true);
      toast({
        title: "Email sent!",
        description: "Check your inbox for password reset instructions.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Request failed",
        description: error.message || "Could not send reset email. Please try again.",
      });
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    resetMutation.mutate(data);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="w-full border-b">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <Code2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg">TechFest 2025</span>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8 pb-8">
              <div className="h-16 w-16 rounded-full bg-chart-2/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-chart-2" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
              <p className="text-muted-foreground mb-6">
                We've sent password reset instructions to your email address. 
                Please check your inbox and follow the link to reset your password.
              </p>
              <Link href="/login">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">TechFest 2025</span>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Forgot Password?</CardTitle>
            <CardDescription>
              Enter your email and we'll send you reset instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@university.edu"
                    className="pl-10"
                    data-testid="input-email"
                    {...form.register("email")}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive" data-testid="error-email">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={resetMutation.isPending}
                data-testid="button-submit"
              >
                {resetMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer inline-flex items-center gap-1" data-testid="link-back-login">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
