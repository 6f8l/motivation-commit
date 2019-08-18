const crypto = require('crypto');
let uuid = require('node-uuid');
require('date-utils');

exports.generateHashedId = function() {
    let planeTxt = ((new Date()).toFormat("YYYYMMDDHH24MISS")) + uuid.v4();
    let crypto_key = process.env.CRYPTO_KEY;
    const cipher = crypto.createCipher('aes-128-cbc-hmac-sha256', crypto_key);
    cipher.update(planeTxt, 'utf8', 'hex');
    let cipheredText = cipher.final('hex');
    return cipheredText
}