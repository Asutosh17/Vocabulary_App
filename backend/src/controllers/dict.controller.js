const express = require('express');
const Vocab = require('../model/vocab.model')

const router = express.Router();

router.post("/", async (req, res) => {
//   console.log(req.body);
  try {
    // console.log(req.body,"here");
    const vocab = await Vocab.create(req.body);
    return res.status(201).send(vocab);
  } catch (err) {
    // console.log(req.body);
    return res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    var page = req.query.page || 1;
    var size = req.query.size || 10;
    const vocab = await Vocab.find().skip((page - 1) * size).limit(size).lean().exec();
    const totalpages = Math.ceil((await Vocab.find().countDocuments()) / size)

    return res.send({vocab , totalpages});
  } catch (err) {
    // console.log(req.body);
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vocab = await Vocab.findById(req.params.id).lean().exec();

    return res.send(vocab);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router