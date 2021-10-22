require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const route = require('./routes')




app.use(bodyParser.json());
app.use('/', route)





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running in the port ${port}`);
})