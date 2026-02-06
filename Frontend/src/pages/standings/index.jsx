import {useState, useEffect} from 'react'

import {PageHeader, MainPageSection} from '../../components/section'

// temporary data until server works
// import tempStandings from '../../assets/temp-standings'

export default function StandingsPage({season, group}){
    const [standings, setStandings] = useState(null)
    
    const apiPath = `http://localhost:8077/standings?season=${season}&group=${group}`

    useEffect(()=>{
        getStandings()
    }, [])

    async function getStandings(){
        try{
            const response = await fetch(apiPath, {
                method: "GET"
            })
            const result = await response.json()
            console.log(result)
            setStandings(result)
        } catch(e){
            console.error(e)
        }
    }

    return(
        <>
        <PageHeader>Standings</PageHeader>
         {standings && standings.group.map((g)=>{
                return(<>
                    <h1 key={g.name} className="text-2xl pb-3">{g.name}</h1>
                    {g.subGroup.map((sgrp)=>{
                        return(
                            <>
                            <h1 key={sgrp.name} className="text-xl">{sgrp.name}</h1>
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
                                {sgrp.teams.map((team) =>{
                                    return(
                                        <div className="hover:bg-gray-200 grid grid-cols-[6fr_repeat(6,2fr)_repeat(6,3fr)_repeat(2,2fr)]">
                                        
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.team_name}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.w}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.l}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">0</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{(team.w / (team.w+team.l)).toFixed(3)}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.ps}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.pa}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.net}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.home[0]+"-"+team.home[1]}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.away[0]+"-"+team.away[1]}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.div[0]+"-"+team.div[1]}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.conf[0]+"-"+team.conf[1]}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.nonconf[0]+"-"+team.nonconf[1]}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.strk}</div>
                                <div className="border-b-1 border-t-1 font-bold pt-2 pb-2">{team.l5}</div>

                                        </div>
                                    )}
                                    )
                                }
                            <br />
                            </>
                        )
                    })}
                </>)
            })}
        </>
    )
}


//        