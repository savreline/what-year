import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.equal(null, err);
  client.db('whatyear').collection('questions').insertMany([
    /* 100s Technology */
    { id: 101, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},
    { id: 102, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},
    { id: 103, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},
    { id: 104, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},
    { id: 105, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},
    { id: 106, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},
    { id: 107, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},
    { id: 108, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},
    { id: 109, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},
    { id: 110, category: 'Technology',
      question: 'In what year was the first photograph taken?', answer: 1826},

    /* 200s Computer Science */
    { id: 201, category: 'Computer Science',
      question: 'In what year was the first version of Windows released?', answer: 1985},
    { id: 202, category: 'Computer Science',
      question: 'In what year was the first version of C released?', answer: 1972},
    { id: 203, category: 'Computer Science',
      question: 'In what year was the first version of C++ released?', answer: 1985},
    { id: 204, category: 'Computer Science',
      question: 'In what year was the first version of Java released?', answer: 1995},
    { id: 205, category: 'Computer Science',
      question: 'In what year was the first version of Windows released?', answer: 1985},
    { id: 206, category: 'Computer Science',
      question: 'In what year was the first version of C released?', answer: 1972},
    { id: 207, category: 'Computer Science',
      question: 'In what year was the first version of C++ released?', answer: 1985},
    { id: 208, category: 'Computer Science',
      question: 'In what year was the first version of Java released?', answer: 1995},
    { id: 209, category: 'Computer Science',
      question: 'In what year was the first version of Windows released?', answer: 1985},
    { id: 210, category: 'Computer Science',
      question: 'In what year was the first version of C released?', answer: 1972},

    /* 300s World History */
    { id: 301, category: 'World History',
      question: 'In what year did the first man reach the south pole?', answer: 1911},
    { id: 302, category: 'World History',
      question: 'In what year did World War Two start?', answer: 1939},
    { id: 303, category: 'World History',
      question: 'In what year did the first man reach the south pole?', answer: 1911},
    { id: 304, category: 'World History',
      question: 'In what year did World War Two start?', answer: 1939},
    { id: 305, category: 'World History',
      question: 'In what year did the first man reach the south pole?', answer: 1911},
    { id: 306, category: 'World History',
      question: 'In what year did World War Two start?', answer: 1939},
    { id: 307, category: 'World History',
      question: 'In what year did the first man reach the south pole?', answer: 1911},
    { id: 308, category: 'World History',
      question: 'In what year did World War Two start?', answer: 1939},
    { id: 309, category: 'World History',
      question: 'In what year did the first man reach the south pole?', answer: 1911},
    { id: 310, category: 'World History',
      question: 'In what year did World War Two start?', answer: 1939},
    
    /* 400s Canadian History */
    { id: 401, category: 'Canadian History',
      question: 'In what year did Canada become a country?', answer: 1867},
    { id: 402, category: 'Canadian History',
      question: 'In what year did BC join Canada?', answer: 1871},
    { id: 403, category: 'Canadian History',
      question: 'In what year did Vancouver become a city?', answer: 1886},
    { id: 404, category: 'Canadian History',
      question: 'In what year did Canada become a country?', answer: 1867},
    { id: 405, category: 'Canadian History',
      question: 'In what year did BC join Canada?', answer: 1871},
    { id: 406, category: 'Canadian History',
      question: 'In what year did Vancouver become a city?', answer: 1886},
    { id: 407, category: 'Canadian History',
      question: 'In what year did Canada become a country?', answer: 1867},
    { id: 408, category: 'Canadian History',
      question: 'In what year did BC join Canada?', answer: 1871},
    { id: 409, category: 'Canadian History',
      question: 'In what year did Vancouver become a city?', answer: 1886},
    { id: 410, category: 'Canadian History',
      question: 'In what year did Canada become a country?', answer: 1867},

  ]).then(res => {
    console.info('contests', res.insertedCount);
  }).then(() => {
    client.close();
  });
});
