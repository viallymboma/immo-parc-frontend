import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.NEXT_PUBLIC_MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let isConnected = false; // Track the connection status

export async function connectToDatabase() {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    const { connection } = await mongoose.connect(MONGODB_URI, {
      dbName: 'immo_parc_db', // Specify the database name
      // serverSelectionTimeoutMS: 30000, // 10 seconds timeout
      // socketTimeoutMS: 45000,         // 45 seconds for socket operations
    });

    isConnected = connection.readyState === 1;

    console.log('Connected to MongoDB:', connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}


export async function disconnectFromDatabase() {
  if (!isConnected) {
    console.log('No active MongoDB connection to disconnect');
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
}