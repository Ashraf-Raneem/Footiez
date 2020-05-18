import React from 'react' 
import './signInAndSignUp.styles.css'
import SignIn from '../../components/signIn/signIn.component'
import SignUp from '../../components/signUp/signUp.component'
import { auth } from '../../firebase/firebase.utils'
const SignInQuiz = () =>  {
    return (
        <div className='signUpGrid'>
            <div className='component1'>
            <SignIn></SignIn>
            </div>
            <div className='component2'>
            <SignUp></SignUp>
            </div>
        </div>
    )
}
export default SignInQuiz