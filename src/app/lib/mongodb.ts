import mongoose from 'mongoose';

const MONGODB_URI =
  'mongodb+srv://mbomadesir:gt1xQPboLPYGv4cs@immoparc.jigjs.mongodb.net/immo_parc_db';
  // 'mongodb://localhost:27017/immo_parc_db';

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
    });

    isConnected = connection.readyState === 1;

    console.log('Connected to MongoDB:', connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
