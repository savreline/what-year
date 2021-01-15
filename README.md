# What Year Was That?

"What Year Was That?" is a trivia game where users earn points based on how closely they are able to guess the years in which various world history events took place. Correctness of a user's guess relative to other user's guesses is shown on a bar chart. 

The game is a single web application built using the MERN stack. Communication with the database is via a server-side API. Bar charts are made using D3.js. The project is deployed on an AWS EC2 instance running Ubuntu 18.04.5 and Apache2 web server and on MongoDB Atlas. Deployed version can be viewed at: [whatyear.savreline.com](https://whatyear.savreline.com)

## Packages
* **Production Dependencies:** React.js, Express.js, MongoDB, D3.js, Axios, Bootstrap
* **Development Dependencies:** Babel, Webpack, ESLint, nodemon

## API
* GET: `/question/:questionId` - fetches the question with the given questionId
* POST: `/question/:questionId` - adds the latest user's guess to the question with the given questionId
* GET: `/question/` - fetches the entire question data set (for testing purposes only)
* GET: `/players` - fetches the entire player data set (for the leader board)
* POST: `/players` - adds a new player's data to the player data set
* GET: `/players/:playerName` - used for fetching the list of questions completed by the player

## Additional Information
[Screenshots](doc/screenshots.md) \
[Design Notes](doc/design.md) \
[Development Notes](doc/devnotes.md)

## Acknowledgements
The [jscomplete.com](https://jscomplete.com) full-stack Javascript course was used as a starting point. Additional resources that were particularly helpful when working with D3.js are cited at the top of the [BarChart component](src/components/BarChart.js).
