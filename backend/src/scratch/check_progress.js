const mongoose = require('mongoose');
const { getProgress } = require('../controllers/enrollmentController');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/skillhub';
  await mongoose.connect(uri);
  
  const req = {
    user: { _id: "6a4c267d985f4303e4dd11e5" },
    params: { id: "6a4d0b03853a3bcec54ab461" }
  };
  
  const res = {
    statusCode: 200,
    status: function(code) { this.statusCode = code; return this; },
    json: function(data) {
      console.log('STATUS:', this.statusCode);
      console.log('DATA:', JSON.stringify(data, null, 2));
    }
  };

  try {
    await getProgress(req, res, (err) => { console.error('Next called with error:', err); });
  } catch (err) {
    console.error('Thrown error:', err);
  }

  await mongoose.disconnect();
}

run().catch(console.error);
