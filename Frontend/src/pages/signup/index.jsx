import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignupPage() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")


    const navigate = useNavigate();

    function validateForm() {
        if(password != passwordConfirm){
            alert("Passwords must match")
            return false
        }
        return true
    }

    const apiPath = `http://localhost:8077/users/`

    async function handleSubmit(e) {
        e.preventDefault();
        if(validateForm()){
            try {
                const body = {username:username, email:email, password:password}
                console.log(body)
                const response = await fetch(apiPath, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if(response.ok){
                    navigate("/login")
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const formTextInputClassName = "block w-full border-1 rounded-md focus:border-blue-400 pt-1 pb-1 pr-3 pl-3 ";

    return (
        <div className="bg-gray-200 flex place-content-center">
            <form onSubmit={handleSubmit} className="p-10 mt-20 mb-20 self-center w-[500px] block bg-gray-100 rounded-md place-content-center flex flex-col gap-4">
                <h1 className="text-2xl text-center ">Welcome!</h1>
                <h1 className="text-xl text-center ">Create a new account</h1>
                <div>
                    <label className="block">Username</label>
                    <input className={formTextInputClassName} type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label className="block" >Email</label>
                    <input className={formTextInputClassName}  type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="block" >Password</label>
                    <input className={formTextInputClassName}  type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label className="block" >Confirm Password</label>
                    <input className={formTextInputClassName}  type="password" name="passwordConfirm" onChange={(e) => setPasswordConfirm(e.target.value)} />
                </div>
                <input className="w-full border-1 mt-5 rounded-md bg-blue-500 border-blue-500 active:bg-blue-600 pt-1 pb-1 pr-3 pl-3 text-gray-100 "  type="submit" value="Sign Up" />
                <div className="flex place-content-end">
                    <p className="">Already have an account?</p>
                </div>
            </form>
        </div>
    )
}