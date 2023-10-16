import { NeuralNetwork } from "./neuralnetwork.js"
const nn = new NeuralNetwork(3, [2, 3])
console.log(nn.loss([1, 3, 3], [4, 7, 6]))

