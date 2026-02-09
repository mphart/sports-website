const db = require('./db.js');

createTables();
// for(let i = 2000; i <= 2026; i++){
//     addTeams(i);
// }
// for(let i = 2000; i <= 2026; i++){
//     createSchedule(i, 13);
// }
for (let i = 2000; i <= 2026; i++) {
    executePendingMatches();
}

function createTables() {
    db.query(`
    CREATE TABLE IF NOT EXISTS stadiums(
        stadium_id int auto_increment,
        stadium_name varchar(40) unique,

        primary key(stadium_id)
    );
    `);
    db.query(`
    CREATE TABLE IF NOT EXISTS players(
        player_id bigint auto_increment,
        first_name varchar(14) not null,
        last_name varchar(20) not null,

        primary key(player_id)
    );
    `);
    db.query(`
    CREATE TABLE IF NOT EXISTS teams(
        team_id int auto_increment,
        team_name varchar(30),
        stadium_id int,
        conference varchar(20),
        division varchar(20),
        season varchar(6),

        primary key(team_id),
        foreign key (stadium_id) references stadiums(stadium_id)
    );
    `);
    db.query(`
    CREATE TABLE IF NOT EXISTS matches(
        match_id bigint auto_increment,
        home_id int,
        away_id int,
        match_status varchar(10) default 'PENDING',
        home_points int,
        away_points int,
        next_match bigint,
        match_time datetime not null default current_timestamp,
        
        primary key (match_id),
        foreign key (home_id) references teams(team_id),
        foreign key (away_id) references teams(team_id)
    );
    `);
    db.query(`
    CREATE TABLE IF NOT EXISTS roster(
        player_id bigint not null,
        team_id int,
        seasons_played int,

        foreign key (player_id) references players(player_id),
        foreign key (team_id) references teams(team_id)
    );
    `);
}

async function addTeams(season) {
    const [teams] = await db.query("SELECT team_id,conference,division FROM teams WHERE season=?", [season]);
    console.log(teams);
    if (!teams.length) {
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Reavers", "North", "Red", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Strikers", "North", "Red", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Bruisers", "North", "Red", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Raptors", "North", "Red", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Bulldozers", "North", "Red", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["United", "North", "White", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Racers", "North", "White", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Prowlers", "North", "White", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Jackrabbits", "North", "White", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Grapefruits", "North", "White", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Flippers", "South", "Blue", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Dashers", "South", "Blue", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Apexes", "South", "Blue", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Slickbacks", "South", "Blue", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Crawlers", "South", "Blue", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Bagels", "South", "Green", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Jumpers", "South", "Green", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Chaplains", "South", "Green", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Fire", "South", "Green", `${season}`]);
        db.query("INSERT INTO teams(team_name,conference,division,season) VALUES (?,?,?,?)", ["Sweepers", "South", "Green", `${season}`]);
    }
}

async function createSchedule(season, numMatches) {
    const [teams] = await db.query("SELECT team_id,conference,division FROM teams WHERE season=?", [season]);

    const schedule = [];

    // const divisions = [];
    // teams.forEach((team) =>{
    //     if(!divisions.includes(team.division)){
    //         divisions.push(team.division);
    //     }
    // })

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
        let poppedTeam = teams.splice(teams.length-1 /**index */, 1 /** num removed */)[0];
        teams.splice(1, 0, poppedTeam);
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

async function executePendingMatches() {
    const [matches] = await db.query("SELECT * FROM matches WHERE match_status=?", ["PENDING"]);

    console.log(matches[0]);
    console.log("Executing: " + matches.length + " matches");
    matches.forEach((match) => {
        match.home_points = randomInt(200);
        match.away_points = randomInt(190);
        match.match_status = match.home_points > match.away_points ? "HOME_WIN" : "HOME_LOSS";
        db.query("UPDATE matches SET match_status=?,home_points=?,away_points=? WHERE match_id=?",
            [match.match_status, match.home_points, match.away_points, match.match_id]);
    })
    console.log(matches);
}





/* Helpers */

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

function randomInt(max) {
    return Math.floor(Math.random() * max);
}
