const db = require('../db.js');

module.exports = async function setupDB(startYear, endYear){
    createTables()
    .then(()=>{
        addStadiums();
    })
    .then(()=>{
        for(let i = startYear; i <= endYear; i++){
            addTeams(i);
        }
    })
}

async function createTables() {
    await db.query(`
    CREATE TABLE IF NOT EXISTS stadiums(
        stadium_id int auto_increment,
        stadium_name varchar(40) unique,

        primary key(stadium_id)
    );
    `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS players(
        player_id bigint auto_increment,
        first_name varchar(14) not null,
        last_name varchar(20) not null,
        seasons_played int default 0,

        primary key(player_id)
    );
    `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS teams(
        team_id int auto_increment,
        team_name varchar(30),
        stadium_id int,
        conference varchar(20),
        division varchar(20),
        season varchar(6) not null,
        franchise_id int not null,

        primary key(team_id),
        foreign key (stadium_id) references stadiums(stadium_id)
    );
    `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS matches(
        match_id bigint auto_increment,
        home_id int,
        away_id int,
        match_status varchar(10) default 'PENDING',
        home_points int,
        away_points int,
        next_match bigint,
        match_time datetime not null default current_timestamp,
        round int not null default 0,
        
        primary key (match_id),
        foreign key (home_id) references teams(team_id),
        foreign key (away_id) references teams(team_id)
    );
    `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS roster(
        player_id bigint not null,
        team_id int,

        foreign key (player_id) references players(player_id),
        foreign key (team_id) references teams(team_id)
    );
    `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS articles(
        article_id int auto_increment,
        tags varchar(64),
        title varchar(40),
        content varchar(1000),

        primary key(article_id)
    );
    `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS match_event(
        event_id bigint not null auto_increment,
        match_id bigint not null,
        player_id bigint not null,
        period int not null default 0,
        stat_type varchar(10) default 'SCORE',
        value int,
        event_time time default '00:00:00',

        primary key(event_id),
        foreign key (match_id) references matches(match_id),
        foreign key (player_id) references players(player_id)
    );
    `);
}

async function addTeams(season) {
    const [teams] = await db.query("SELECT team_id,conference,division FROM teams WHERE season=?", [season]);
    if (!teams.length) {
        console.log(`[SETUP] Adding teams for season ${season}`)
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [0,"Reavers",1, "North", "Red", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [1,"Strikers",2, "North", "Red", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [2,"Bruisers",3, "North", "Red", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [3,"Raptors",4, "North", "Red", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [4,"Bulldozers",5, "North", "Red", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [5,"Breezers",6, "North", "White", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [6,"Racers",7, "North", "White", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [7,"Prowlers",8, "North", "White", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [8,"Jackrabbits",9, "North", "White", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [9,"Grapefruits",10, "North", "White", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [10,"Flippers",11, "South", "Blue", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [11,"Dashers",12, "South", "Blue", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [12,"Apexes",13, "South", "Blue", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [13,"Slickbacks",14, "South", "Blue", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [14,"Crawlers",15, "South", "Blue", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [15,"Bagels",16, "South", "Green", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [16,"Jumpers",17, "South", "Green", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [17,"Chaplains",18, "South", "Green", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [18,"Fire",19, "South", "Green", `${season}`]);
        db.query("INSERT INTO teams(franchise_id,team_name,stadium_id,conference,division,season) VALUES (?,?,?,?,?,?)", [19,"Sweepers",20, "South", "Green", `${season}`]);
    }
}

async function addStadiums(){
    const [stadiums] = await db.query("SELECT * FROM stadiums");
    if(!stadiums.length){
        console.log(`[SETUP] Adding stadiums`)
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["West End Stadium"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Carbonite Arena"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Berkshire Grandstand"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Watchers Stadium"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Smallpox Point"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Hokey Pokey Stadium"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Pullexus Grandstand"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Woldover Arena"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Deep Freeze Stadium"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Snatch Way Stadium"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Wheeler Way Stadium"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Knucklefist Arena"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Greenwraith Arena"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Chainmaster Point"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Rattlesnake Stadium"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Deepsea Stadium"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["East Atlantis Arena"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["West Atlantis Arena"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Huntington's Stadiums"]);
        db.query("INSERT INTO stadiums(stadium_name) VALUES (?)", ["Steampunk Arena"]);
    }
}