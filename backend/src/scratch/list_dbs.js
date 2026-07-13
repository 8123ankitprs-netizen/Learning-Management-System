require('dotenv').config();
const mongoose = require('mongoose');

const listDbs = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/skillhub');
    const adminDb = conn.connection.db.admin();
    const dbsList = await adminDb.listDatabases();
    console.log('--- ALL DATABASES IN MONGODB ---');
    for (let db of dbsList.databases) {
      console.log(`DB Name: ${db.name}`);
      const dbConnection = mongoose.createConnection(`mongodb://localhost:27017/${db.name}`);
      await new Promise((resolve) => dbConnection.once('open', resolve));
      const collections = await dbConnection.db.listCollections().toArray();
      console.log('  Collections:');
      for (let col of collections) {
        const count = await dbConnection.db.collection(col.name).countDocuments();
        console.log(`    - ${col.name} (${count} docs)`);
      }
      await dbConnection.close();
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

listDbs();
