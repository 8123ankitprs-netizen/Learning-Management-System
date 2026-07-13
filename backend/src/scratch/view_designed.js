const fs = require('fs');
const content = fs.readFileSync('frontend/src/pages/Home.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('designed')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
