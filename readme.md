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

Gather 2 friends, login and click the ready button. When a question is displayed, enter a believable "fake" answer. The aim of the game is not only to answer the trivia question correctly but also to trick your opponent into selecting your "fake" answer. 

Scoring is 1000 points for selecting the correct answer and 1000 points for every opponent that selects your "fake" answer.

Note that the game auto-disconnects any user attempting to join the game once the room is full. (current capacity is 2 players)

### Project Planning

[User Stories](../master/planning/user-stories.md)

[Api Routes](../master/planning/rest-api-routes.md)

[Wireframes](../master/planning/wireframes)

[Waffle Planning Board](https://waffle.io/QuARK-0/alt-facts)

### Approach

This was our first group project at GA made in a sprint of 4 days. To make this an even more ambitious undertaking, not one member had any prior experience with [Socket.io](http://socket.io/). After writing the appropriate user stories, we wireframed a set of simple design flows and set to work. Immediately setback by socket.io, we first built a proof-of-concept app to ensure the viability of our idea.

While some groups prefer to split work between front and back-end. Our group preferred to split tasks by feature and be responsible for output entirely for that feature from front to end. In practice, this did not exactly work the way we intended due to our inexperience with socket.io. We were unable to modularize socket.js code and thus, as as we each wrote features, many merge conflicts occured. We had discussed and set up our ideal workflow surrounding github including detailed comments in our code. We realized as soon as one bug occurred, workflow is thrown out the window and a fixation on the bug occurs.

We also came across strange bugs that took hours to solve due to inexperience with socket.io. Basic aspects of Javascript such as adding and removing event listeners were bugging due to the fundamental nature of "real-time" communication.

Lastly, as to working in our first group environment, it was surprisingly easy to adapt and trust each group member to their individual tasks. While the experience was not entirely frustration free, not one member was unwilling to compromise or try the suggesstions of another group member.

## Next Steps

### Unsolved Issues
- Timer disappears after first question
- Crude disconnection handling of users attempting to join full game
- JQuery extend of Animate.css conflicts with game flow
- '#' that appends to /game path
- Perfect github workflow (so many merge conflicts?!)


### Planned Features
- Modularize socket.io handler
- Multiple rooms/game instances
- Game/room lobby
- Save game on disconnect and restore on reconnect
- Chat implementation for friendly "trash talk" to your opponent
- Better questions that more effectively incentives fun responses from players
- Better user notification after submitting "fake answer"
- Name of which user clicked which answer does not always display
- Randomize and better display answer choices
- Match history and archive score on profile page
- Delete user account
- More game modes
- Invite friends via email to join your game 
- View online users and invite other online users to join your game via browser modal
- Segment question categories
- Ability to choose game length
- Clean up code / move away from global variables
- Add JSDocs
- More color / style
- Logo / branding
- Improved mobile support (allow easy access to profile page)
