const mongoose = require("mongoose");

const vocabularyschema = new mongoose.Schema({   
        word: {type:String , required: true},
        data: {type:Object , required: true},    
    })

module.exports = mongoose.model("vocabulary", vocabularyschema);

