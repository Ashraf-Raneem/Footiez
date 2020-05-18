import React from 'react'
import Data from './questions'
import {FormGroup,Label,Button,Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import './inputHandler.style.css'
import { connect } from 'react-redux'; 
import {database, auth} from '../../firebase/firebase.utils'


class InputHandle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            collections : Data,
            answerList: [],
            points: 0,
            userEmail:null,  
            modal: false,
            count: 30
        }
        this.addAnswer = this.addAnswer.bind(this)
        this.submitAnswer = this.submitAnswer.bind(this)
        this.toggleModal = this.toggleModal.bind(this)  
        this.onTimeup = this.onTimeup.bind(this)
}   
componentDidMount = () => {
    this.myInterval = setInterval(() => {
        if(this.state.count > 0 ){
        this.setState ({
            count : this.state.count -1
        })
        } else { 
        this.onTimeup()
        clearInterval(this.myInterval)
        }
    },1000)

}

componentWillUnmount = () => {
    clearInterval(this.myInterval)
}

toggleModal = () => {
    this.setState({modal : !this.state.modal})
}

addAnswer = (event) => {
    this.props.currentUser ? 
    this.setState({userEmail: this.props.currentUser.name}) : this.setState({userEmail : null })

    if(event.target.checked){
        this.setState({answerList : [...this.state.answerList , event.target.value]})
         this.state.collections.map(({correctAns}) => {
             if(event.target.value === correctAns){
                this.setState({points : this.state.points + 1 })
             }
         })
    }
    else {
       let removeItem = this.state.answerList.indexOf(event.target.value)
        this.setState({
            answerList : this.state.answerList.filter((_,i) => i!== removeItem)
        })
        this.state.collections.map(({correctAns}) => {
            if(event.target.value === correctAns){
               this.setState({points : this.state.points - 1  })
            }
        })
    }   
}
onTimeup = () => {
    if (this.state.modal === false) {
        var ref = database.ref('score')
        var data = {
            name : this.state.userEmail, 
            score : this.state.points
        }
        ref.push(data)
        this.toggleModal()
    }
}
submitAnswer = (e) => {
    var ref = database.ref('score')
    var data = {
        name : this.state.userEmail, 
        score : this.state.points
    }
    ref.push(data)
}

render () {
    const {collections,count,modal} = this.state
    return (
        <div className='mainDiv'>
            <h1>Footiez </h1>
            <h3>Round : 1 </h3>
            <h3> Timer {count}</h3>
            <div className='cover'>
            
            { collections.map(({id,question,answers,...otherProps})=> 
            <FormGroup   key={id} check>
            <Label key={id}{...otherProps} className='questionText' check>{question}</Label>
            <br></br>
                {answers.map(({option,ans}) => 
                <FormGroup key ={option} check inline>
                <Label key={option} check>
                <div className='checkBoxText' key={option}>
                <input type='checkbox'  value = {ans} onClick={(event) => this.addAnswer(event)} key = {option} />{' '+ ans}
                </div>
                </Label>
                </FormGroup> )}
            </FormGroup>
            )}
            </div>
        <Button outline color='success' size='lg' onClick={this.toggleModal} className='answerSubmit'>Submit</Button>
        
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className='modalView'>
            <ModalHeader toggle={this.toggleModal}>End of Footiez</ModalHeader>
            <ModalBody>
                Thank you for participating in the competition, answers has been submitted
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                <Button color='danger' >Logout</Button>
            </ModalFooter>
        </Modal>
        </div>
    )
}
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  });
  
  export default connect(mapStateToProps)(InputHandle);