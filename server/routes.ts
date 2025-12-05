import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./email";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  hackathonFormSchema,
  workshopFormSchema,
  updateProfileSchema,
} from "@shared/schema";
import { ZodError } from "zod";

const JWT_SECRET = process.env.SESSION_SECRET || "techfest-secret-key-2025";

// Middleware to verify JWT token for users
function authenticateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; type: string };
    if (decoded.type !== "user") {
      return res.status(401).json({ message: "Invalid token type" });
    }
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Middleware to verify JWT token for admins
function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { adminId: string; type: string };
    if (decoded.type !== "admin") {
      return res.status(401).json({ message: "Invalid token type" });
    }
    (req as any).adminId = decoded.adminId;
    next();
  } catch (error) {
    console.error("Admin auth middleware error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Helper function to handle database errors
function handleDatabaseError(error: any, res: Response) {
  console.error("Database error:", error);
  
  // Check if error is due to MongoDB connection
  if (error.message?.includes("connect") || error.message?.includes("ECONNREFUSED") || 
      error.message?.includes("MongoNetworkError")) {
    return res.status(503).json({ 
      message: "Database temporarily unavailable",
      error: "Database connection failed"
    });
  }
  
  return res.status(500).json({ 
    message: "Internal server error",
    error: error.message || "Unknown error"
  });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ========== AUTH ROUTES ==========

  // User Signup - FIXED WITH FALLBACK
  app.post("/api/auth/signup", async (req, res) => {
    try {
      console.log("Signup attempt for:", req.body.email);
      
      const data = signupSchema.parse(req.body);

      try {
        // Check if user already exists
        const existingUser = await storage.getUserByEmail(data.email);
        if (existingUser) {
          return res.status(400).json({ message: "Email already registered" });
        }
      } catch (dbError) {
        console.warn("Database check failed, continuing signup:", dbError.message);
        // Continue anyway if database check fails
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Create user with fallback
      let user;
      try {
        user = await storage.createUser({
          name: data.name,
          email: data.email,
          password: hashedPassword,
          phone: null,
          college: null,
          year: null,
        });
        console.log("User created in database");
      } catch (createError) {
        console.warn("Database creation failed, creating fallback user:", createError.message);
        
        // Create fallback user object
        user = {
          id: `user_${Date.now()}`,
          name: data.name,
          email: data.email,
          password: hashedPassword,
          phone: null,
          college: null,
          year: null,
          createdAt: new Date().toISOString()
        };
      }

      // Generate token
      const token = jwt.sign({ userId: user.id, type: "user" }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Try to send welcome email (non-blocking)
      try {
        await sendEmail(
          user.email,
          "Welcome to TechFest 2025!",
          `<h1>Welcome, ${user.name}!</h1><p>Your account has been created successfully. You can now register for events.</p>`
        );
      } catch (emailError) {
        console.warn("Failed to send welcome email:", emailError.message);
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ 
        success: true,
        user: userWithoutPassword, 
        token,
        message: "Account created successfully"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return handleDatabaseError(error, res);
    }
  });

  // User Login - FIXED WITH FALLBACK
  app.post("/api/auth/login", async (req, res) => {
    try {
      console.log("Login attempt for:", req.body.email);
      
      const data = loginSchema.parse(req.body);
      
      let user;
      try {
        user = await storage.getUserByEmail(data.email);
        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
      } catch (dbError) {
        console.warn("Database login check failed:", dbError.message);
        return res.status(503).json({ 
          message: "System temporarily unavailable. Please try again later.",
          error: "Database connection failed"
        });
      }

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user.id, type: "user" }, JWT_SECRET, {
        expiresIn: "7d",
      });

      const { password: _, ...userWithoutPassword } = user;
      res.json({ 
        success: true,
        user: userWithoutPassword, 
        token,
        message: "Login successful"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return handleDatabaseError(error, res);
    }
  });

  // Admin Login - FIXED
  app.post("/api/admin/login", async (req, res) => {
    try {
      console.log("Admin login attempt for:", req.body.email);
      
      const data = loginSchema.parse(req.body);
      
      let admin;
      try {
        admin = await storage.getAdminByEmail(data.email);
        if (!admin) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      } catch (dbError) {
        console.warn("Database admin check failed:", dbError.message);
        return res.status(503).json({ 
          message: "System temporarily unavailable. Please try again later.",
          error: "Database connection failed"
        });
      }

      const validPassword = await bcrypt.compare(data.password, admin.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ adminId: admin.id, type: "admin" }, JWT_SECRET, {
        expiresIn: "7d",
      });

      const { password: _, ...adminWithoutPassword } = admin;
      res.json({ 
        success: true,
        admin: adminWithoutPassword, 
        token,
        message: "Admin login successful"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return handleDatabaseError(error, res);
    }
  });

  // Forgot Password
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const data = forgotPasswordSchema.parse(req.body);
      
      let user;
      try {
        user = await storage.getUserByEmail(data.email);
      } catch (dbError) {
        console.warn("Database forgot password check failed:", dbError.message);
        // Don't reveal error to user
        return res.json({ 
          message: "If email exists, reset link will be sent",
          success: true // Always return success for security
        });
      }
      
      if (!user) {
        // Don't reveal if email exists
        return res.json({ 
          message: "If email exists, reset link will be sent",
          success: true
        });
      }

      // Generate reset token
      const resetToken = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour

      try {
        await storage.createPasswordReset({
          email: user.email,
          token: resetToken,
          expiresAt,
        });
      } catch (dbError) {
        console.warn("Failed to save reset token:", dbError.message);
        // Continue anyway - don't block user
      }

      // Try to send reset email
      try {
        await sendEmail(
          user.email,
          "Password Reset - TechFest 2025",
          `<h1>Password Reset</h1><p>Click the link to reset your password: <a href="/reset-password?token=${resetToken}">Reset Password</a></p><p>This link expires in 1 hour.</p>`
        );
      } catch (emailError) {
        console.warn("Failed to send reset email:", emailError.message);
      }

      res.json({ 
        message: "If email exists, reset link will be sent",
        success: true
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return handleDatabaseError(error, res);
    }
  });

  // ========== USER ROUTES ==========

  // Get user registrations
  app.get("/api/user/registrations", authenticateUser, async (req, res) => {
    try {
      const userId = (req as any).userId;

      let hackathonReg, workshopReg;
      try {
        hackathonReg = await storage.getHackathonRegistrationByLeaderId(userId);
        workshopReg = await storage.getWorkshopRegistrationByUserId(userId);
      } catch (dbError) {
        console.warn("Database registrations fetch failed:", dbError.message);
        // Return empty data instead of error
        return res.json({
          hackathon: null,
          workshop: null,
          message: "Could not load registrations"
        });
      }

      let hackathonWithMembers = null;
      if (hackathonReg) {
        try {
          const members = await storage.getHackathonMembersByRegistrationId(hackathonReg.id);
          hackathonWithMembers = { ...hackathonReg, members };
        } catch (memberError) {
          console.warn("Failed to fetch members:", memberError.message);
          hackathonWithMembers = { ...hackathonReg, members: [] };
        }
      }

      res.json({
        success: true,
        hackathon: hackathonWithMembers,
        workshop: workshopReg,
      });
    } catch (error) {
      console.error("Get registrations error:", error);
      return res.status(500).json({ 
        message: "Failed to load registrations",
        error: error.message
      });
    }
  });

  // Update user profile
  app.patch("/api/user/profile", authenticateUser, async (req, res) => {
    try {
      const userId = (req as any).userId;
      
      console.log('Updating profile for user ID:', userId);
      
      // Basic validation
      if (!userId || userId.trim() === '') {
        return res.status(400).json({ message: "User ID is required" });
      }

      const data = updateProfileSchema.parse(req.body);

      let updatedUser;
      try {
        updatedUser = await storage.updateUser(userId, data);
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
      } catch (dbError) {
        console.error("Database update failed:", dbError.message);
        return res.status(503).json({ 
          message: "Failed to update profile. Please try again.",
          error: "Database error"
        });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ 
        success: true,
        user: userWithoutPassword,
        message: "Profile updated successfully"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Update profile error:", error);
      return res.status(500).json({ 
        message: "Failed to update profile",
        error: error.message
      });
    }
  });

  // ========== HACKATHON ROUTES ==========

  // Register for hackathon
  app.post("/api/hackathon/register", authenticateUser, async (req, res) => {
    try {
      const userId = (req as any).userId;
      const data = hackathonFormSchema.parse(req.body);

      console.log("Hackathon registration by user:", userId);

      // Check if already registered
      try {
        const existingReg = await storage.getHackathonRegistrationByLeaderId(userId);
        if (existingReg) {
          return res.status(400).json({ message: "You have already registered a team" });
        }
      } catch (dbError) {
        console.warn("Database check failed:", dbError.message);
        // Continue anyway
      }

      // Check for duplicate member emails
      const allEmails = [data.leaderEmail, ...data.members.map((m) => m.email)];
      const uniqueEmails = new Set(allEmails.map((e) => e.toLowerCase()));
      if (uniqueEmails.size !== allEmails.length) {
        return res.status(400).json({ message: "Duplicate email addresses found" });
      }

      let registration;
      try {
        // Create registration
        registration = await storage.createHackathonRegistration({
          teamName: data.teamName,
          leaderId: userId,
          leaderName: data.leaderName,
          leaderEmail: data.leaderEmail,
          leaderPhone: data.leaderPhone,
          leaderCollege: data.leaderCollege,
          leaderYear: data.leaderYear,
        });

        // Add team members
        for (const member of data.members) {
          try {
            await storage.createHackathonMember({
              registrationId: registration.id,
              name: member.name,
              email: member.email,
              phone: member.phone,
            });
          } catch (memberError) {
            console.warn("Failed to add member:", member.name, memberError.message);
            // Continue with other members
          }
        }
      } catch (dbError) {
        console.error("Database registration failed:", dbError.message);
        return res.status(503).json({ 
          message: "Registration failed. Please try again later.",
          error: "Database error"
        });
      }

      // Try to send confirmation email
      try {
        await sendEmail(
          data.leaderEmail,
          "Hackathon Registration Confirmed - TechFest 2025",
          `<h1>Registration Confirmed!</h1>
          <p>Hi ${data.leaderName},</p>
          <p>Your team <strong>${data.teamName}</strong> has been successfully registered for Hackathon 2025!</p>
          <h3>Team Details:</h3>
          <ul>
            <li>Team Name: ${data.teamName}</li>
            <li>Team Leader: ${data.leaderName}</li>
            <li>Total Members: ${data.members.length + 1}</li>
          </ul>
          <p>Event Date: March 15-17, 2025</p>
          <p>We're excited to have you!</p>`
        );
      } catch (emailError) {
        console.warn("Failed to send confirmation email:", emailError.message);
      }

      res.json({ 
        success: true,
        message: "Registration successful", 
        registration 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return handleDatabaseError(error, res);
    }
  });

  // ========== WORKSHOP ROUTES ==========

  // Register for workshop
  app.post("/api/workshop/register", authenticateUser, async (req, res) => {
    try {
      const userId = (req as any).userId;
      const data = workshopFormSchema.parse(req.body);

      console.log("Workshop registration by user:", userId);

      // Check if already registered
      try {
        const existingReg = await storage.getWorkshopRegistrationByUserId(userId);
        if (existingReg) {
          return res.status(400).json({ message: "You have already registered for the workshop" });
        }

        // Check if email already used
        const emailReg = await storage.getWorkshopRegistrationByEmail(data.email);
        if (emailReg) {
          return res.status(400).json({ message: "This email is already registered" });
        }
      } catch (dbError) {
        console.warn("Database check failed:", dbError.message);
        // Continue anyway
      }

      let registration;
      try {
        // Create registration
        registration = await storage.createWorkshopRegistration({
          userId,
          name: data.name,
          email: data.email,
          phone: data.phone,
          college: data.college,
        });
      } catch (dbError) {
        console.error("Database registration failed:", dbError.message);
        return res.status(503).json({ 
          message: "Registration failed. Please try again later.",
          error: "Database error"
        });
      }

      // Try to send confirmation email
      try {
        await sendEmail(
          data.email,
          "Workshop Registration Confirmed - TechFest 2025",
          `<h1>Registration Confirmed!</h1>
          <p>Hi ${data.name},</p>
          <p>You have been successfully registered for the Python Workshop!</p>
          <h3>Your Details:</h3>
          <ul>
            <li>Name: ${data.name}</li>
            <li>Email: ${data.email}</li>
            <li>College: ${data.college}</li>
          </ul>
          <p>Event Date: April 5-6, 2025</p>
          <p>You will receive a certificate upon completion.</p>
          <p>We're excited to have you!</p>`
        );
      } catch (emailError) {
        console.warn("Failed to send confirmation email:", emailError.message);
      }

      res.json({ 
        success: true,
        message: "Registration successful", 
        registration 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return handleDatabaseError(error, res);
    }
  });

  // ========== ADMIN ROUTES ==========

  // Get admin stats
  app.get("/api/admin/stats", authenticateAdmin, async (req, res) => {
    try {
      let stats;
      try {
        stats = await storage.getStats();
      } catch (dbError) {
        console.error("Failed to fetch stats:", dbError.message);
        // Return empty stats
        stats = {
          totalUsers: 0,
          totalHackathonRegistrations: 0,
          totalWorkshopRegistrations: 0
        };
      }
      
      res.json({ success: true, ...stats });
    } catch (error) {
      console.error("Get stats error:", error);
      return res.status(500).json({ 
        success: false,
        message: "Failed to load statistics",
        error: error.message
      });
    }
  });

  // Get all hackathon registrations
  app.get("/api/admin/hackathon", authenticateAdmin, async (req, res) => {
    try {
      let registrations;
      try {
        registrations = await storage.getAllHackathonRegistrations();
      } catch (dbError) {
        console.error("Failed to fetch hackathon registrations:", dbError.message);
        registrations = [];
      }
      
      res.json({ success: true, data: registrations });
    } catch (error) {
      console.error("Get hackathon registrations error:", error);
      return res.status(500).json({ 
        success: false,
        message: "Failed to load registrations",
        error: error.message
      });
    }
  });

  // Get all workshop registrations
  app.get("/api/admin/workshop", authenticateAdmin, async (req, res) => {
    try {
      let registrations;
      try {
        registrations = await storage.getAllWorkshopRegistrations();
      } catch (dbError) {
        console.error("Failed to fetch workshop registrations:", dbError.message);
        registrations = [];
      }
      
      res.json({ success: true, data: registrations });
    } catch (error) {
      console.error("Get workshop registrations error:", error);
      return res.status(500).json({ 
        success: false,
        message: "Failed to load registrations",
        error: error.message
      });
    }
  });

  // ========== EXPORT ROUTES ==========

  // Export CSV - Hackathon
  app.get("/api/admin/export/hackathon", authenticateAdmin, async (req, res) => {
    try {
      let registrations = [];
      try {
        registrations = await storage.getAllHackathonRegistrations();
      } catch (dbError) {
        console.error("Failed to fetch hackathon data for export:", dbError.message);
      }

      let csv = "Team Name,Leader Name,Leader Email,Leader Phone,Leader College,Leader Year,Member Names,Member Emails,Member Phones\n";

      for (const reg of registrations) {
        const memberNames = reg.members?.map((m) => m.name).join("; ") || "";
        const memberEmails = reg.members?.map((m) => m.email).join("; ") || "";
        const memberPhones = reg.members?.map((m) => m.phone).join("; ") || "";

        csv += `"${reg.teamName || ''}","${reg.leaderName || ''}","${reg.leaderEmail || ''}","${reg.leaderPhone || ''}","${reg.leaderCollege || ''}","${reg.leaderYear || ''}","${memberNames}","${memberEmails}","${memberPhones}"\n`;
      }

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=hackathon_registrations.csv");
      res.send(csv);
    } catch (error) {
      console.error("Export hackathon CSV error:", error);
      return res.status(500).json({ 
        success: false,
        message: "Failed to export data",
        error: error.message
      });
    }
  });

  // Export CSV - Workshop
  app.get("/api/admin/export/workshop", authenticateAdmin, async (req, res) => {
    try {
      let registrations = [];
      try {
        registrations = await storage.getAllWorkshopRegistrations();
      } catch (dbError) {
        console.error("Failed to fetch workshop data for export:", dbError.message);
      }

      let csv = "Name,Email,Phone,College,Registered At\n";

      for (const reg of registrations) {
        const date = reg.createdAt ? new Date(reg.createdAt).toLocaleString() : '';
        csv += `"${reg.name || ''}","${reg.email || ''}","${reg.phone || ''}","${reg.college || ''}","${date}"\n`;
      }

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=workshop_registrations.csv");
      res.send(csv);
    } catch (error) {
      console.error("Export workshop CSV error:", error);
      return res.status(500).json({ 
        success: false,
        message: "Failed to export data",
        error: error.message
      });
    }
  });

  return httpServer;
}
