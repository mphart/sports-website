const express = require('express');
const app = express();

const env = require('../process.env');

const port = env.SERVER_PORT;

const cors = require('cors');
app.use(cors);

/** Custom Logging Middleware */
const consoleLogger = require('./middleware/consoleLogger');
const fileLogger = require('./middleware/fileLogger');
if(env.SERVER_CONSOLE_LOG) {
  console.log('Using console logger');
  app.use(consoleLogger);
}
if(env.SERVER_FILE_LOG) {
  console.log('Using file logger');
  app.use(fileLogger);
}

/** Backend routes */
const teamRouter = require('./routes/teams');
const userRouter = require('./routes/users');
const standingsRouter = require('./routes/standings');
const scheduleRouter = require('./routes/schedules');
app.use('/teams', teamRouter);
app.use('/users', userRouter);
app.use('/standings', standingsRouter);
app.use('/schedules', scheduleRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});