require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const express = require('express');
const app = express();
const getRouter = require('./get');
const postRouter = require('./post');
const deleteRouter = require('./delete');
const updateRouter = require('./update');
const User = require('./models/user.model');

app.use(async (req, res, next) => {
    const authorization = (req.headers.authorization || '').split(' ')[1];
    if (authorization) {
        const [username, password] = authorization.split(':');
        req.user = await User.findOne({ username, password });
    }
    next();
});

app.use(express.json());
app.use('/ads', getRouter);
app.use('/ads', postRouter);
app.use('/ads', deleteRouter);
app.use('/ads', updateRouter);

app.listen(4800, () => {
    console.log('server works');
})