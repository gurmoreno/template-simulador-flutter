const fs = require('fs');
let content = fs.readFileSync('src/components/DeviceSimulator.tsx', 'utf8');
const lines = content.split('\n');
const missing = lines.findIndex(l => l.includes('Nome Completo') && !l.includes('text-rose-500'));
console.log(missing);
