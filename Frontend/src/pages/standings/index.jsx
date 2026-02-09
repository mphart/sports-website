import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { PageHeader } from '../../components/section'

// temporary data until server works
// import tempStandings from '../../assets/temp-standings'

export default function StandingsPage({ season, group }) {
    const [standings, setStandings] = useState(null)

    const startYear = 2000
    const currYear = new Date().getFullYear()

    const standingsLinks = []
    for(let i = currYear; i >= startYear; i--){
        standingsLinks.push(
            <div className="hover:bg-gray-200 content-center text-center">
                <Link onClick={()=>{season=i}} className="w-[100%] pt-1 pb-1" to={`/standings/${i}/${group}`}>{i}</Link>
            </div>
        )
    }

    const apiPath = `http://localhost:8077/standings?season=${season}&group=${group}`

    useEffect(() => {
        getStandings()
    }, [season, group])

    async function getStandings() {
        try {
            const response = await fetch(apiPath, {
                method: "GET"
            })
            const result = await response.json()
            console.log(result)
            setStandings(result)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <PageHeader>Standings</PageHeader>
            <div className="flex gap-2">
                <div>
                    <p>Season</p>
                    <DropdownMenu startValue={season}>
                        {standingsLinks.map((link)=>link)}
                    </DropdownMenu>
                </div>
                <div>
                    <p>Group By</p>
                    <DropdownMenu startValue={group}>
                        <div className="hover:bg-gray-200 content-center text-center">
                            <Link 
                            onClick={()=>{group="division"}} 
                            className="w-full" 
                            to={`/standings/${season}/division`}
                            >
                                Division
                            </Link>
                        </div>
                        <div className="hover:bg-gray-200 content-center text-center">
                            <Link onClick={()=>{group="division"}} className="w-[100%]" to={`/standings/${season}/conference`}>Conference</Link>
                        </div>
                        <div className="hover:bg-gray-200 content-center text-center">
                            <Link onClick={()=>{group="division"}} className="w-[100%]" to={`/standings/${season}/league`}>League</Link>
                        </div>
                    </DropdownMenu>
                </div>
            </div>
            {standings && standings.group.map((g) => {
                return (<>
                    <h1 key={g.name} className="text-2xl pb-3">{g.name}</h1>
                    {g.subGroup.map((sgrp) => {
                        return (
                            <>
                                <h1 className="text-xl">{sgrp.name}</h1>
                                <StandingsTableHeader />
                                {sgrp.teams.map((team, i) => { return <StandingsTableRow team={team} rank={++i} /> })}
                                <br />
                            </>
                        )
                    })}
                </>)
            })}
            <StandingsLegend />
        </>
    )
}

function DropdownMenu({ startValue, children }) {
    const dropdownContent = useRef(null)

    const toggleDropdown = () => {
        if(dropdownContent.current.style.display == 'block'){
            dropdownContent.current.style.display = 'none'
        } else {
            dropdownContent.current.style.display = 'block'
        }
    }

    return (
        <div onFocus={toggleDropdown} onBlur={toggleDropdown} className="pb-5">
            <button
                className="border-2 bg-gray-200 pl-3 pr-3 pt-2 pb-2 min-w-[200px] cursor-pointer relative focus:bg-gray-300"
            >
                {startValue}
            </button>
            <div className="min-w-[200px] max-h-[400px] absolute hidden bg-gray-100 overflow-auto" ref={dropdownContent}>
                {children}
            </div>
        </div>
    )
}

function StandingsTableHeader() {
    const divListClass = "border-b-1 border-t-1 font-bold pt-2 pb-2";
    return (
        <div className="grid grid-cols-[2fr_8fr_repeat(6,2fr)_repeat(6,3fr)_repeat(2,2fr)]">
            <div className={divListClass}>Rank</div>
            <div className={divListClass}>Team Name</div>
            <div className={divListClass}>W</div>
            <div className={divListClass}>L</div>
            <div className={divListClass}>T</div>
            <div className={divListClass}>PCT</div>
            <div className={divListClass}>PS</div>
            <div className={divListClass}>PA</div>
            <div className={divListClass}>NET</div>
            <div className={divListClass}>Home</div>
            <div className={divListClass}>Away</div>
            <div className={divListClass}>Div</div>
            <div className={divListClass}>Conf</div>
            <div className={divListClass}>Nonconf</div>
            <div className={divListClass}>Strk</div>
            <div className={divListClass}>Last5</div>
        </div>
    )
}

function StandingsTableRow({ team, rank }) {
    const divListClass = "border-b-1 border-t-1 font-bold pt-2 pb-2";
    const netPointsClass = divListClass.concat(team.net >= 0 ? ' text-green-500': ' text-red-500')
    return (
        <div className="hover:bg-gray-200 grid grid-cols-[2fr_8fr_repeat(6,2fr)_repeat(6,3fr)_repeat(2,2fr)]">
            <div className={divListClass}>{rank}</div>
            <div className={divListClass}>{team.team_name}</div>
            <div className={divListClass}>{team.w}</div>
            <div className={divListClass}>{team.l}</div>
            <div className={divListClass}>{team.t}</div>
            <div className={divListClass}>{(team.w / (team.w + team.l)).toFixed(3)}</div>
            <div className={divListClass}>{team.ps}</div>
            <div className={divListClass}>{team.pa}</div>
            <div className={divListClass}>{team.net}</div>
            <div className={divListClass}>{team.home[0] + "-" + team.home[1]}</div>
            <div className={divListClass}>{team.away[0] + "-" + team.away[1]}</div>
            <div className={divListClass}>{team.div[0] + "-" + team.div[1]}</div>
            <div className={divListClass}>{team.conf[0] + "-" + team.conf[1]}</div>
            <div className={divListClass}>{team.nonconf[0] + "-" + team.nonconf[1]}</div>
            <div className={divListClass}>{team.strk}</div>
            <div className={divListClass}>{team.l5}</div>
        </div>
    )
}

function StandingsLegend() {
    return (
        <>
            <h1 className="text-2xl pb-2">Legend</h1>
            <div className="grid grid-cols-4">
                <p className="text-sm">W - Wins</p>
                <p className="text-sm">L - Losses</p>
                <p className="text-sm">T - Ties</p>
                <p className="text-sm">PCT - Win Percentage</p>
                <p className="text-sm">PS - Points Scored</p>
                <p className="text-sm">PA - Points Allowed</p>
                <p className="text-sm">NET - Net Points</p>
                <p className="text-sm">Home - Home Record</p>
                <p className="text-sm">Away - Away Record</p>
                <p className="text-sm">Div - Division Record</p>
                <p className="text-sm">Conf - Conference Record</p>
                <p className="text-sm">Nonconf - Non-Conference Record</p>
                <p className="text-sm">Strk - Current Streak</p>
                <p className="text-sm">L5 - Record in Last 5 Games</p>
            </div>
        </>
    )
}

