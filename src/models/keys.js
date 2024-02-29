const mongoose = require('mongoose')

const Schem = new mongoose.Schema({
    api: String,
    createdAt: { type: String, default: `${Date.now()}` }
})

module.exports = mongoose.model("API_KEY", Schem)