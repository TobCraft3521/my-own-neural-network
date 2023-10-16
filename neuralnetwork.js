export class NeuralNetwork {
    weight1 = 1
}

export class Layer {
    inputNodes = undefined
    outputNodes = undefined
    weights = [] // 2-dimensional
    biases = [] // 1-dim
    constructor(inputNeurons, outputNeurons) {
        this.inputNodes = inputNeurons
        this.outputNodes = outputNeurons
        this.biases = new Array(outputNeurons).fill(0)
        this.weights = new Array(inputNeurons).fill([])
    }
    calcOutputs(inputs) {
        let weightedInputs = []
        //loop through output neurons
        for (let i = 0; i < this.outputNodes; i++) {
            let weightedInput = this.biases[i]
            //loop through input neurons
            for (let x = 0; x < this.outputNodes; x++) {
                weightedInput += inputs[x] * this.weights[x, i]
            }
            weightedInputs[i] = weightedInput
        }
        return weightedInputs
    }
}