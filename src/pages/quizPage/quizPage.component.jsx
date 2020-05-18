import React from 'react'
import InputHandler from '../../components/inputHandler/inputHandler.component'
import Timer from '../../components/timer/timer.component'
import './quizPage.styles.css'
import Footer from '../../components/footer/footer.component'
const QuizPage = () => {
    return(
        <div className='mainQuizDiv'>
            <div className='containerQuiz'>
            <InputHandler></InputHandler>
            </div>
            
        </div>
    )
    
}
export default QuizPage