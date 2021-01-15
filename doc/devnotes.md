# Development Notes

## Development Setup
* `confidental.js` is ignored from the repo and contains the connection information for MongoDB Atlas
* add `.\node_modules\.bin` to path to use babel-node
* `npm i`
* `npm start` or `node public\server.js`
* `npm run dev`

## Testing
The `/tests` folder contains a page which generates the D3.js bar charts for all questions for a quick visual inspection.

## TODO
* Change the HTML page layout and Express.js to use the EJS view engine
* Move the compiled `server.js` out of the public directory
* Work on a user authentication system

## Connecting to Mongo Atlas
Mongo Atlas -> Cluster -> Connect

## Cloning and Restoring MongoDB
* https://www.mongodbmanager.com/clone-mongodb-collection
* `.\mongodump --db=whatyear`
* `.\mongorestore -d whatyear dump/whatyear`
