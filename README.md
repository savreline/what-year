# What Year Was That?

## API
* App makes calls to functions in `src/api.js` which then uses Axios to
make get or post calls to routes in `api/index.js` which in turn works
with the database via MongoClient
* `/question/:questionId` (get the question)
* `/question/:questionId` (post the latest guess)
* `/players` (get all players)
* `/players` (post a new plater)
* `/players/:playerName` (get the questions completed by the player)

### Fetching question
* Puts the question object on the state, sets state to QUESTION
* Resets the current difference, isCorrect flag and the number of tries
* Adds the question's id to the list of completed questions
