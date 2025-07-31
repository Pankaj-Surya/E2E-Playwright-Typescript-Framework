import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to logs/playwright-logs.json
const logFilePath = path.join(__dirname, '../logs/playwright-logs.json');

console.log("Log file Path :-> "+logFilePath)

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Exported function to log JSON entries
export const logToFile = (log: object): void => {
  try {
    fs.appendFileSync(logFilePath, JSON.stringify(log) + '\n');
    console.log('✅ Successfully wrote to log:', log);
  } catch (err) {
    console.error('❌ Failed to write log entry:', err);
  }
};