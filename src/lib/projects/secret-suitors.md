_Secret Suitors_ was a prototype built for Pod People, a podcasting company based in Los Angeles, California. They wanted to leverage their audio experience for a casual game, and contracted _Something Mighty_ to do so. The premise of the game is that the player has come in the possession of a mysterious answering machine that allows them to hear voice messages from suitors in the past.

As the only developer on the project, I was responsible for building the client, the backend, and deploying everything to the website. Pod People provided the audio clips, and another contractor did the UI design.

# In-game experience

![Players listen to an audio message and then try to guess who's on the line][1]

The UI design was optimized for a phone layout, since I anticipated that most casual players would want to play the game on their phone or tablet. I leveraged web technology to ensure the same experience on PC, Android, and iPhone.

Since the client wanted to iterate quickly, I used [Svelte](https://svelte.dev/) on the frontend. Svelte allowed me to split the application into separate components, but still share global state when needed. This was a huge boon for iterating on a game prototype where requirements are often not set in stone. To complete the stack, I added [howler.js](https://howlerjs.com/) for audio playback, and [Anime.js](https://animejs.com/) for animations.

# Backend

I used Payload CMS to build a custom backend for the game. Payload is a so-called "headless" content management system, where you set up your own collections and global state. Audio clips are stored in their own collection, and link together with a suitor definition to create soundscape. These are then combined with a calendar date to create an "episode". Normalizing the database like this allowed for the content to be reused

# Automatic subtitles

A hard requirement for accessibility was that all audio clips needed subtitles. Whether that's because players are Deaf, or because they're playing in a setting with too much environment noise, subtitles are a must-have. I leveraged the speech-to-text API from [ElevenLabs](https://elevenlabs.io/) to automatically create subtitles using generative AI.

# Deployment

I deployed both client and backend using Docker images. These are then uploaded to a VPS. I also set up GitHub Actions to automatically deploy the image whenever I pushed a change. Client, backend, and the database communicate on a virtual network and are accessed with NGINX as a reverse proxy.

# Reception

In the "friends and family" test, a solid majority players said they had fun and would play the game again. Pod People were very pleased with these results, and are investigating their next steps.

[1]: SS_Gameplay.png '{ "orientation": "left" }'
