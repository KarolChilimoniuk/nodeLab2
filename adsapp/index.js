
const express = require('express');
const app = express();
const getRouter = require('./get');
const postRouter = require('./post');
const deleteRouter = require('./delete');
const updateRouter = require('./update');
const userRouter = require('./createUser');
const usersData = require('./users.json');


app.use(async (req, res, next) => {
   const [username, password] = req.headers.authorization.split(':');
   const user = usersData.find(user => user.password === password && user.username === username);
   if(user) {
       req.user = user;
       next();
   } else {
       res.sendStatus(401);
   }
});

app.use(express.json());
app.use('/ads', userRouter);
app.use('/ads', getRouter);
app.use('/ads', postRouter);
app.use('/ads', deleteRouter);
app.use('/ads', updateRouter);

app.listen(4800, () => {
    console.log('server works');
})