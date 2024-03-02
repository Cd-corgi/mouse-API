const mongoose = require('mongoose')
require('dotenv').config()

module.exports = async () => {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(process.env.mongo)
    } catch (e) {
        console.log(e)
    }
}