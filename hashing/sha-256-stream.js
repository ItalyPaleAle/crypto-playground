// Import the required libraries
const crypto = require('crypto')
const fs = require('fs')

// Open the file
const stream = fs.createReadStream('../testfiles/bassano-del-grappa-899733_1920.jpg')

// Calculate the hash by piping it through the hashing object
const hash = crypto
    .createHash('sha256')
    .on('error', (err) => {
        console.error('A error occurred', err)
    })
    .on('finish', () => {
        const result = hash.digest('hex')
        console.log('Hash is:', result)
    })
stream.pipe(hash)
