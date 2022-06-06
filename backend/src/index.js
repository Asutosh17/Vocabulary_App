const express = require('express');
const connect = require('./configs/db')
const port = process.env.PORT || 5000

var cors = require('cors');

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
};

const vocabController = require('./controllers/vocabulary.controllers')
const dictController = require('./controllers/dictionary.controller')

const app = express();

app.use(cors(corsOptions));
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

