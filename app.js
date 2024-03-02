const express = require('express');
// const { GenerateAPI } = require('./src/utils/functions');
// const getK = require('./src/models/keys')
const config = require('./src/config/config.json');
const { RouterLoader } = require('./src/utils/functions');
// const data = require('./src/config/data.json')
require('./src/utils/mongoose')()

async function ss() {
    // App
    const app = express();
    var port = config.port || 3000;

    // ROUTES
    app.use(express.json())
    const routes = await RouterLoader();

    routes.forEach((router) => {
        app.use(router)
    })

    app.listen(port, () => { console.clear(); console.log(`Deployed at http://localhost:${port}/`) })
}
ss()