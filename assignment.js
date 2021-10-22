require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const routes = require('./routesAssignment/assignment-route.js')


app.use(bodyParser.json());
app.use('/', routes)








const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running in the port ${port}`);
})