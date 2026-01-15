import { sequelize } from './sequelize';
import '../models/Note'; // Import to register model

async function sync() {
  try {
    console.log('🔄 Syncing database...');
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database synchronized successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    process.exit(1);
  }
}

sync();
