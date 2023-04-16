require('dotenv').config();
const express = require('express')
const connectToDB = require('./config/db')
const Tweet = require('./models/Tweet')

const app = express();


// data comes from form
const manyTweets = [
    {
    title: "Sage Advice 123",
    body: "Friends, I am awesome and you are too",
    author: 'Arthur',
    likes: 20
},
{
    title: "Sage Advice 123",
    body: "Friends, I am awesome and you are too",
    author: 'Arthur',
    likes: 20
},
{
    title: "Is TI the Jadakiss of the South",
    body: "TI is severely underrated and we need to fix that expeditiously",
    author: "Arthur",
    likes: 40,
  },
  {
    title: "Crypto",
    body: "Friends, I have spent $2300 to be one of the first people to own a random jpeg and that makes me cool",
    author: "Arthur",
    likes: 162,
  },
  {
    title: "Confusion",
    body: "Friends, why do you just respond with the word `dislike`? Surely you mean to click the like button?",
    author: "Arthur",
    likes: -100,
  },
  {
    title: "Vespa",
    body: "Friends, my Vespa has been upgraded to run on old french fry oil. Its top speed is now 11 mph",
    author: "Arthur",
    likes: 2,
  },
  {
    title: "Licensed",
    body: "Friends, I am now officially licensed to teach yogalates. Like this to get 10% off a private lesson",
    author: "Arthur",
    likes: 3,
  },
  {
    title: "Water",
    body: "Friends, I have been collecting rain water so I can indulge in locally sourced raw water. Ask me how",
    author: "Arthur",
  },
];

app.get('/', (req,res)=>{
  /**
 * Finds and returns only the fields we are interested in
 */
Tweet.find({}, "title body")
.then((tweets) => {
    console.log(tweets)
    res.send(tweets)
})
.catch((error) => {
    console.error(error);
})
.finally(() => {
    console.log('this runs if the promise is completed or rejected')
})


})

app.get('/tweets/count', (req,res) => {
/**
 * Returns the amount of tweets that fit the parameters
 */
Tweet.countDocuments({})
.then((count) => {
    console.log(count)
    res.send({count: count})
})
.catch((error) => {
    console.error(error)
})
.finally(() => {
    console.log('Count docs done')
})
})

// Finds and returns a maximum of 2 tweets that contain 5 or more likes (sorted by title)
app.get('/tweets/sort', (req,res) => {
  Tweet.find({ likes: { $gte: 5 }}, "title") // asking to return the title
.limit(2)
.sort("title")
.exec() // returns a function promise
.then((tweets) => {
    console.log(tweets)
    res.send(tweets)
})
.catch((error) => {
    console.error(error)
})
.finally(() => {
    console.log('find() with parameters')
})
})

/**
 * Creates many tweets
 */
app.get('/seed', (req,res) => {
Tweet.insertMany(manyTweets)
// if database recieves data ".then()"
.then((tweets) => {
    // res.send('Tweet Created')
    console.log(tweets)
    res.redirect('/tweets')
})
.catch((error) => { // if database transaction fails log the error in console
    console.error(error)
})
.finally(() => {
    console.log('this runs if the promise is completed or rejected')
})

})

app.get('/tweets', (req,res)=>{
  /**
 * Finds all of the data in the database
 */
Tweet.find({})
.then((tweets) => {
    console.log(tweets)
    res.send(tweets)
})
.catch((error) => {
    console.error(error);
})
.finally(() => {
    console.log('this runs if the promise is completed or rejected')
})
})



//Search by tweets by title
app.get('/tweets/:title', (req,res)=>{
  /**
 * Finds all data with the title "Vespa"
 */
Tweet.find({ title: req.params.title})
.then((tweets) => {
    console.log(tweets)
    res.send(tweets)
})
.catch((error) => {
    console.error(error);
})
.finally(() => {
    console.log('this runs if the promise is completed or rejected')
})
})
//Search by tweets by author
app.get('/tweets/:author', (req,res)=>{

Tweet.find({ author: req.params.author})
.then((tweets) => {
    console.log(tweets)
    res.send(tweets)
})
.catch((error) => {
    console.error(error);
})
.finally(() => {
    console.log('this runs if the promise is completed or rejected')
})
})

  /**
 * Finds and returns all tweets with 30 amount of likes or more
 */
app.get('/trending', (req,res) => {
// Using operator to filter queries
Tweet.find({ likes: {$gte: 30 }})
.then((tweets) => {
    console.log(tweets)
    res.send(tweets)
})
.catch((error) => {
    console.error(error);
})
.finally(() => {
    console.log('this runs if the promise is completed or rejected')
})
})



/**
 * Finds data, updates it and returns it
 */
// Tweet.findOneAndUpdate(
//     { title: "Licensed" },
//     { sponsored: false },
//     { new: true } 
// )
// .then((tweet) => {
//     console.log(tweet)
// })
// .catch((error) => {
//     console.error(error);
// })
// .finally(() => {
//     console.log('Testing find one and update')
// })




const myFirstTweet = {
  title: "Hello from the other side :(",
  body: "",
  author: "Adele",
  category: "Programming",
  likes: 20,
}

app.post('/tweet', (req,res) => {
  Tweet.create(myFirstTweet)
  .then((tweets) =>{
    console.log(tweets)
    res.send(tweets)
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('Finished Creating Tweet')
  })
})

/**
 * Finds using title and removes it
 */
app.delete('/tweets/:title', (req,res) => {

Tweet.findOneAndRemove({ title: req.params.title})
.then((tweet) => {
    console.log(tweet)
})
.catch((error) => {
    console.error(error);
})
.finally(() => {
    console.log('this runs if the promise is completed or rejected')
})

})

  /**
   * Finds using ID and removes it
   */
app.delete('/tweets/:id', (req,res) => {

  Tweet.findByIdAndRemove(req.params.id)
  .then((tweet) => {
      console.log(tweet)
  })
  .catch((error) => {
      console.error(error);
  })
  .finally(() => {
      console.log('this runs if the promise is completed or rejected')
  })
  
  })

// Start up server at port 3000
    app.listen(3000, () => {
    console.log('Server is up!')
    connectToDB()
})