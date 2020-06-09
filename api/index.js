import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

let mdb;
let connectSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

MongoClient.connect(config.mongodbUri, connectSettings, (err, client) => {
  assert.equal(null, err);
  mdb = client.db('whatyear');
});

const router = express.Router();

/* Query the database to get the question.
* Arrive at this route from the axios call. */
router.get('/question/:questionId', (req, res) => { 
  mdb.collection('questions')
    .findOne({ id: Number(req.params.questionId)})
    .then(question => {
      res.send(question);
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad request');
    });
});

export default router;
