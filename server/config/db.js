import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

console.log('🔍 Loading MONGO_URI:', process.env.MONGO_URI ? '✅ LOADED' : '❌ MISSING');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('❌ MONGO_URI missing from .env file');
        }

        await mongoose.connect(process.env.MONGO_URI, {
            tls: true,
            tlsCAFile: undefined // optional, default CA works
        });

        console.log('✅ MongoDB Atlas connected successfully!');
    } catch (error) {
        console.error('❌ MongoDB Atlas connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;
