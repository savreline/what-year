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
* Implement server-side rendering
* Improve the look of pop-up alert boxes
* Add more form validation (e.g. validate that submitted answers are actually numeric)
* Look into decreasing the amount of information kept on the state
* Work on a user authentication system

## Known Bugs
* Incorrent number of total questions is shown whenever a player picks a category in which there are less than 10 unanswered questions remaining
* Buttons remain active after being pressed and released
* Should refetch the latest answer data immediately prior to displaying the bar chart

## Connecting to Mongo Atlas
Mongo Atlas -> Cluster -> Connect

## Cloning and Restoring MongoDB
* https://www.mongodbmanager.com/clone-mongodb-collection
* `.\mongodump --db=whatyear`
* `.\mongorestore -d whatyear dump/whatyear`
