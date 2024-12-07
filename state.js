import fs from 'fs';
import path from 'path';

// Path to a writable temporary directory
const countFilePath = path.join('/tmp', 'globalSuccessCount.json');

// Initialize the global success count
let globalSuccessCount = 0;

// Load the initial value from the file (if it exists)
if (fs.existsSync(countFilePath)) {
  try {
    const data = fs.readFileSync(countFilePath, 'utf8');
    globalSuccessCount = JSON.parse(data).count || 0;
  } catch (error) {
    console.error('Error reading global success count file:', error);
  }
}

// Update and persist the count
export const setGlobalSuccessCount = (value) => {
  globalSuccessCount = value;

  try {
    fs.writeFileSync(
      countFilePath,
      JSON.stringify({ count: globalSuccessCount }, null, 2)
    );
  } catch (error) {
    console.error('Error writing global success count file:', error);
  }
};

// Get the current count
export const getGlobalSuccessCount = () => globalSuccessCount;
