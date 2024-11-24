console.log('Starting server...');

import express from 'express';
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://ReactNowDev:22Jev1Rw1qPigAPU@cluster0.xpksu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&authSource=admin&tls=true&tlsInsecure=true';
const PORT = 5000;
const JWT_SECRET = '45ec81e1fecbd3c57cae94d00e59c4d15cee7f75bc63258267fcdc332f70fd39b117ba5e36dec8aabd43e60e407f7a51294c9b61c46e90517ba1d096e5e06a3f';

console.log('About to connect to MongoDB with URI:', MONGODB_URI);

try {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        sslValidate: false,
        tlsAllowInvalidCertificates: true
    });
    console.log('Connected to MongoDB Atlas');
} catch (error) {
    console.error('MongoDB connection error:', error);
}
