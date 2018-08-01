import './style'
import { Component } from 'preact'

import * as tf from '@tensorflow/tfjs'
import questions from './questions'

import { Question } from './components/questionForm'
import { Button } from './components/button'
import { Score } from './components/score'

// const a = Array.from({length: 13}, () => Math.round(Math.random()))
// const data = tf.tensor2d(a, [1, 13])
// console.log(a)

export default class App extends Component {

	constructor(){
		super()
		this.load()

		this.getNextQuestion = this.getNextQuestion.bind(this)
		this.restart = this.restart.bind(this)
	}

	state = {
		model: null,
		loaded: false,
		questions: null,
		q_number: 0,
		question: null,
		answers: [],
		finished: false,
		prediction: null
	}

	load(){
		let self = this

		const model = tf.loadModel('assets/model/asdModel.json')
		model.then((m) => self.setState({model: m, loaded: true}))
	}

	restart(){
		this.setState({
			finished: false,
			answers: [],
			prediction: null,
			q_number: 0,
			questions: questions.values()
		})
		this.startQuestions()
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
		this.setState({prediction: p})
		console.log(p)
	}

	componentDidMount(){
		this.setState({questions: questions.values()})
		this.startQuestions()
	}

	render({}, {question, finished, q_number, prediction}) {
		return (
			<main class='fresh text-light'>
				{!finished && <Question 
					q={question} 
					ans={this.getNextQuestion}
					i={q_number}/>}
				{finished &&
					<Score score={prediction}>
						<Button style='verm' click={this.restart}>Redo test</Button>
					</Score>
				}
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

<div>
						{prediction > 0.5 && }
						<h3>{`The probability that the toddler may have ASD is:`}</h3>
						<p>{this.state.prediction}</p>
						
							<Button style='verm' click={this.restart}>Redo test</Button>
						
					</div>
*/
