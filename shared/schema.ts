import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - for regular users
export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  phone: text("phone"),
  college: text("college"),
  year: text("year"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Admins table - separate admin credentials
export const admins = pgTable("admins", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
});

// Hackathon registrations - team leader info
export const hackathonRegistrations = pgTable("hackathon_registrations", {
  id: varchar("id", { length: 36 }).primaryKey(),
  teamName: text("team_name").notNull(),
  leaderId: varchar("leader_id", { length: 36 }).notNull(),
  leaderName: text("leader_name").notNull(),
  leaderEmail: text("leader_email").notNull(),
  leaderPhone: text("leader_phone").notNull(),
  leaderCollege: text("leader_college").notNull(),
  leaderYear: text("leader_year").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Hackathon team members
export const hackathonMembers = pgTable("hackathon_members", {
  id: varchar("id", { length: 36 }).primaryKey(),
  registrationId: varchar("registration_id", { length: 36 }).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
});

// Workshop registrations - individual participants
export const workshopRegistrations = pgTable("workshop_registrations", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  college: text("college").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Password reset tokens
export const passwordResets = pgTable("password_resets", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertAdminSchema = createInsertSchema(admins).omit({ id: true });
export const insertHackathonRegistrationSchema = createInsertSchema(hackathonRegistrations).omit({ id: true, createdAt: true });
export const insertHackathonMemberSchema = createInsertSchema(hackathonMembers).omit({ id: true });
export const insertWorkshopRegistrationSchema = createInsertSchema(workshopRegistrations).omit({ id: true, createdAt: true });
export const insertPasswordResetSchema = createInsertSchema(passwordResets).omit({ id: true });

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Team member schema for hackathon
export const teamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
});

// Hackathon registration form schema
export const hackathonFormSchema = z.object({
  teamName: z.string().min(2, "Team name is required"),
  leaderName: z.string().min(2, "Name is required"),
  leaderEmail: z.string().email("Invalid email"),
  leaderPhone: z.string().min(10, "Valid phone required"),
  leaderCollege: z.string().min(2, "College is required"),
  leaderYear: z.string().min(1, "Year is required"),
  members: z.array(teamMemberSchema).min(0).max(4),
});

// Workshop registration form schema
export const workshopFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  college: z.string().min(2, "College is required"),
});

// Profile update schema
export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().optional(),
  college: z.string().optional(),
  year: z.string().optional(),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type HackathonRegistration = typeof hackathonRegistrations.$inferSelect;
export type InsertHackathonRegistration = z.infer<typeof insertHackathonRegistrationSchema>;
export type HackathonMember = typeof hackathonMembers.$inferSelect;
export type InsertHackathonMember = z.infer<typeof insertHackathonMemberSchema>;
export type WorkshopRegistration = typeof workshopRegistrations.$inferSelect;
export type InsertWorkshopRegistration = z.infer<typeof insertWorkshopRegistrationSchema>;
export type PasswordReset = typeof passwordResets.$inferSelect;
export type InsertPasswordReset = z.infer<typeof insertPasswordResetSchema>;

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type HackathonFormInput = z.infer<typeof hackathonFormSchema>;
export type WorkshopFormInput = z.infer<typeof workshopFormSchema>;
export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// Extended types for API responses
export type HackathonRegistrationWithMembers = HackathonRegistration & {
  members: HackathonMember[];
};

export type DashboardStats = {
  totalUsers: number;
  totalHackathonTeams: number;
  totalWorkshopParticipants: number;
};

export type UserWithRegistrations = User & {
  hackathonRegistration?: HackathonRegistrationWithMembers;
  workshopRegistration?: WorkshopRegistration;
};
