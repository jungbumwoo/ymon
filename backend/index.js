const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();

app.use(express.json()); 

//routes
const userRouter = require('./src/routes/userRouter');
const adminRouter = require('./src/routes/adminRouter');
const categoryRouter = require('./src/routes/categoryRouter');

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
app.use('/api', adminRouter);
app.use('/api', categoryRouter);

app.listen(process.env.PORT, ()=> {
    console.log(` ✅ Server is running on http://localhost:${process.env.PORT}`)
})
