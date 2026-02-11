import {useNavigate} from 'react-router-dom'

export default function SignupPage({setUser}){
    const [userName, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")


    const navigate = useNavigate();

    function validateForm(){

    }

    async function handleSubmit(){

    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" name="passwordConfirm" onChange={(e)=>setPasswordConfirm(e.target.value)}/>
            <input type="submit" />
        </form>
    )
}