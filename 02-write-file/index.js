const path = require('path');
const fs = require('fs');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
const { stdin, stdout } = process;
stdout.write('Please, write the text: ');

stdin.on('data', data => {
    const dataStringified = data.toString();
    stdout.write('Text added');
    output.write(data);
    process.exit();
});