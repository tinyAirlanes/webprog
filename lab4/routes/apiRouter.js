const apiRouter = require('express').Router();
const userRouter = require('./users.js');
const courseRouter = require('./courses.js')
const mediaRouter = require('./mediaRouter');

apiRouter.use('/users', userRouter);
apiRouter.use('/courses', courseRouter);
apiRouter.use('/media', mediaRouter);

module.exports = apiRouter;