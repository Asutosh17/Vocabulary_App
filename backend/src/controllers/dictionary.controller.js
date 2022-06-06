const express = require('express');
const Vocabulary = require('../model/vocabulary.model')

const router = express.Router();

router.post("/", async (req, res) => {
//   console.log(req.body);
  try {
    // console.log(req.body,"here");
    const vocabulary = await Vocabulary.create(req.body);
    return res.status(201).send(vocabulary);
  } catch (err) {
    // console.log(req.body);
    return res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {

    var word = req.query.word
    var page = req.query.page || 1;
    var size = req.query.size || 10;
    if(word){
      const vocabulary = await Vocabulary.find({word:word}).lean().exec();
      return res.send(vocabulary);
    }
    const vocabulary = await Vocabulary.find().skip((page - 1) * size).limit(size).lean().exec();
    const totalpages = Math.ceil((await Vocabulary.find().countDocuments()) / size)

    return res.send({vocabulary , totalpages});
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id).lean().exec();

    return res.send(vocabulary);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router