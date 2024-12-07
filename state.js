import fs from 'fs';
import path from 'path';

// Path to the file storing the global count
const countFilePath = path.join(process.cwd(), 'src', 'globalSuccessCount.json');

// Load the initial value from the file (if it exists)
let globalSuccessCount = 0;

if (fs.existsSync(countFilePath)) {
  try {
    const data = fs.readFileSync(countFilePath, 'utf8');
    globalSuccessCount = JSON.parse(data).count || 0;
  } catch (error) {
    console.error('Error reading global success count file:', error);
  }
}

// Function to update the count
export const setGlobalSuccessCount = (value) => {
  globalSuccessCount = value;

  // Save the updated value to the file
  try {
    fs.writeFileSync(
      countFilePath,
      JSON.stringify({ count: globalSuccessCount }, null, 2)
    );
  } catch (error) {
    console.error('Error writing global success count file:', error);
  }
};

export const getGlobalSuccessCount = () => globalSuccessCount;
