
const db = require('../db.js');

module.exports = async function executePendingMatches() {
    const [matches] = await db.query("SELECT * FROM matches WHERE match_status=?", ["PENDING"]);

    console.log(matches[0]);
    console.log("Executing: " + matches.length + " matches");
    matches.forEach((match) => {
        match.home_points = randomInt(100);
        match.away_points = randomInt(90);
        if(match.home_points > match.away_points){
            match.match_status = "HOME_WIN";
        } else if(match.home_points < match.away_points){
            match.match_status = "HOME_LOSS";
        } else {
            match.match_status = "HOME_TIE";
        }
        db.query("UPDATE matches SET match_status=?,home_points=?,away_points=? WHERE match_id=?",
            [match.match_status, match.home_points, match.away_points, match.match_id]);
    })
    console.log(matches);
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}
