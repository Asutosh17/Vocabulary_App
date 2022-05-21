const express = require('express');
const vocabController = require('./src/controllers/vocab.controllers')
const dictController = require('./src/controllers/dict.controller')
const axios = require('axios')
var cors = require('cors');
const connect = require('./src/configs/db')
const port = process.env.PORT || 2345
// const bodyParser = require("body-parser")

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/vocab",vocabController)
app.use("/dict",dictController)

app.listen(port,async function () {
    try{
        await connect();
        console.log(`Listening on port ${port}`)
    }catch(e){
        console.log(e)
    }
})

