// Import the crypto library
const crypto = require('crypto')

// Message to hash
const message = 'Hello world!'

// Calculate the hash and output it as hex-encoded
const hash = crypto.createHash('sha256')
    .update(message)
    .digest('hex')
console.log('Hash is', hash)
