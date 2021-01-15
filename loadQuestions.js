import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.equal(null, err);
  client.db('whatyear').collection('questions').insertMany([
    /* 100s Technology */
    { id: 101, category: 'Technology',
      question: 'When was the first photograph taken?', answer: 1826},
    { id: 102, category: 'Technology',
      question: 'When did the first transatlantic wireless transmission between ' +
      'Poldhu, England and St. John\'s, Newfoundland took place?', answer: 1901},
    { id: 103, category: 'Technology',
      question: 'When did the first broadcast of colour TV take place?', answer: 1954},
    { id: 104, category: 'Technology',
      question: 'When was Sony CDP-101, the world\'s first commercially available ' +
      'CD player released?', answer: 1982},
    { id: 105, category: 'Technology',
      question: 'When were VHS tapes released for the first time?', answer: 1976},
    { id: 106, category: 'Technology',
      question: 'When was Dolly the Sheep cloned?', answer: 1996},
    { id: 107, category: 'Technology',
      question: 'When was the first antibiotic discovered?', answer: 1910},
    { id: 108, category: 'Technology',
      question: 'When was it discovered that oxygen and hydrogen make up water?', 
      answer: 1781},
    { id: 109, category: 'Technology',
      question: 'When did a US president first fly on an aircraft while in office?', 
      answer: 1933},
    { id: 110, category: 'Technology',
      question: 'When did a US president first travel by car while in office?', 
      answer: 1901},

    /* 200s Computer Science */
    { id: 201, category: 'Computer Science',
      question: 'When was the first version of Windows released?', answer: 1985},
    { id: 202, category: 'Computer Science',
      question: 'When was the first version of C released?', answer: 1972},
    { id: 203, category: 'Computer Science',
      question: 'When was the first version of C++ released?', answer: 1985},
    { id: 204, category: 'Computer Science',
      question: 'When was the first version of Java released?', answer: 1995},
    { id: 205, category: 'Computer Science',
      question: 'Ada Lovelace is considered by many to have written the first computer program. ' +
      'When was the program written?', answer: 1843},
    { id: 206, category: 'Computer Science',
      question: 'When was the Apple I desktop computer released?', answer: 1976},
    { id: 207, category: 'Computer Science',
      question: 'When was the first iPhone released?', answer: 2007},
    { id: 208, category: 'Computer Science',
      question: 'When did Google announce Gmail?', answer: 2004},
    { id: 209, category: 'Computer Science',
      question: 'When was the first 1 TB hardrive released?', answer: 2007},
    { id: 210, category: 'Computer Science',
      question: 'When did Intel release a 1 GHz CPU chip?', answer: 2000},

    /* 300s World History */
    { id: 301, category: 'World History',
      question: 'When did the first man reach the south pole?', answer: 1911},
    { id: 302, category: 'World History',
      question: 'When did the first man reach the north pole?', answer: 1909},
    { id: 303, category: 'World History',
      question: 'When did the first flyover the north pole take place?', answer: 1926},
    { id: 304, category: 'World History',
      question: 'When was the first successful ascent to the summit of Mount Everest?', 
      answer: 1953},
    { id: 305, category: 'World History',
      question: 'When did Europeans sight New Zealand for the first time?', answer: 1642},
    { id: 306, category: 'World History',
      question: 'When did India gain independence from the UK?', answer: 1947},
    { id: 307, category: 'World History',
      question: 'Magna Carta, which is Latin for "Great Charter of Freedoms" ' +
      'was established in in England in the year ...', answer: 1215},
    { id: 308, category: 'World History',
      question: 'When was Ottoman Empire dissolved and Turkey established as a country?', 
      answer: 1923},
    { id: 309, category: 'World History',
      question: 'When was Napolean defeated at the Battle of Waterloo?', answer: 1815},
    { id: 310, category: 'World History',
      question: 'When did World War Two start?', answer: 1939},
    
    /* 400s Canadian History */
    { id: 401, category: 'Canadian History',
      question: 'When did Canada become a country?', answer: 1867},
    { id: 402, category: 'Canadian History',
      question: 'When did British Columbia join Canada?', answer: 1871},
    { id: 403, category: 'Canadian History',
      question: 'Newfoundland and Labrador was the last province to join Canada. ' +
      'When did Newfoundland and Labrador join Canada?', answer: 1949},
    { id: 404, category: 'Canadian History',
      question: 'When was Vancouver established as a city?', answer: 1886},
    { id: 405, category: 'Canadian History',
      question: 'Manitoba was the first province to grant women the right to vote in Canada. ' +
      'When did that take place?',
      answer: 1916},
    { id: 406, category: 'Canadian History',
      question: 'When was the Canadian Charter of Rights and Freedoms introduced?', 
      answer: 1982},
    { id: 407, category: 'Canadian History',
      question: 'When did the latest referendum on Quebec\'s sovereignty take place?', 
      answer: 1995},
    { id: 408, category: 'Canadian History',
      question: 'When was universal health care introduced in Canada?', answer: 1966},
    { id: 409, category: 'Canadian History',
      question: 'When was the Canadian Pension Plan established?', answer: 1965},
    { id: 410, category: 'Canadian History',
      question: 'When were the speed limit signs converted from imperial ' +
      'to metric in Canada?', answer: 1977},

    /* 500s Russian History */
    { id: 501, category: 'Russian History',
      question: 'When did Rurik arrive in Novgorod ' + 
      '(this is commemorated in the "Millennium of Russia" monument)?', answer: 862},
    { id: 502, category: 'Russian History',
      question: 'When was Moscow established as a city?', answer: 1147},
    { id: 503, category: 'Russian History',
      question: 'When did Ivan the Terrible die?', answer: 1584},
    { id: 504, category: 'Russian History',
      question: 'When did the Romanov dynasty start its rule?', answer: 1613},
    { id: 505, category: 'Russian History',
      question: 'When was St. Petesburg established as a city?', answer: 1703},
    { id: 506, category: 'Russian History',
      question: 'When was the Crimean Khanate incorporated into the Russian Empire?', 
      answer: 1783},
    { id: 507, category: 'Russian History',
      question: 'When was serfdom abolished in Russia?', answer: 1861},
    { id: 508, category: 'Russian History',
      question: 'When did Russian sold Alaska to the USA?', answer: 1867},
    { id: 509, category: 'Russian History',
      question: 'When was the Trans-Siberian railway fully completed?', answer: 1916},
    { id: 510, category: 'Russian History',
      question: 'When did the Siege of Leningrad end?', answer: 1944}

  ]).then(res => {
    console.info('no. questions inserted:', res.insertedCount);
  }).then(() => {
    client.close();
  });
});
