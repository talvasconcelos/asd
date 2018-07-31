import './style'
import { Component } from 'preact'

import * as tf from '@tensorflow/tfjs'
import questions from './questions'

import {Question} from './components/questionForm'

// const a = Array.from({length: 13}, () => Math.round(Math.random()))
// const data = tf.tensor2d(a, [1, 13])
// console.log(a)

export default class App extends Component {

	constructor(){
		super()
		this.load()

		this.getNextQuestion = this.getNextQuestion.bind(this)
		// this.predict = this.predict.bind(this)
	}

	state = {
		model: null,
		loaded: false,
		questions: null,
		q_number: 0,
		question: null,
		answers: [],
		finished: false,
		prediction: 0
	}

	async load(){
		const model = await tf.loadModel('model/asdModel.json')
		this.setState({model, loaded: true})
	}

	startQuestions(){
		this.setState({question: this.state.questions.next().value})
	}

	getNextQuestion(s){
		if(this.state.finished) return
		let next = this.state.questions.next().value
		if(next){
			return this.setState({
				question: next, 
				answers: [...this.state.answers, s], 
				q_number: this.state.q_number + 1
			})
		}		
		//  console.log(this.state.model.predict(tf.tensor2d(this.state.answers, [1, 13])).dataSync()[0])
		this.setState({answers: [...this.state.answers, s], q_number: this.state.q_number + 1, finished: true})
		this.predict()
	}

	predict() {
		let p = this.state.model.predict(tf.tensor2d(this.state.answers, [1, 13])).dataSync()[0]
		this.setState({prediction: Math.round(p * 100)})
	}

	componentDidMount(){
		this.setState({questions: questions.values()})
		this.startQuestions()
	}

	render({}, {question, finished, q_number}) {
		return (
			<main>
				{!finished && <Question 
					q={question} 
					ans={this.getNextQuestion} 
					i={q_number}/>}
				{finished && 
					<div>
						<h3>{`The probability that the toddler may have ASD is: ${this.state.prediction}%`}</h3>
					</div>}
			</main>
		)
	}
}

/*
const data = tf.tensor2d([0,0,1,1,0,0,0,0,0,0,1,0,0], [1, 13])
const a = Array.from({length: 13}, () => Math.round(Math.random()))
const data = tf.tensor2d(a, [1, 13])
console.log(a)

<p>{loaded && model.predict(data).dataSync()[0]}</p>
*/
