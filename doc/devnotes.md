# Notes

## Development Setup
* confidental.js is ignored from the repo
* `npm i`
* add `.\node_modules\.bin` to path to use babel-node
* `npm start` or `node public\server.js`
* `npm run dev`

## Connecting to Mongo Atlas
Mongo Atlas -> Cluster -> Connect

## Cloning and Restoring MongoDB
* https://www.mongodbmanager.com/clone-mongodb-collection
* `.\mongodump --db=whatyear`
* `.\mongorestore -d whatyear dump/whatyear`
