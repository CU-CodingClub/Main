import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function seedDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/CSE');
  
  try {
    await client.connect();
    console.log('✅ MongoDB connected');
    
    const db = client.db();
    
    // Create admin
    const adminExists = await db.collection('admins').findOne({ email: "admin@tiffinbox.com" });
    
    if (!adminExists) {
      const adminData = {
        name: "Admin",
        email: "admin@tiffinbox.com",
        password: await bcrypt.hash("admin123", 12),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await db.collection('admins').insertOne(adminData);
      console.log('✅ Admin created');
    } else {
      console.log('✅ Admin already exists');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();