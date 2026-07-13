const mongoose = require('mongoose');
const http = require('http');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

async function runTests() {
  console.log('--- STARTING PROGRAMMATIC SECURITY VERIFICATIONS ---');
  
  // Test 1: Mongoose Connection & Password Hashing Verification
  console.log('\n[TEST 1] Verifying Password Encryption...');
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/skillhub';
  await mongoose.connect(uri);
  const users = await User.find({}).select('+password');
  let allHashed = true;
  for (const user of users) {
    const isHashed = bcrypt.getRounds(user.password) > 0;
    if (!isHashed) {
      console.error(`❌ User ${user.email} has plain text password!`);
      allHashed = false;
    }
  }
  if (allHashed && users.length > 0) {
    console.log(`✅ Passed: Checked ${users.length} users. All passwords are safely hashed with bcrypt.`);
  } else if (users.length === 0) {
    console.log('⚠️ Warning: No users found to check.');
  }

  // Test 2: HTTP Security Headers (Helmet Check)
  console.log('\n[TEST 2] Verifying Security Headers (Helmet)...');
  await new Promise((resolve) => {
    http.get('http://localhost:5000/', (res) => {
      const headers = res.headers;
      const xFrame = headers['x-frame-options'];
      const xContentType = headers['x-content-type-options'];
      const dnsPrefetch = headers['x-dns-prefetch-control'];
      
      console.log('  - X-Frame-Options:', xFrame || 'Missing');
      console.log('  - X-Content-Type-Options:', xContentType || 'Missing');
      console.log('  - X-DNS-Prefetch-Control:', dnsPrefetch || 'Missing');

      if (xFrame && xContentType) {
        console.log('✅ Passed: Helmet security headers are successfully set in API responses.');
      } else {
        console.error('❌ Failed: Helmet headers are missing or configured incorrectly.');
      }
      resolve();
    }).on('error', (err) => {
      console.error('❌ Failed: Local server is not running on port 5000. Start the server first.', err.message);
      resolve();
    });
  });

  // Test 3: Unauthorized Access Protection
  console.log('\n[TEST 3] Verifying API Endpoint Access Controls (Authorization)...');
  await new Promise((resolve) => {
    http.get('http://localhost:5000/api/v1/auth/me', (res) => {
      console.log(`  - GET /api/v1/auth/me without Token returned Status Code: ${res.statusCode}`);
      if (res.statusCode === 401) {
        console.log('✅ Passed: Access blocked for unauthenticated requests (returned 401).');
      } else {
        console.error(`❌ Failed: Expected 401 status code but received ${res.statusCode}.`);
      }
      resolve();
    }).on('error', (err) => {
      console.error('❌ Failed: Local server is not running.', err.message);
      resolve();
    });
  });

  // Test 4: Rate Limiting Verification
  console.log('\n[TEST 4] Verifying Rate Limiting Controls...');
  console.log('  - Simulating rapid sequential calls to /api/v1/health ...');
  let rateLimited = false;
  for (let i = 0; i < 110; i++) {
    await new Promise((resolve) => {
      http.get('http://localhost:5000/api/v1/health', (res) => {
        if (res.statusCode === 429) {
          rateLimited = true;
        }
        resolve();
      }).on('error', () => resolve());
    });
    if (rateLimited) break;
  }
  if (rateLimited) {
    console.log('✅ Passed: Rate limiter activated. Excess requests are blocked with Status Code 429.');
  } else {
    console.log('⚠️ Note: Rate limiting threshold of 100 requests not exceeded or local server not responding.');
  }

  await mongoose.disconnect();
  console.log('\n--- SECURITY VERIFICATION COMPLETE ---');
}

runTests().catch(console.error);
