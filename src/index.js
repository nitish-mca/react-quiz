import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizeService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
class QuizBee extends Component {
    state = {
        questionBank: [],
        score: 0,
        response: 0
    }
    getQuestions = () => {
        quizeService().then(questions =>{
            this.setState({
                questionBank: questions
            })
        })
    }
    computeAnswers = (answer, correctAnswer) =>{
        if(answer === correctAnswer){
            this.setState({
                score: this.state.score + 1
            })
        }
        this.setState({
            response: this.state.response < 5 ? this.state.response + 1: 5
        })

    }
    playAgain = ()=>{
        this.getQuestions();
        this.setState({
            score: 0,
            response: 0
        })
    }
    componentDidMount(){
        this.getQuestions()
    }
    render(){
        return (
            <div className="container">
                <div className="title">Quiz</div>
                {this.state.questionBank.length > 0 &&
                this.state.response < 5 && 
                this.state.questionBank.map(
                    ({question, answers, correct, questionId}) => (
                        <QuestionBox 
                        question={question} 
                        answers = {answers} 
                        key={questionId}
                        selected={answer => this.computeAnswers(answer, correct)}></QuestionBox>
                    )
                )}
                {this.state.response === 5 ? (
                <Result score={this.state.score} playAgain={this.playAgain}></Result>
                ):null} 
            </div>
        )
    }
}

ReactDOM.render(<QuizBee/>, document.getElementById("root"))