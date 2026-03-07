// Create admin user script
// Run this with: node scripts/create-admin.js

import mongoose from 'mongoose';
import User from '../server/models/User.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mel-laundry');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Username: admin');
      console.log('Password: meladmin2024');
      return;
    }

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      password: 'meladmin2024',
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: meladmin2024');
    console.log('Login URL: http://localhost:3003/admin');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
