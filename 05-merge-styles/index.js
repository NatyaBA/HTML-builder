const path = require('path');
const fs = require('fs/promises');
const { readdir } = require('fs/promises');

(async () => {
  try {
    const files = await readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
    const createFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
    for (const file of files) {
      const source = path.join(path.join(__dirname, 'styles'), file.name);

      if (file.isFile() && path.extname(source) === '.css') {
        (createReadStream(path.join(files, file.name), 'utf-8')).pipe(createFile);
      }
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
})();