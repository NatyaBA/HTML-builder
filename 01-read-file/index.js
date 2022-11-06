const path = require('path');
const fs = require('fs');


const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

let str = '';

readStream.on('data', chunk => { 
          str = str + chunk;
});

readStream.on('end', () => {
           console.log(str)
});

readStream.on('error', error => {
    console.log('Error', error.message)
});