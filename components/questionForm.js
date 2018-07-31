export const Question = ({q, ans, i}) => {
	let x = {}
	switch (true) {
		case i == 10:
			x.pos = {v: 'Boy', s: 1}
			x.neg = {v: 'Girl', s: 0}
			break;

		case i >= 9:
			x.pos = {v: 'Yes', s: 1}
			x.neg = {v: 'No', s: 0}
			break;
	
		default:
			x.pos = {v: 'Yes', s: 0}
			x.neg = {v: 'No', s: 1}
			break;
	}
	return(
		<div>
			<div class='question'>
				<h2>{q}</h2>
			</div>			
			{/* <Button name={x.pos.v} onClick={() => ans(x.pos.s)} /> */}
			<div class='buttonGroup'>
				<input type="button" value={x.pos.v} onClick={() => ans(x.pos.s)} />
				<input type="button" value={x.neg.v} onClick={() => ans(x.neg.s)} />
			</div>
			{/* <p>{this.state.finished && model.predict(tf.tensor2d(answers, [1, 13])).dataSync()[0]}</p> */}
		</div>
	)
}

// import { Component } from 'preact'

// import questions from '../questions'

/*export default class QuestionForm extends Component{
    constructor(){
		super()
		
		this.getNextQuestion = this.getNextQuestion.bind(this)
	}

	state = {
		questions: null,
		question: null,
		finished: false
	}

	startQuestions(){
		this.setState({question: this.state.questions.next().value})
	}

	getNextQuestion(s){
		if(this.state.finished) return
		let next = this.state.questions.next().value
		if(next){
			return this.setState({question: next, answers: [...this.state.answers, s]})
		}		
		//  console.log(this.state.model.predict(tf.tensor2d(this.state.answers, [1, 13])).dataSync()[0])
		return this.setState({answers: [...this.state.answers, s], finished: true})
	}

	componentDidMount(){
		this.setState({questions: questions.values()})
		this.startQuestions()
	}
    
    render({ans}, {question}) {
			return (
				<div>
					<h1>{question}</h1>
					<input type="button" value="Yes" onClick={() => ans(1)} />
					<input type="button" value="No" onClick={() => ans(0)} />
					<p>{this.state.finished && model.predict(tf.tensor2d(answers, [1, 13])).dataSync()[0]}</p>
				</div>
			)
	}
}*/