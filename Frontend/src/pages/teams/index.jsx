import {useState,useEffect} from 'react'

export default function TeamsPage(){
    const [teams, setTeams] = useState({})

    useEffect(()=>{
        getTeams()
    }, [])

    const apiPath = `http://localhost:8077/teams/`

    async function getTeams(){
        try {
            const response = await fetch(apiPath)
            const result = await response.json()
            setTeams(result)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <>
        <h1>Welcome to the teams page!</h1>
        </>
    )
}