// Import the required modules
const crypto = require('crypto')
const {promisify} = require('util')

// Promisify the two methods
const scrypt = promisify(crypto.scrypt)
const randomBytes = promisify(crypto.randomBytes)

// Need to wrap this in an immediately-invoked function expression (IIFE) because of async code
;(async function() {
    // Passphrase to hash (see https://xkcd.com/936/)
    const passphrase = 'correct horse battery staple'

    // Salt
    // Generate a new salt for each passphrase, then
    // store it together with the generated hash
    // Must be 16 bytes or more
    const saltLength = 16
    let salt = await randomBytes(saltLength)

    try {
        // Calculate the hash
        let hash = await scrypt(passphrase, salt, 32)
        console.log('Hash:', hash.toString('hex'))
        console.log('Salt:', salt.toString('hex'))

        // Store this value in your database
        // (Encode it as hex or base64 if needed)
        const stored = Buffer.concat([salt, hash]).toString('base64')
        console.log('Store value:', stored)

        // Retrieve salt and hash from the stored value in the database
        const buf = Buffer.from(stored, 'base64')
        salt = buf.slice(0, saltLength)
        hash = buf.slice(saltLength)

        // Verify the hash
        const verifyHash = await scrypt(passphrase, salt, 32)
        if (verifyHash.compare(hash) === 0) {
            console.log('Passphrases match')
        }
        else {
            console.log('Passphrases don\'t match')
        }
    }
    catch (err) {
        console.error('An internal error occurred: ', err)
    }
})()
