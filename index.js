import './style'
import { Component } from 'preact'

import * as tf from '@tensorflow/tfjs'

export default class App extends Component {

	constructor(){
		super()
		this.load()
	}

	state = {
		model: null,
		loaded: false
	}

	async load(){
		const model = await tf.loadModel('model/my-model-1.json')
		this.setState({model, loaded: true})
	}

	render({}, {model, loaded}) {
		return (
			<div>
				<h1>Hello, World!</h1>
			</div>
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
