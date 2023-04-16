const mongoose = require('mongoose')
// Global Config
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;


module.exports = function() {
    // connection to mongoDB
    mongoose.set('strictQuery', true)
    mongoose.connect(mongoURI, { useNewUrlParser: true,
    useUnifiedTopology: true})

    
        // setTimeout(() => {
        //     db.close();
        // }, 5000)

    db.on('error', (error) => console.error(error)) //listening for error on connection
    db.on('open', () => console.log('Connected to MongoDB'))
    db.on('close', () => console.log('MongoDB Disconnected'))
}