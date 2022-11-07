const path = require('path');
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;
const strDecoder = new StringDecoder('utf-8');
const { readdir } = require('fs/promises');

try {
  (async () => {

    const files = await readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
    const createFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    for (const file of files) {
      const source = path.join(path.join(__dirname, 'styles'), file.name);

      if (file.isFile() && path.extname(source) === '.css') {
        (fs.createReadStream(path.join(__dirname, './styles', file.name), 'utf-8')).pipe(createFile);
      }
    }

    await fs.promises.copyFile(path.join(__dirname, './template.html'), path.join(__dirname, './project-dist/index.html'))
    const data = await fs.promises.readFile(path.join(__dirname, `./project-dist/index.html`))
    let editedData = strDecoder.write(data)
    const htmlFiles = await fs.promises.readdir(path.join(__dirname, './components'), {withFileTypes: true})
    for (const file of htmlFiles) {
      const code = await fs.promises.readFile(path.join(__dirname, `./components/${file.name}`))
      const editedCode =  strDecoder.write(code)
      editedData = editedData.replace(`{{${file.name.split('.')[0]}}}`, editedCode)

      await fs.promises.writeFile(path.join(__dirname, `./project-dist/index.html`), editedData, err => {
        if(err) 
          return console.error(err);
      })
    }

    const copy = (file, copyFile) => {
      fs.mkdir(path.join(copyFile), {recursive: true}, () => {
        fs.promises.readdir(file, { withFileTypes: true})
        .then (files => files.forEach(el => {
          if(el.isDirectory()) {
            copy(path.join(file, `./${el.name}`), path.join(copyFile, `./${el.name}`))
          }
          if(el.isFile()) {
            fs.promises.copyFile(path.join(file, `./${el.name}`), path.join(copyFile, `./${el.name}`))
          }
        }))
        .catch((err) => console.error(err))
      })
    }
    copy(path.join(__dirname, `./assets`),  path.join(__dirname, `./project-dist/assets`))
  })()
} catch(err) {
    console.log(err)
}