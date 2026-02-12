const setupDB = require('./setup/db-builder.js');
const scheduleMatches = require('./setup/match-scheduler.js');
const executePendingMatches = require('./setup/match-executer.js');

const startYear = 2000;
const endYear = new Date().getFullYear();
const numMatches = 13;

setupDB(startYear, endYear)
// .then(async ()=>{
//     await scheduleMatches(startYear, endYear, numMatches);
// })
// .then(async ()=>{
//     await executePendingMatches();
// })