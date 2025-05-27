import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const filePath = path.join(process.cwd(), 'ips.txt');

  // Append IP with timestamp to ips.txt
  const line = `${new Date().toISOString()} - ${ip}\n`;

  try {
    await fs.appendFile(filePath, line);
  } catch (err) {
    console.error('Error writing IP:', err);
  }

  res.status(200).json({ success: true });
}
