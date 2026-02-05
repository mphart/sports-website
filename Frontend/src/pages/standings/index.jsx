import {useState, useEffect} from 'react'

import {PageHeader, MainPageSection} from '../../components/section'

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
            const result = await response.json();
            console.log(result)
            setStandings(result)
        } catch(e){
            console.error(e)
        }
    }

    return(
        <>
            <PageHeader>Standings</PageHeader>
            {standings.group.map((g)=>{
                return(
                    <>
                    <h1 key={g.name} className="text-2xl">{g.name}</h1>
                    {g.subGroups.map((subgroup)=>{
                        return(
                            <>
                            <h1 key={subgroup.name} className="text-xl">{subgroup.name}</h1>
                            <div className="grid grid-cols-[6fr_repeat(6,2fr)_repeat(6,3fr)_repeat(2,2fr)]">
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">Team Name</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">W</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">L</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">T</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">PCT</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">PS</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">PA</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">NET</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">Home</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">Away</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">Div</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">Conf</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">Nonconf</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">Strk</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">Last5</div>
                            </div>
                                {subgroup.teams.map((team) =>{
                                    return(
                                        <div className="hover:bg-gray-200 grid grid-cols-[6fr_repeat(6,2fr)_repeat(6,3fr)_repeat(2,2fr)]">
                                        
                                        {Object.keys(team).map((v) =>{
                                        return(
                                                <div key={team.name.concat(v)} className="border-b-1 pt-1 pb-1">{team[v]}</div>
                                        )})}

                                        </div>
                                    )}
                                    )
                                }
                            <br />
                            </>
                        )
                    })}
                    </>
                )
            })}
        </>
    )
}