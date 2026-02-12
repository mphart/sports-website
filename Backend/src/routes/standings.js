const express = require('express');
const router = express.Router();

const db = require('../db');

router.get("/", async (req, res) => {
    try {
        const { season, group } = req.query;
        if (!season) season = new Date().getFullYear();
        if (!group) group = "league";
        console.log(`[API] Requesting ${group} standings from the ${season} season`);

        // get a list of teams from the desired season
        const [teams] = await db.query("SELECT team_name,conference,division FROM teams WHERE season=?", [season]);
        const teamStandings = {}
        teams.forEach(team => {
            teamStandings[team.team_name] = { 
                ...team, w: 0, l: 0, t: 0, pct: 0, ps: 0, pa: 0, net: 0, home: [0, 0, 0], away: [0, 0, 0], 
                div: [0, 0, 0], conf: [0, 0, 0], nonconf: [0, 0, 0], strk: "WO", l5: "" 
            }
        });

        // determine the win-loss record and other statistics of each team for the given season
        const [seasonMatches] = await db.query
            (`SELECT 
                matches.match_id, 
                home_teams.season,
                    matches.match_status,
                    home_teams.team_name AS home_team, 
                    away_teams.team_name AS away_team,
                    home_points,
                    away_points
                FROM matches
                    INNER JOIN teams AS home_teams ON matches.home_id = home_teams.team_id
                    INNER JOIN teams AS away_teams ON matches.away_id = away_teams.team_id
                WHERE home_teams.season=?
        `, [season]);
        seasonMatches.forEach((match) => {
            let home = match.home_team;
            let away = match.away_team;
            teamStandings[home].ps += match.home_points;
            teamStandings[home].pa += match.away_points;
            teamStandings[home].net += match.home_points - match.away_points;
            teamStandings[away].ps += match.away_points;
            teamStandings[away].pa += match.home_points;
            teamStandings[away].net += match.away_points - match.home_points;
            if (match.match_status == 'HOME_WIN') {
                teamStandings[home].w++;
                teamStandings[away].l++;
                teamStandings[home].home[0]++;
                teamStandings[away].away[1]++;
                if (teamStandings[home].division == teamStandings[away].division) {
                    teamStandings[home].div[0]++;
                    teamStandings[away].div[1]++;
                }
                if (teamStandings[home].conference == teamStandings[away].conference) {
                    teamStandings[home].conf[0]++;
                    teamStandings[away].conf[1]++;
                } else {
                    teamStandings[home].nonconf[0]++;
                    teamStandings[away].nonconf[1]++;
                }
            } else if (match.match_status == 'HOME_LOSS') {
                teamStandings[home].l++;
                teamStandings[away].w++;
                teamStandings[home].home[1]++;
                teamStandings[away].away[0]++;
                if (teamStandings[home].division == teamStandings[away].division) {
                    teamStandings[home].div[1]++;
                    teamStandings[away].div[0]++;
                }
                if (teamStandings[home].conference == teamStandings[away].conference) {
                    teamStandings[home].conf[1]++;
                    teamStandings[away].conf[0]++;
                } else {
                    teamStandings[home].nonconf[1]++;
                    teamStandings[away].nonconf[0]++;
                }
            } else if (match.match_status == 'HOME_TIE') {
                teamStandings[home].t++;
                teamStandings[away].t++;
                if (teamStandings[home].division == teamStandings[away].division) {
                    teamStandings[home].div[2]++;
                    teamStandings[away].div[2]++;
                }
                if (teamStandings[home].conference == teamStandings[away].conference) {
                    teamStandings[home].conf[2]++;
                    teamStandings[away].conf[2]++;
                } else {
                    teamStandings[home].nonconf[2]++;
                    teamStandings[away].nonconf[2]++;
                }
            }
        });

        // group teams based on the query
        const finalStandings = { group: [] };
        if (group == "league") {
            // add group
            finalStandings.group.push({
                name: "Sports League", subGroup: [{ name: "", teams: [] }]
            })
            // add teams to subgroups
            Object.keys(teamStandings).forEach((team) => {
                finalStandings.group[0].subGroup[0].teams.push(teamStandings[team]);
            })
            // sort teams by win
            finalStandings.group[0].subGroup[0].teams.sort((a,b) => b.w - a.w);
        }
        if (group == "conference") {
            // add groups
            finalStandings.group.push({
                name: "North", subGroup: [{ name: "", teams: [] }]
            })
            finalStandings.group.push({
                name: "South", subGroup: [{ name: "", teams: [] }]
            })
            // add teams to subgroups
            Object.keys(teamStandings).forEach((team) => {
                if(teamStandings[team].conference == "North"){
                    finalStandings.group[0].subGroup[0].teams.push(teamStandings[team]);
                }
                if(teamStandings[team].conference == "South"){
                    finalStandings.group[1].subGroup[0].teams.push(teamStandings[team]);
                }
            })
            // sort teams by wins
            finalStandings.group.forEach(g =>{
                g.subGroup[0].teams.sort((a,b) => b.w - a.w);
            })
        }
        if(group == "division"){
            // add group
            finalStandings.group.push({
                name: "North", subGroup: [
                    {name: "Red", teams: []},
                    {name: "White", teams: []}
                ]
            })
            finalStandings.group.push({
                name: "South", subGroup: [
                    {name: "Blue", teams: []},
                    {name: "Green", teams: []}
                ]
            })
            // add teams to subgroups
            Object.keys(teamStandings).forEach((team) => {
                if(teamStandings[team].division == "Red"){
                    finalStandings.group[0].subGroup[0].teams.push(teamStandings[team]);
                }
                if(teamStandings[team].division == "White"){
                    finalStandings.group[0].subGroup[1].teams.push(teamStandings[team]);
                }
                if(teamStandings[team].division == "Blue"){
                    finalStandings.group[1].subGroup[0].teams.push(teamStandings[team]);
                }
                if(teamStandings[team].division == "Green"){
                    finalStandings.group[1].subGroup[1].teams.push(teamStandings[team]);
                }
            })
            // sort teams by wins
            finalStandings.group.forEach(g =>{
                g.subGroup[0].teams.sort((a,b) => b.w - a.w);
                g.subGroup[1].teams.sort((a,b) => b.w - a.w);
            })
        }

        console.log(finalStandings);

        // send the final result
        res.status(200).send(finalStandings);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;