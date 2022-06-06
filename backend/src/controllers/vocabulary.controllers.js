const express = require('express');
const axios = require('axios')

const router = express.Router();

router.get("/:id",async(req,res) => {
    let id = req.params.id
    try {
        let app_id = "7528d234"
        let app_key = "3230cf22c107d9e4db44dd316dccf74b"

        axios.get(`https://od-api.oxforddictionaries.com:443/api/v2/entries/en-gb/${id}`,{
            'headers': {app_key:app_key , app_id:app_id},
        }).then((response) => {
            console.log(response.data);
            return res.status(201).send(response.data);
        })
    }catch(err) {
        return res.status(500).send(err.message);
    }
});


module.exports = router;
