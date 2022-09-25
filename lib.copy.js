const fs = require('fs');

fs.createReadStream('src/demo.html').pipe(fs.createWriteStream('dist/lib/demo.html'));