const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();

//routes
const userRouter = require('./src/routes/userRouter');

// mongodb Connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.enwjy.mongodb.net/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log(' ✅ Database connected')
})

app.use('/api', userRouter);

app.listen(process.env.PORT, ()=> {
    console.log(` ✅ Server is running on localhost:${process.env.PORT}`)
})
