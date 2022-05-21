const mongoose = require("mongoose");

const vocabschema = new mongoose.Schema(
    {   
        word: {type:String , required: true},
        data: {type:Object , required: true},    
    }

)

module.exports = mongoose.model("vocab", vocabschema);

