const db = require('../db.js');

module.exports = async function scheduleMatches(startYear, endYear, numMatches){
    for(let i = startYear; i <= endYear; i++){
        const matches = await createSchedule(i, numMatches);
    }
}


async function createSchedule(season, numMatches) {
    const [teams] = await db.query("SELECT team_id,conference,division FROM teams WHERE season=?", [season]);
    const schedule = [];

    // for now, just do a round robin
    shuffleArray(teams);

    let homeFirst = true;
    for (let i = 0; i < numMatches; i++) {
        for (let j = 0; j < teams.length / 2; j++) {
            let match = {
                home: homeFirst ? teams[j].team_id : teams[teams.length - j - 1].team_id,
                away: homeFirst ? teams[teams.length - j - 1].team_id : teams[j].team_id,
                
            }
            
            schedule.push(match)
        }
        homeFirst = !homeFirst;
        let removeIndex = teams.length-1;
        let numRemoved = 1;
        let poppedTeam = teams.splice(removeIndex, numRemoved)[0];
        let insertIndex = 1;
        teams.splice(insertIndex, 0, poppedTeam);
    }

    // shuffleArray(schedule);

    console.log("Adding schedule to database:");
    console.log(schedule);

    schedule.forEach((match) => {
        db.query(
            "INSERT INTO matches (home_id,away_id) VALUES (?,?)",
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
