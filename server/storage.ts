import { MongoClient, ObjectId } from 'mongodb';
import {
  type User,
  type InsertUser,
  type Admin,
  type InsertAdmin,
  type HackathonRegistration,
  type InsertHackathonRegistration,
  type HackathonMember,
  type InsertHackathonMember,
  type WorkshopRegistration,
  type InsertWorkshopRegistration,
  type PasswordReset,
  type InsertPasswordReset,
  type HackathonRegistrationWithMembers,
  type DashboardStats,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllUsers(): Promise<User[]>;

  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  getUserCount(): Promise<number>;

  getAdmin(id: string): Promise<Admin | undefined>;
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;

  createPasswordReset(reset: InsertPasswordReset): Promise<PasswordReset>;
  getPasswordResetByToken(token: string): Promise<PasswordReset | undefined>;
  deletePasswordReset(id: string): Promise<void>;

  createHackathonRegistration(
    registration: InsertHackathonRegistration
  ): Promise<HackathonRegistration>;
  getHackathonRegistrationByLeaderId(
    leaderId: string
  ): Promise<HackathonRegistration | undefined>;
  getAllHackathonRegistrations(): Promise<HackathonRegistrationWithMembers[]>;
  deleteHackathonRegistration(id: string): Promise<void>;
  getHackathonRegistrationCount(): Promise<number>;

  createHackathonMember(member: InsertHackathonMember): Promise<HackathonMember>;
  getHackathonMembersByRegistrationId(
    registrationId: string
  ): Promise<HackathonMember[]>;
  deleteHackathonMembersByRegistrationId(registrationId: string): Promise<void>;

  createWorkshopRegistration(
    registration: InsertWorkshopRegistration
  ): Promise<WorkshopRegistration>;
  getWorkshopRegistrationByUserId(
    userId: string
  ): Promise<WorkshopRegistration | undefined>;
  getWorkshopRegistrationByEmail(
    email: string
  ): Promise<WorkshopRegistration | undefined>;
  getAllWorkshopRegistrations(): Promise<WorkshopRegistration[]>;
  deleteWorkshopRegistration(id: string): Promise<void>;
  getWorkshopRegistrationCount(): Promise<number>;

  getStats(): Promise<DashboardStats>;
}

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private db: any;

  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/CSE');
    this.init();
  }

  private async init() {
    try {
      await this.client.connect();
      this.db = this.client.db();
      console.log('✅ Connected to MongoDB');
      
      // Create default admin if not exists
      await this.createDefaultAdmin();
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
    }
  }

  private async createDefaultAdmin() {
    const adminExists = await this.getAdminByEmail("admin@tiffinbox.com");
    if (!adminExists) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash("admin123", 12);
      
      await this.createAdmin({
        name: "Admin",
        email: "admin@tiffinbox.com",
        password: hashedPassword,
      });
      console.log('✅ Default admin created');
    }
  }

  // YE NAYA METHOD ADD KARO
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.db.collection('users').find().sort({ createdAt: -1 }).toArray();
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  // Users - FIXED FUNCTIONS
  async getUser(id: string): Promise<User | undefined> {
    try {
      // Try as ObjectId first
      try {
        const user = await this.db.collection('users').findOne({ 
          _id: new ObjectId(id) 
        });
        if (user) return user;
      } catch (error) {
        // If ObjectId fails, try as string UUID
        const user = await this.db.collection('users').findOne({ 
          id: id 
        });
        return user || undefined;
      }
      
      return undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.db.collection('users').findOne({ email: email.toLowerCase() });
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: randomUUID(),
      createdAt: new Date(),
    };
    
    const result = await this.db.collection('users').insertOne({
      ...user,
      _id: new ObjectId(),
    });
    
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    try {
      // Try as ObjectId first
      try {
        const result = await this.db.collection('users').findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { ...updates, updatedAt: new Date() } },
          { returnDocument: "after" }
        );
        if (result) return result;
      } catch (error) {
        // If ObjectId fails, try as string UUID
        const result = await this.db.collection('users').findOneAndUpdate(
          { id: id },
          { $set: { ...updates, updatedAt: new Date() } },
          { returnDocument: "after" }
        );
        return result || undefined;
      }
      
      return undefined;
    } catch (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
  }

  async getUserCount(): Promise<number> {
    return await this.db.collection('users').countDocuments();
  }

  // Admins
  async getAdmin(id: string): Promise<Admin | undefined> {
    try {
      // Try as ObjectId first
      try {
        const admin = await this.db.collection('admins').findOne({ 
          _id: new ObjectId(id) 
        });
        if (admin) return admin;
      } catch (error) {
        // If ObjectId fails, try as string UUID
        const admin = await this.db.collection('admins').findOne({ 
          id: id 
        });
        return admin || undefined;
      }
      
      return undefined;
    } catch (error) {
      console.error('Error getting admin:', error);
      return undefined;
    }
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    return await this.db.collection('admins').findOne({ email: email.toLowerCase() });
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const admin: Admin = {
      ...insertAdmin,
      id: randomUUID(),
    };
    
    await this.db.collection('admins').insertOne({
      ...admin,
      _id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return admin;
  }

  // Password Resets
  async createPasswordReset(insertReset: InsertPasswordReset): Promise<PasswordReset> {
    const reset: PasswordReset = {
      ...insertReset,
      id: randomUUID(),
    };
    
    await this.db.collection('passwordResets').insertOne({
      ...reset,
      _id: new ObjectId(),
      createdAt: new Date(),
    });
    
    return reset;
  }

  async getPasswordResetByToken(token: string): Promise<PasswordReset | undefined> {
    return await this.db.collection('passwordResets').findOne({ token });
  }

  async deletePasswordReset(id: string): Promise<void> {
    await this.db.collection('passwordResets').deleteOne({ id });
  }

  // Hackathon Registrations
  async createHackathonRegistration(insertReg: InsertHackathonRegistration): Promise<HackathonRegistration> {
    const registration: HackathonRegistration = {
      ...insertReg,
      id: randomUUID(),
      createdAt: new Date(),
    };
    
    await this.db.collection('hackathonRegistrations').insertOne({
      ...registration,
      _id: new ObjectId(),
    });
    
    return registration;
  }

  async getHackathonRegistrationByLeaderId(leaderId: string): Promise<HackathonRegistration | undefined> {
    return await this.db.collection('hackathonRegistrations').findOne({ leaderId });
  }

  async getAllHackathonRegistrations(): Promise<HackathonRegistrationWithMembers[]> {
    const registrations = await this.db.collection('hackathonRegistrations').find().toArray();
    
    const registrationsWithMembers = await Promise.all(
      registrations.map(async (reg: any) => {
        const members = await this.getHackathonMembersByRegistrationId(reg.id);
        return {
          ...reg,
          members,
        };
      })
    );
    
    return registrationsWithMembers;
  }

  async deleteHackathonRegistration(id: string): Promise<void> {
    await this.deleteHackathonMembersByRegistrationId(id);
    await this.db.collection('hackathonRegistrations').deleteOne({ id });
  }

  async getHackathonRegistrationCount(): Promise<number> {
    return await this.db.collection('hackathonRegistrations').countDocuments();
  }

  // Hackathon Members
  async createHackathonMember(insertMember: InsertHackathonMember): Promise<HackathonMember> {
    const member: HackathonMember = {
      ...insertMember,
      id: randomUUID(),
    };
    
    await this.db.collection('hackathonMembers').insertOne({
      ...member,
      _id: new ObjectId(),
    });
    
    return member;
  }

  async getHackathonMembersByRegistrationId(registrationId: string): Promise<HackathonMember[]> {
    return await this.db.collection('hackathonMembers')
      .find({ registrationId })
      .toArray();
  }

  async deleteHackathonMembersByRegistrationId(registrationId: string): Promise<void> {
    await this.db.collection('hackathonMembers').deleteMany({ registrationId });
  }

  // Workshop Registrations
  async createWorkshopRegistration(insertReg: InsertWorkshopRegistration): Promise<WorkshopRegistration> {
    const registration: WorkshopRegistration = {
      ...insertReg,
      id: randomUUID(),
      createdAt: new Date(),
    };
    
    await this.db.collection('workshopRegistrations').insertOne({
      ...registration,
      _id: new ObjectId(),
    });
    
    return registration;
  }

  async getWorkshopRegistrationByUserId(userId: string): Promise<WorkshopRegistration | undefined> {
    return await this.db.collection('workshopRegistrations').findOne({ userId });
  }

  async getWorkshopRegistrationByEmail(email: string): Promise<WorkshopRegistration | undefined> {
    return await this.db.collection('workshopRegistrations').findOne({ email: email.toLowerCase() });
  }

  async getAllWorkshopRegistrations(): Promise<WorkshopRegistration[]> {
    return await this.db.collection('workshopRegistrations').find().toArray();
  }

  async deleteWorkshopRegistration(id: string): Promise<void> {
    await this.db.collection('workshopRegistrations').deleteOne({ id });
  }

  async getWorkshopRegistrationCount(): Promise<number> {
    return await this.db.collection('workshopRegistrations').countDocuments();
  }

  // Stats
  async getStats(): Promise<DashboardStats> {
    const [totalUsers, totalHackathonTeams, totalWorkshopParticipants] = await Promise.all([
      this.getUserCount(),
      this.getHackathonRegistrationCount(),
      this.getWorkshopRegistrationCount(),
    ]);

    return {
      totalUsers,
      totalHackathonTeams,
      totalWorkshopParticipants,
    };
  }
}

// MongoDB storage use karo
export const storage = new MongoStorage();