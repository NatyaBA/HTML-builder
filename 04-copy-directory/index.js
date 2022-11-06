const path = require('path');
const fs = require('fs/promises');

(async () => {
try {
    const files =  await fs.readdir(path.join(__dirname, 'files'));
    await fs.mkdir(path.join(__dirname, 'files-copy'));
    for (const file of files) {
      const source = path.join(path.join(__dirname, 'files'), file);
      const destination = path.join(path.join(__dirname, 'files-copy'), file);
      await fs.copyFile(source, destination);
    }    
    console.log('Create files-copy');
  } catch (err) {
    console.error(err);
  }
})();