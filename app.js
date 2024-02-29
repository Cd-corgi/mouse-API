/* eslint-disable no-undef */
const express = require('express');
const path = require('path')
const { GenerateAPI, validateAPIKEY } = require('./src/utils/functions');
const getK = require('./src/models/keys')
const config = require('./src/config/config.json')
const data = require('./src/config/data.json')
require('./src/utils/mongoose')()

async function app() {
    // App
    const app = express();
    var port = config.port || 3000;
    app.use(express.json());
    const example = data;
    app.get("/", (req, res) => { res.redirect("/home") });
    app.get("/home", (req, res) => { res.sendFile(path.join(__dirname, './src/views', 'index.html')); })
    app.get("/api", async (req, res) => {
        if (req.query.key) {
            var consultK = await getK.find({})
            const validateApi = await validateAPIKEY(req.query.key, consultK);
            if (validateApi.valid == false) return res.status(validateApi.status).send(validateApi.reason)
            if (req.query.id) {
                const getInfo = example[(req.query.id - 1)]
                const validateApi = await validateAPIKEY(req.query.key, consultK);
                if (validateApi.valid == false) return res.status(validateApi.status).send(validateApi.reason)
                if (!getInfo) return res.status(404).send({ messageType: "Not Found Info", message: "The provided ID don't belongs to an existing data!", guide: "/api?api=<YOUR_API_KEY>&id=<ID>" })
                res.send(getInfo)
            } else { res.send(example) }
        } else { res.send({ messageType: "Warning", message: "The API KEY is required to use the aplication!", guide: "/api?key=<YOUR_API_KEY>" }) }
    });
    // Preview
    app.get("/api/preview", (req, res) => {
        res.send(example[Math.floor(Math.random() * example.length)])
    })
    // Trying out
    app.get("/api/test", (req, res) => {
        res.send({ messageType: `information`, message: "You can put the link like this!", guide: "<URL>/api?key=<API-KEY>", content: example[Math.floor(Math.random() * example.length)] })
    })
    // Register a new APIKEY
    app.post("/api/register", async (req, res) => {
        if (req.query.pwd === config.pwd) {
            try {
                var newAPI = GenerateAPI()
                new getK({ api: newAPI }).save().then(() => { var good = { status: 200, key: newAPI }; res.send(good) })
            } catch (error) { res.status(500).send("An error just affected the mices!") }
        } else {
            res.status(403).send({ messageType: "Forbidden", message: "This module should be authenticated to continue!" })
        }
    });
    app.listen(port, () => console.log(`Deployed at http://localhost:${port}/`))
}
app()