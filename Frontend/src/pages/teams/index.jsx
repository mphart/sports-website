import { useState, useEffect } from 'react'

import { PageHeader, MainPageSection } from '../../components/section'

export default function TeamsPage() {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        getTeams()
    }, [])

    const apiPath = `http://localhost:8077/teams/`

    async function getTeams() {
        try {
            const response = await fetch(apiPath)
            const result = await response.json()
            console.log(result)
            setTeams(result)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <MainPageSection>
            <PageHeader>Teams</PageHeader>
            <div className="flex place-content-around">
                <TeamList teamList={teams.filter((team) => team.conference == "North")} listTitle="North" />
                <TeamList teamList={teams.filter((team) => team.conference == "South")} listTitle="South" />
            </div>
        </MainPageSection>
    )
}

function TeamList({ teamList, listTitle }) {
    return (
        <div>
            <h1 className="text-2xl border-b-1 pb-2 mb-2">{listTitle}</h1>
            {teamList.map((t) => {
                return (
                    <div className="min-w-[420px] bg-blue-500 text-center mb-3">
                        {t.team_name}
                        <p>{t.stadium_name}</p>
                    </div>
                )
            })}
        </div>
    )
}