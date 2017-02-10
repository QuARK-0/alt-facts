# Alternative Facts - The Game :question::question:

##### A Party Game

## Team Members
[Qian Chen](https://github.com/Hesai69)

[Kora Colasuonno](https://github.com/trashdaemon)

[Ritwik Ruia](https://github.com/ritz1337)

[Andrew Maidah](https://github.com/amaidah)


## Technology Used

#### Front End: 
HTML | CSS | Javascript | jQuery | AJAX | Bulma.io

#### Back End:
Node.js | Express | Socket.io | MongoDB / Mongoose | Handlebars.js | JSService.io

## Getting Started

If you have ever played Psych or Fibbage, this is a similar game.

Gather 2 friends, login and click the ready button.

When a question is displayed, enter a believable "fake" answer.

The aim of the game is not only to answer the trivia question correctly but also to trick your opponent into selecting your "fake" answer. 

Scoring is 1000 points for selecting the correct answer and 1000 points for every opponent that selects your "fake" answer.

Note that the game auto-disconnects any user attempting to join the game once the room is full. (current capacity is 2 players)

### Project Planning

[User Stories](../master/planning/user-stories.md)

[Api Routes](../master/planning/rest-api-routes.md)

[Wireframes](../master/planning/wireframes)

[Waffle Planning Board](https://waffle.io/QuARK-0/alt-facts)

### Approach

This was our first group project at GA made in a sprint of 4 days. To make this an even more ambitious undertaking, not one member had any prior experience with [Socket.io](http://socket.io/).

We came up with the appropriate user stories, wireframed a simple design and set to work.

While some groups prefer to split work between front and back-end. Our group preferred to split tasks by feature and be responsible for output entirely for that feature from front to end. In practice, this did not exactly work the way we intended due to our inexperience with socket.io. We were unable to modularize socket.js code and thus, as as we each wrote features, many merge conflicts occured. We had discussed and set up our ideal workflow surrounding github including detailed comments in our code. We realized as soon as one bug occurred, workflow is thrown out the window and a fixation on the bug occurs.

## Next Steps

### Unsolved Issues
- Timer disappears after first question
- Crude disconnection handling of users attempting to join full game
- Animate.css conflicts with styling
- '#' that appends to /game path


### Planned Features
- Multiple rooms/game instances
- Game/room lobby
- Save game on disconnect and restore on reconnect
- Modularize socket.io handler
- Chat implementation for friendly "trash talk" to your opponent
- Better questions that more effectively incentives fun responses from players
- Match history and archive score on profile page
- Delete user account
- 

