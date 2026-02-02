const db = require('./db.js');

// createSchedule(2026, 11);
executeSchedule(2026);

async function executeSchedule(season){
    const [matches] = await db.query("SELECT * FROM matches WHERE status=?", ["PENDING"]);

    console.log(matches[0]);
    console.log(matches.length);
    matches.forEach((match)=>{
        match.home_points = randomInt(200);
        match.away_points = randomInt(190);
        match.status = "COMPLETE"
        db.query("UPDATE matches SET status=?, home_points=?, away_points=? WHERE match_id=?", 
            [match.status, match.home_points, match.away_points, match.match_id]);
    })
    console.log(matches);
}

async function createSchedule(season, numMatches){
    const [teams] = await db.query("SELECT id,conference,division FROM teams WHERE season=?", [season]);
    
    const schedule = [];

    // const divisions = [];
    // teams.forEach((team) =>{
    //     if(!divisions.includes(team.division)){
    //         divisions.push(team.division);
    //     }
    // })

    // for now, just do a round robin
    shuffleArray(teams);

    for(let i = 0; i < numMatches; i++){
        let homeFirst = true;
        for(let j = 0; j < teams.length / 2; j++){
            let match = {
                home: homeFirst ? teams[j].id : teams[j+teams.length / 2].id,
                away: homeFirst ? teams[j+teams.length / 2].id : teams[j].id,
            }
            homeFirst = !homeFirst;

            schedule.push(match)
        }
        let poppedTeam = teams.splice(teams.length/2, 1)[0];
        console.log(poppedTeam);
        teams.splice(1, 0, poppedTeam);
    }

    // shuffleArray(schedule);

    console.log("Adding schedule to database:");
    console.log(schedule);

    schedule.forEach((match)=>{
        db.query(
            "INSERT INTO matches (home_team,away_team) VALUES (?,?)",
            [match.home, match.away]
        );
    })
}

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function randomInt(max){
    return Math.floor(Math.random() * max);
}