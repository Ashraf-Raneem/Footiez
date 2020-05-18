import React from 'react'
import {Button,Input,Form} from 'reactstrap'
import {auth,signInWithGoogle} from '../../firebase/firebase.utils'
import './signIn.styles.css'
class SignIn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.onhandleSubmit = this.onhandleSubmit.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        
    }
onhandleSubmit = async e => {
    e.preventDefault()
    const  {email,password} = this.state
    try {
        await auth.signInWithEmailAndPassword(email,password); 
        this.setState({email: ' ', password: ''})
    }catch (error){
        window.alert("You are not signed up");
        console.log(error)
    }
}
onEmailChange = (e) => {
    this.setState({email : e.target.value})
}
onPasswordChange =(e) => {
    this.setState ({password : e.target.value})
}
render(){
    return (
        <div>
            <div className='signInDiv'>
                <h3>Log In</h3>
                <br></br>
                <div className='formGroup2'>
                <Form onSubmit={(e)=> this.onhandleSubmit(e)}>
                    <Input type='email' value ={this.state.email} onChange={(e) => this.onEmailChange(e)} placeholder='Email' required></Input>
                    <br></br>
                    <Input type='password' value = {this.state.password} onChange = {(e)=> this.onPasswordChange(e)} placeholder='Password' required></Input>
                    <br></br>
                    <Button color='info' type='submit' className='signUp-btn'>Log In</Button>
                </Form>
                <br></br>
                <Button color='warning'  className='signUp-btn' onClick={signInWithGoogle}>Log In with google</Button>
                </div>
            </div>
        </div>
    )
}
}
export default SignIn