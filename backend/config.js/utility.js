import crypto from 'crypto';
const data = 'Refresh Token Secret'; // Example data to hash
const hash = crypto.createHash('sha256').update(data).digest('hex');
console.log('SHA-256 Hash:', hash);