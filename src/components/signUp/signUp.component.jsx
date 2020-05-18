import React from 'react'
import {Button,Input,Form} from 'reactstrap'
import './signUp.style.css'
import {signInWithGoogle, auth, createUserProfileDocument} from '../../firebase/firebase.utils' 
class SignUp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            email: '',
            password: '',
            confirmPassword: ''
        }
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onCPassChange = this.onCPassChange.bind(this)
    }
onHandleSubmit = async e => {
    e.preventDefault();

    const {name,email,password,confirmPassword} = this.state

    if(password !==confirmPassword){
        window.alert('passwords dont match')
        return ; 
    }

    try {
        const {user} = await auth.createUserWithEmailAndPassword(
            email,password
        )

        await createUserProfileDocument(user,{name});

        this.setState({
            name : ' ',
            email: ' ',
            password: ' ',
            confirmPassword: ' ' 
        });
    } catch (error){
        console.log(error);
    }
}
onEmailChange = (e) => {
    this.setState({email : e.target.value})
}
onNameChange = (e) => {
    this.setState({name: e.target.value})
}
onPasswordChange = (e) => {
    this.setState({password : e.target.value})
}
onCPassChange = (e) => {
    this.setState({confirmPassword : e.target.value})
}
render(){

    return (
            <div className='signUpDiv' >
            <h3>Sign Up</h3>
            <br></br>
            <div className='formGroup'>
                <Form onSubmit={(e) => this.onHandleSubmit(e)}>
                    <Input type='text' value={this.state.name} onChange={(e) => this.onNameChange(e)} placeholder='Name' required></Input>
                    <br></br>
                    <Input type='text' value={this.state.email} onChange={(e) => this.onEmailChange(e)} placeholder='Email' required></Input>
                    <br></br>
                    <Input type='password' value={this.state.password} onChange={(e) => this.onPasswordChange(e)} placeholder='Set Password' required></Input>
                    <br></br>
                    <Input type='password' value={this.state.confirmPassword} onChange={(e) => this.onCPassChange(e)}  placeholder='Confirm Password' required></Input>
                    <br></br>
                    <Button color='info' type='submit' className='signUp-btn'>Sign Up</Button>
                </Form>
                </div>
            </div>
    )
}
}
export default SignUp