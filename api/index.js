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

router.post('/question/:questionId', (req, res) => {
  let answer = req.body.answer;
  mdb.collection('questions').findOneAndUpdate(
    { 'id': Number(req.params.questionId) },
    { $push: { 'answers': answer }},
    { upsert: true }
  ).then(() => { 
    res.send('OK'); 
  }).catch(error => {
    console.error(error);
    res.status(404).send('Bad Request');
  });
});

router.get('/players', (req, res) => {
  mdb.collection('players').find({})
    .project({
      playerName: 1,
      score: 1
    })
    .sort({ 
      score: -1 
    })
    .toArray()
    .then(items => {
      res.send(items);
    });
});

router.post('/players', (req, res) => {
  let player = req.body;
  mdb.collection('players').findOneAndUpdate(
    { 'playerName': player.playerName },
    { $inc: { 'score': player.score },
      $set: { 'completedQuestions': player.completedQuestions,
        'completedCategories': player.completedCategories }},
    { upsert: true }
  ).then(() => { 
    res.send('OK'); 
  }).catch(error => {
    console.error(error);
    res.status(404).send('Bad Request');
  });
});

router.get('/players/:playerName', (req, res) => {
  mdb.collection('players')
    .findOne({ playerName: req.params.playerName })
    .then(player => {
      res.send(player);
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad request');
    });
});

export default router;
