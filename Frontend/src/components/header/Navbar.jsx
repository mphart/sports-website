import {Link} from 'react-router-dom'

export default function Navbar(){

    return(<>

        <div className="bg-gray-100">

            <p>This is the heading</p>

            <Link to="standings">Standings</Link>

        </div>
        
    
    
    </>)
}