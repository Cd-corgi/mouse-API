module.exports = {
    /**
     * @returns A little API_KEY that will make you use the app
     */
    GenerateAPI() {
        let maxChars = 10;
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let finalKEY = '';
        for (let i = 0; i < maxChars; i++) {
            finalKEY += chars[Math.floor(Math.random() * chars.length)]
        }
        return finalKEY
    },

    /**
     * @param {String} key Provide the API_KEY and it check if the Key is valid in the system!
     * @param {Object} docs Provide the Document to explore the existing api keys! 
     * @returns Sends an object with the status code and reason if there's an error with the API_KEY
     */
    async validateAPIKEY(key, docs) {
        var responses = {}
        if (key.length < 1) { responses.valid = false; responses.reason = 'API_KEY NOT FOUND'; responses.status = 403 }
        if (!docs.some((v) => v.api == key)) { responses.valid = false; responses.reason = 'API_KEY NOT VALID OR NOT FOUND'; responses.status = 404 } else {
            responses.valid = true; responses.status = 200
        }
        return responses
    },

    /**
     * @returns A HEX code that it represents a color!
     */
    async generateColorCode() {
        let charMap = 'ABCDEF1234567890';
        var result = "";
        for (let i = 0; i < 6; i++) { result += charMap[Math.floor(Math.random() * charMap.length)] }
        return `#${result}`
    }
}