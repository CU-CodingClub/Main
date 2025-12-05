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

// SIMPLE IN-MEMORY STORAGE FOR NOW
export class MemoryStorage implements IStorage {
  private users: Map<string, User>;
  private admins: Map<string, Admin>;
  private hackathonRegistrations: Map<string, HackathonRegistration>;
  private hackathonMembers: Map<string, HackathonMember>;
  private workshopRegistrations: Map<string, WorkshopRegistration>;
  private passwordResets: Map<string, PasswordReset>;

  constructor() {
    this.users = new Map();
    this.admins = new Map();
    this.hackathonRegistrations = new Map();
    this.hackathonMembers = new Map();
    this.workshopRegistrations = new Map();
    this.passwordResets = new Map();
    
    // Create default admin
    this.createDefaultAdmin();
    console.log('✅ Using Memory Storage (MongoDB not connected)');
  }

  private async createDefaultAdmin() {
    const adminExists = await this.getAdminByEmail("admin@tiffinbox.com");
    if (!adminExists) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash("admin123", 12);
      
      const admin: Admin = {
        id: randomUUID(),
        name: "Admin",
        email: "admin@tiffinbox.com",
        password: hashedPassword,
      };
      
      this.admins.set(admin.id, admin);
      console.log('✅ Default admin created in memory');
    }
  }

  // Users
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      user => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: randomUUID(),
      createdAt: new Date(),
    };
    
    this.users.set(user.id, user);
    console.log(`✅ User created in memory: ${user.email}`);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUserCount(): Promise<number> {
    return this.users.size;
  }

  // Admins
  async getAdmin(id: string): Promise<Admin | undefined> {
    return this.admins.get(id);
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(
      admin => admin.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const admin: Admin = {
      ...insertAdmin,
      id: randomUUID(),
    };
    
    this.admins.set(admin.id, admin);
    return admin;
  }

  // Password Resets
  async createPasswordReset(insertReset: InsertPasswordReset): Promise<PasswordReset> {
    const reset: PasswordReset = {
      ...insertReset,
      id: randomUUID(),
    };
    
    this.passwordResets.set(reset.id, reset);
    return reset;
  }

  async getPasswordResetByToken(token: string): Promise<PasswordReset | undefined> {
    return Array.from(this.passwordResets.values()).find(
      reset => reset.token === token
    );
  }

  async deletePasswordReset(id: string): Promise<void> {
    this.passwordResets.delete(id);
  }

  // Hackathon Registrations
  async createHackathonRegistration(insertReg: InsertHackathonRegistration): Promise<HackathonRegistration> {
    const registration: HackathonRegistration = {
      ...insertReg,
      id: randomUUID(),
      createdAt: new Date(),
    };
    
    this.hackathonRegistrations.set(registration.id, registration);
    console.log(`✅ Hackathon team registered: ${registration.teamName}`);
    return registration;
  }

  async getHackathonRegistrationByLeaderId(leaderId: string): Promise<HackathonRegistration | undefined> {
    return Array.from(this.hackathonRegistrations.values()).find(
      reg => reg.leaderId === leaderId
    );
  }

  async getAllHackathonRegistrations(): Promise<HackathonRegistrationWithMembers[]> {
    const registrations = Array.from(this.hackathonRegistrations.values());
    
    const registrationsWithMembers = registrations.map(reg => {
      const members = Array.from(this.hackathonMembers.values()).filter(
        member => member.registrationId === reg.id
      );
      
      return {
        ...reg,
        members,
      };
    });
    
    return registrationsWithMembers;
  }

  async deleteHackathonRegistration(id: string): Promise<void> {
    this.hackathonRegistrations.delete(id);
  }

  async getHackathonRegistrationCount(): Promise<number> {
    return this.hackathonRegistrations.size;
  }

  // Hackathon Members
  async createHackathonMember(insertMember: InsertHackathonMember): Promise<HackathonMember> {
    const member: HackathonMember = {
      ...insertMember,
      id: randomUUID(),
    };
    
    this.hackathonMembers.set(member.id, member);
    return member;
  }

  async getHackathonMembersByRegistrationId(registrationId: string): Promise<HackathonMember[]> {
    return Array.from(this.hackathonMembers.values()).filter(
      member => member.registrationId === registrationId
    );
  }

  async deleteHackathonMembersByRegistrationId(registrationId: string): Promise<void> {
    Array.from(this.hackathonMembers.entries())
      .filter(([_, member]) => member.registrationId === registrationId)
      .forEach(([id, _]) => this.hackathonMembers.delete(id));
  }

  // Workshop Registrations
  async createWorkshopRegistration(insertReg: InsertWorkshopRegistration): Promise<WorkshopRegistration> {
    const registration: WorkshopRegistration = {
      ...insertReg,
      id: randomUUID(),
      createdAt: new Date(),
    };
    
    this.workshopRegistrations.set(registration.id, registration);
    console.log(`✅ Workshop registration: ${registration.name}`);
    return registration;
  }

  async getWorkshopRegistrationByUserId(userId: string): Promise<WorkshopRegistration | undefined> {
    return Array.from(this.workshopRegistrations.values()).find(
      reg => reg.userId === userId
    );
  }

  async getWorkshopRegistrationByEmail(email: string): Promise<WorkshopRegistration | undefined> {
    return Array.from(this.workshopRegistrations.values()).find(
      reg => reg.email.toLowerCase() === email.toLowerCase()
    );
  }

  async getAllWorkshopRegistrations(): Promise<WorkshopRegistration[]> {
    return Array.from(this.workshopRegistrations.values());
  }

  async deleteWorkshopRegistration(id: string): Promise<void> {
    this.workshopRegistrations.delete(id);
  }

  async getWorkshopRegistrationCount(): Promise<number> {
    return this.workshopRegistrations.size;
  }

  // Stats
  async getStats(): Promise<DashboardStats> {
    return {
      totalUsers: this.users.size,
      totalHackathonTeams: this.hackathonRegistrations.size,
      totalWorkshopParticipants: this.workshopRegistrations.size,
    };
  }
}

// Auto-switch between MongoDB and Memory storage
export class HybridStorage implements IStorage {
  private mongoStorage: MongoStorage | null = null;
  private memoryStorage: MemoryStorage;
  private usingMongoDB = false;

  constructor() {
    this.memoryStorage = new MemoryStorage();
    this.tryConnectMongoDB();
  }

  private async tryConnectMongoDB() {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️ MONGODB_URI not configured - using Memory Storage');
      return;
    }

    try {
      this.mongoStorage = new MongoStorage();
      // Wait a bit to see if connection succeeds
      setTimeout(() => {
        if (this.mongoStorage && this.mongoStorage.isConnected) {
          this.usingMongoDB = true;
          console.log('✅ Switched to MongoDB Storage');
        }
      }, 2000);
    } catch (error) {
      console.log('⚠️ MongoDB connection failed - using Memory Storage');
    }
  }

  // Helper to use appropriate storage
  private async withStorage<T>(operation: (storage: IStorage) => Promise<T>): Promise<T> {
    if (this.usingMongoDB && this.mongoStorage) {
      try {
        return await operation(this.mongoStorage);
      } catch (error) {
        console.warn('MongoDB operation failed, falling back to memory:', error.message);
        this.usingMongoDB = false;
        return await operation(this.memoryStorage);
      }
    }
    return await operation(this.memoryStorage);
  }

  // Implement all IStorage methods using withStorage
  async getAllUsers(): Promise<User[]> {
    return this.withStorage(storage => storage.getAllUsers());
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.withStorage(storage => storage.getUser(id));
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.withStorage(storage => storage.getUserByEmail(email));
  }

  async createUser(user: InsertUser): Promise<User> {
    return this.withStorage(storage => storage.createUser(user));
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    return this.withStorage(storage => storage.updateUser(id, updates));
  }

  async getUserCount(): Promise<number> {
    return this.withStorage(storage => storage.getUserCount());
  }

  async getAdmin(id: string): Promise<Admin | undefined> {
    return this.withStorage(storage => storage.getAdmin(id));
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    return this.withStorage(storage => storage.getAdminByEmail(email));
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    return this.withStorage(storage => storage.createAdmin(admin));
  }

  async createPasswordReset(reset: InsertPasswordReset): Promise<PasswordReset> {
    return this.withStorage(storage => storage.createPasswordReset(reset));
  }

  async getPasswordResetByToken(token: string): Promise<PasswordReset | undefined> {
    return this.withStorage(storage => storage.getPasswordResetByToken(token));
  }

  async deletePasswordReset(id: string): Promise<void> {
    return this.withStorage(storage => storage.deletePasswordReset(id));
  }

  async createHackathonRegistration(registration: InsertHackathonRegistration): Promise<HackathonRegistration> {
    return this.withStorage(storage => storage.createHackathonRegistration(registration));
  }

  async getHackathonRegistrationByLeaderId(leaderId: string): Promise<HackathonRegistration | undefined> {
    return this.withStorage(storage => storage.getHackathonRegistrationByLeaderId(leaderId));
  }

  async getAllHackathonRegistrations(): Promise<HackathonRegistrationWithMembers[]> {
    return this.withStorage(storage => storage.getAllHackathonRegistrations());
  }

  async deleteHackathonRegistration(id: string): Promise<void> {
    return this.withStorage(storage => storage.deleteHackathonRegistration(id));
  }

  async getHackathonRegistrationCount(): Promise<number> {
    return this.withStorage(storage => storage.getHackathonRegistrationCount());
  }

  async createHackathonMember(member: InsertHackathonMember): Promise<HackathonMember> {
    return this.withStorage(storage => storage.createHackathonMember(member));
  }

  async getHackathonMembersByRegistrationId(registrationId: string): Promise<HackathonMember[]> {
    return this.withStorage(storage => storage.getHackathonMembersByRegistrationId(registrationId));
  }

  async deleteHackathonMembersByRegistrationId(registrationId: string): Promise<void> {
    return this.withStorage(storage => storage.deleteHackathonMembersByRegistrationId(registrationId));
  }

  async createWorkshopRegistration(registration: InsertWorkshopRegistration): Promise<WorkshopRegistration> {
    return this.withStorage(storage => storage.createWorkshopRegistration(registration));
  }

  async getWorkshopRegistrationByUserId(userId: string): Promise<WorkshopRegistration | undefined> {
    return this.withStorage(storage => storage.getWorkshopRegistrationByUserId(userId));
  }

  async getWorkshopRegistrationByEmail(email: string): Promise<WorkshopRegistration | undefined> {
    return this.withStorage(storage => storage.getWorkshopRegistrationByEmail(email));
  }

  async getAllWorkshopRegistrations(): Promise<WorkshopRegistration[]> {
    return this.withStorage(storage => storage.getAllWorkshopRegistrations());
  }

  async deleteWorkshopRegistration(id: string): Promise<void> {
    return this.withStorage(storage => storage.deleteWorkshopRegistration(id));
  }

  async getWorkshopRegistrationCount(): Promise<number> {
    return this.withStorage(storage => storage.getWorkshopRegistrationCount());
  }

  async getStats(): Promise<DashboardStats> {
    return this.withStorage(storage => storage.getStats());
  }
}

// Add this MongoStorage class definition
class MongoStorage implements IStorage {
  private client: MongoClient;
  private db: any;
  public isConnected = false;

  constructor() {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not configured');
    }
    
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.init();
  }

  private async init() {
    try {
      await this.client.connect();
      this.db = this.client.db();
      this.isConnected = true;
      console.log('✅ Connected to MongoDB');
      
      // Create indexes
      await this.createIndexes();
      await this.createDefaultAdmin();
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error.message);
      throw error;
    }
  }

  private async createIndexes() {
    await this.db.collection('users').createIndex({ email: 1 }, { unique: true });
    await this.db.collection('admins').createIndex({ email: 1 }, { unique: true });
    await this.db.collection('hackathonRegistrations').createIndex({ leaderId: 1 });
    await this.db.collection('workshopRegistrations').createIndex({ email: 1 });
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
      console.log('✅ Default admin created in MongoDB');
    }
  }

  // Implement all MongoStorage methods here (same as before but with error handling)
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.db.collection('users').find().sort({ createdAt: -1 }).toArray();
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await this.db.collection('users').findOne({ id: id });
      return user || undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.db.collection('users').findOne({ email: email.toLowerCase() });
    } catch (error) {
      console.error('Error getting user by email:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const user: User = {
        ...insertUser,
        id: randomUUID(),
        createdAt: new Date(),
      };
      
      await this.db.collection('users').insertOne(user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // ... Add all other MongoStorage methods here (same implementations as before)

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    try {
      const result = await this.db.collection('users').findOneAndUpdate(
        { id: id },
        { $set: { ...updates, updatedAt: new Date() } },
        { returnDocument: "after" }
      );
      return result || undefined;
    } catch (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
  }

  async getUserCount(): Promise<number> {
    try {
      return await this.db.collection('users').countDocuments();
    } catch (error) {
      console.error('Error getting user count:', error);
      return 0;
    }
  }

  // ... Add the rest of the methods following the same pattern
  // For brevity, I'm showing the pattern. You should copy all methods from your existing MongoStorage

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    try {
      return await this.db.collection('admins').findOne({ email: email.toLowerCase() });
    } catch (error) {
      console.error('Error getting admin by email:', error);
      return undefined;
    }
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    try {
      const admin: Admin = {
        ...insertAdmin,
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await this.db.collection('admins').insertOne(admin);
      return admin;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  // Add all other methods with try-catch
}

// Use HybridStorage for automatic fallback
export const storage = new HybridStorage();
