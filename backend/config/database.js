import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false, // Disable SQL logging in the console
});

// Test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectDB };
