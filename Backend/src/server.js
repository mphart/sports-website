require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;

// TODO figure out cors
console.log(`CORS allowed origins is set to ${process.env.CLIENT_URL}`)
const cors = require('cors');
app.use(cors({
  origin: process.env.CLIENT_URL,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/** Custom Logging Middleware */
const consoleLogger = require('./middleware/consoleLogger');
const fileLogger = require('./middleware/fileLogger');
if(process.env.SERVER_CONSOLE_LOG == "True") {
  console.log('Using console logger');
  app.use(consoleLogger);
}
if(process.env.SERVER_FILE_LOG == "True") {
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