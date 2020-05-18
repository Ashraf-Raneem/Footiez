import React from 'react'
import './timer.styles.css'
import { Modal,ModalBody,ModalFooter,ModalHeader,Button } from 'reactstrap'
import InputHandle from '../inputHandler/inputHandler.component'
class Timer extends React.Component {
    constructor(props) {
        super (props) 
        this.state = {
            count : 5
        }
    }
componentDidMount = () => {
    this.myInterval = setInterval(() => {
        if(this.state.count > 0 ){
        this.setState (prevState => ({
            count : prevState.count -1
        }))
    } else {clearInterval(this.myInterval)}
    },1000)
} 
componentWillUnmount = () => {
    clearInterval(this.myInterval)

}
render() {
    const {count} =this.state
   
   /* if (count === 0 ){
        window.alert('Time is up')
    }
    */
    return (
        <div className='mainQuizDiv' >
            <h1 className='timer'>Timer: <em>{count}</em></h1>
        </div>
    )
}
}
export default Timer