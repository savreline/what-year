import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.equal(null, err);
  client.db('whatyear').collection('questions').insertMany([
    { id: 1, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},
    { id: 2, category: 'Canadian History',
      question: 'In what year did Canada become a country?', answer: 1867},
    { id: 3, category: 'Canadian History',
      question: 'In what year did BC join Canada?', answer: 1871},
    { id: 4, category: 'Canadian History',
      question: 'In what year did Vancouver become a city?', answer: 1886},
    { id: 5, category: 'World History',
      question: 'In what year did the first man reach the south pole?', answer: 1911},
    { id: 6, category: 'Technology',
      question: 'In what year was the first version of Windows released?', answer: 1985},
    { id: 7, category: 'Technology',
      question: 'In what year was the first version of C released?', answer: 1972},
    { id: 8, category: 'Technology',
      question: 'In what year was the first version of C++ released?', answer: 1985},
    { id: 9, category: 'Technology',
      question: 'In what year was the first version of Java released?', answer: 1995},
    { id: 10, category: 'World History',
      question: 'In what year did World War Two start?', answer: 1945},
  ]).then(res => {
    console.info('contests', res.insertedCount);
  }).then(() => {
    client.close();
  });
});
