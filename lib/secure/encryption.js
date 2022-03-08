const CryptoJS = require("crypto-js");

/**
 * Encrypt value argument
 * @param {string} value
 * @returns {Promise<*>}
 */
export async function tokenEncrypt(value) {
    return await CryptoJS.AES.encrypt(value, process.env.ENCRYPTION_KEY).toString();
}

/**
 * Decrypt value argument
 * @param {string} value
 * @returns {Promise<string>}
 */
export async function tokenDecrypt(value) {
    const byteDecrypted = await CryptoJS.AES.decrypt(value, process.env.ENCRYPTION_KEY);
    return byteDecrypted.toString(CryptoJS.enc.Utf8);
}