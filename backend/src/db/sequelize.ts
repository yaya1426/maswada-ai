import { Sequelize } from 'sequelize';
import { config } from '../config/env';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.dirname(config.sqlitePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.sqlitePath,
  logging: config.nodeEnv === 'development' ? console.log : false,
});

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync models in development (creates tables if they don't exist)
    if (config.nodeEnv === 'development') {
      await sequelize.sync({ alter: false });
      console.log('✅ Database models synchronized.');
    }
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
}
