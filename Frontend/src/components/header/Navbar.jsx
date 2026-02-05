import {Link, useLocation} from 'react-router-dom'

export default function Navbar(){
    const location = useLocation()

    return(<>

        <div className="bg-gray-900 flex place-content-between pt-4 pb-4 pl-30 pr-30">
            <div>
                <NavbarLink linkto="/">Home</NavbarLink>
                <NavbarLink linkto="/watch">Watch</NavbarLink>
                <NavbarLink linkto="/news">News</NavbarLink>
                <NavbarLink linkto={"/standings/"+new Date().getFullYear()+"/conference"}>Standings</NavbarLink>
                <NavbarLink linkto="/schedule">Schedule</NavbarLink>
                <NavbarLink linkto="/teams">Teams</NavbarLink>
            </div>
            <div>
                <NavbarLink linkto="/signup">Sign Up</NavbarLink>
            </div>
        </div>
        
    </>)
}

function NavbarLink({linkto, children}){
    const style = 'mr-6 ml-6 text-blue-500 hover:text-blue-400 active:text-blue-300 hover:border-b-3 '+ 
        (linkto.toLowerCase().split('/')[1] == location.pathname.split('/')[1] ? 'border-b-3' : ' ')
    return(
        <Link to={linkto} className={style}>
            {children}
        </Link>
    )
}

function NavbarDropdown({linkto, children}){
    const style = 'mr-6 ml-6 text-blue-500 hover:text-blue-400 active:text-blue-300 hover:border-b-3 hover:block relative'
    const dropdownStyle = 'hidden absolute min-w-md bg-red-300 block'
    return(
        <>
        <Link to={linkto} className={style}>{children}
            <div className={dropdownStyle}>Dropdown test</div>
        </Link>
        </>
    )
}