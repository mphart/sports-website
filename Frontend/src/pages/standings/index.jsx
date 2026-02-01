import {useState, useEffect} from 'react'

import {PageHeader} from '../../components/section'

// temporary data until server works
import tempStandings from '../../assets/temp-standings'

export default function StandingsPage({year, group}){
    const [standings, setStandings] = useState(tempStandings)
    
    const apiPath = `http://localhost:8080/standings?year=${year}&group=${group}`

    useEffect(()=>{
        console.log(standings)
        // getStandings()
    })

    async function getStandings(){
        try{
            const response = await fetch(apiPath)
            const result = response.json();
            console.log(result)
            setStandings(result)
        } catch(e){
            console.error(e)
        }
    }

    return(
        <div className="bg-gray-300">
            <div className="ml-20 mr-20 pb-10 bg-gray-100">
                <PageHeader>Standings</PageHeader>
                {standings.conferences.map((conference) => {
                    return(
                    <>
                        <h1 key={conference.name} className="text-xl font-bold">{conference.name}</h1>
                        <div key={conference.name.toUpperCase()} className="grid grid-rows-[2fr repeat(3, 1fr) repeat(9, 1.5fr) 1fr 1fr]">
                            {conference.teams.forEach((team)=>{
                                const teamStandings = standings.teams.filter((t) => t.name == team)[0]
                                return Object.keys(teamStandings).forEach((k) => {
                                    console.log(teamStandings.name.concat(k).replaceAll(" ",""))
                                    return (
                                    <div key={teamStandings.name.concat(k).replaceAll(" ","")}>
                                    {teamStandings[k]}
                                    </div>
                                )})
                            })}
                        </div>
                    </>
                    )
                    }   
                )}
            </div>
        </div>
    )
}