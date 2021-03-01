const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
dotenv.config();
const app = express();
const cors = require('cors');


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'uploads')));

//routes
const userRouter = require('./src/routes/userRouter');
const adminRouter = require('./src/routes/adminRouter');
const categoryRouter = require('./src/routes/categoryRouter');
const productRouter = require('./src/routes/productRouter');
const cartRouter = require('./src/routes/cartRouter');
const initialDataRouter = require('./src/routes/admin/initialData.js');

// mongodb Connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.enwjy.mongodb.net/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
        // useFindAndModify: false 
    }
).then(() => {
    console.log(' ✅ Database connected')
})


app.use(cors());
app.use('/api', userRouter);
app.use('/api', adminRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', initialDataRouter);

app.listen(process.env.PORT, ()=> {
    console.log(` ✅ Server is running on http://localhost:${process.env.PORT}`)
})
