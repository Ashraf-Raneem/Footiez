import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import './homepage.styles.css'
import { auth } from '../../firebase/firebase.utils'

const Dashboard = () => {
    return(
        <div className='dashboardDiv'>
            <h1>Welcome to the Footiez Quiz Competition</h1>
           <Link to='/ '> <Button onClick={()=>auth.signOut()}>Sign Out</Button></Link>
            <div className='cover'>
            <h3 className='subHeader'>Here are some of the rules of the quiz's</h3>
            <ul>
                <li>There are 10 questions to answer, you have to answer all of the them</li>
                <li>Alloted time is 30 seconds, (To avoid disturbing Uncle google)</li>
                <li>Multiple answers for the same questions will be ignored</li>
                <li>No Second opportunities, 1 chance</li>
                <li>A league will be created and every three days the bottom scorers will be eliminated</li>
                <li>Winner gets to make the questions next season and prize aswell</li>
                <p className='gd'>Good Luck</p>
                <p>Click  <Link to='/quiz'> <Button outline color='success' className='gameStart' > Start</Button></Link> to begin the show </p>
            </ul>
            </div>
        </div>
    )
}
export default Dashboard 