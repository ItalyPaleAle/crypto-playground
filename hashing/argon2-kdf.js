// Import the argon2 module
// https://www.npmjs.com/package/argon2
const argon2 = require('argon2')

// Need to wrap this in an immediately-invoked function expression (IIFE) because of async code
;(async function() {
    // Passphrase to use
    const passphrase = 'correct horse battery staple'

    // Salt: this is stored together with our encrypted file
    // Here it's base64-encoded, so we need to decode it
    const salt = Buffer.from('WiHmGLjgzYESy3eAW45W0XvQGy8he7taLWmqFXO5dJs', 'base64')

    // Derive a 128-bit key (16 bytes in length)
    const key128 = await deriveKey(passphrase, salt, 16)
    console.log('128-bit key:', key128.toString('base64'))

    // Derive a 256-bit key (32 bytes in length)
    const key256 = await deriveKey(passphrase, salt, 32)
    console.log('256-bit key:', key256.toString('base64'))
})()

// Derive a key from a given passphrase and salt
// Length needs to be 16 or 32 for a 128-bit or 256-bit key respectively
// Note this function is asynchronous (argon2.hash returns a Promise)
function deriveKey(passphrase, salt, length) {
    try {
        // Parameters for argon2
        const params = {
            // Key length
            hashLength: length,
            // Set to return the raw bytes and not a base64-encoded hash
            // (as we'd use for passwords instead)
            raw: true,
            // Pass the salt
            salt: salt,
            // We need to make them all parameters explicit just in case the default ones.
            // in the library changed:
            // if that happened, the same passphrase and salt would return a different key
            // and we wouldn't be able to decrypt our data encrypted with that key and
            // salt combination.
            // You can tweak these as needed, as long as you're consistent
            type: argon2.argon2id,
            timeCost: 3,
            memoryCost: 4096,
            parallelism: 1,
            version: 0x13,
        }
        // Derive and return the key
        return argon2.hash(passphrase, params)
    }
    catch (err) {
        console.error('An internal error occurred: ', err)
    }
}
