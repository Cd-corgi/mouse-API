const express = require('express');
const router2 = express.Router();
const getK = require('../models/keys')
const data = require('../config/data.json')
const { validateAPIKEY, generateColorCode } = require('../utils/functions');

const example = data;

router2.use((req, res, next) => {
    next();
});

router2.get("/api", async (req, res) => res.redirect("/"))

//#region Mice
router2.get("/api/mice", async (req, res) => {
    if (req.query.key) {
        var consultK = await getK.find({})
        const validateApi = await validateAPIKEY(req.query.key, consultK);
        if (validateApi.valid == false) return res.status(validateApi.status).send(validateApi.reason)
        if (req.query.id) {
            const getInfo = example[(req.query.id - 1)]
            const validateApi = await validateAPIKEY(req.query.key, consultK);
            if (validateApi.valid == false) return res.status(validateApi.status).send(validateApi.reason)
            if (!getInfo) return res.status(404).send({ messageType: "Not Found Info", message: "The provided ID don't belongs to an existing data!", guide: "/api/mice?api=<YOUR_API_KEY>&id=<ID>" })
            res.send(getInfo)
        } else { res.send(example) }
    } else { res.send({ messageType: "Warning", message: "The API KEY is required to use the aplication!", guide: "/api/mice?key=<YOUR_API_KEY>" }) }
});
router2.get("/api/mice/preview", (req, res) => {
    res.send(example[Math.floor(Math.random() * example.length)])
})
// Trying out
router2.get("/api/mice/test", (req, res) => {
    res.send({ messageType: `information`, message: "You can put the link like this!", guide: "<URL>/api/mice?key=<API-KEY>", content: example[Math.floor(Math.random() * example.length)] })
})
//#endregion Mice

//#region random-color
router2.get("/api/random-color", async (req, res) => {
    if (req.query.key) {
        var consultK = await getK.find({})
        const validateApi = await validateAPIKEY(req.query.key, consultK);
        if (validateApi.valid == false) return res.status(validateApi.status).send(validateApi.reason)
        res.send({
            generatedColor: generateColorCode(),
        })
    } else {
        res.send({ messageType: "Warning", message: "The API KEY is required to use the aplication!", guide: "/api/random-color?key=<YOUR_API_KEY>" })
    }
})

router2.get("/api/random-color/preview", async (req, res) => {
    res.send({ generatedColor: generateColorCode(), })
})
//#endregion random-color

module.exports = router2