// Import the argon2 module
// https://www.npmjs.com/package/argon2
const argon2 = require('argon2')

// Need to wrap this in an immediately-invoked function expression (IIFE) because of async code
;(async function() {
    // Passphrase to hash (see https://xkcd.com/936/)
    const passphrase = 'correct horse battery staple'

    try {
        // Parameters for argon2
        const params = {
            type: argon2.argon2id,
        }
        // Calculate the hash
        const hash = await argon2.hash(passphrase, params)
        console.log('Hash is', hash)

        // Verify the hash
        if (await argon2.verify(hash, passphrase, params)) {
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
