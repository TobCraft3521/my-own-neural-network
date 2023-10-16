export class NeuralNetwork {
    layers
    inputNodes
    /**
     * @param {number} inputNeurons 
     * @param {number} outputNeurons 
     * @param {Array} shape 
     * 
     * shape: [numberOfNeuronsLayer1,numberOfNeuronsLayer2,numberOfNeuronsLayer3...]
     */
    constructor(inputNeurons, shape) {
        this.inputNodes = inputNeurons
        let previousLayerOutputs = inputNeurons
        this.layers = shape.map(neurons => {
            const layer = new Layer(previousLayerOutputs, neurons)
            previousLayerOutputs = neurons
            return layer
        })
    }
    run(inputs) {
        let outputs = new Array(this.layers.length).fill([])
        let index = 0
        this.layers.forEach(layer => {
            if (index == 0) {
                outputs[index] = layer.calcOutputs(inputs)
            } else {
                outputs[index] = layer.calcOutputs(outputs[index - 1])
            }
            index++
        })
        return outputs[this.layers.length - 1]
    }
    loss(inputs, expectedOutputs) {
        let outputs = this.run(inputs)
        const outputLayer = this.layers[this.layers.length - 1]
        let loss = 0
        for (let i = 0; i < outputs.length; i++) {
            loss += outputLayer.neuronCost(outputs[i], expectedOutputs[i])
        }
        return loss
    }
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
        this.weights = new Array(outputNeurons).fill([])
    }
    calcOutputs(inputs) {
        let activations = []
        //loop through output neurons
        for (let i = 0; i < this.outputNodes; i++) {
            let weightedInput = this.biases[i]
            //loop through input neurons
            for (let x = 0; x < this.inputNodes; x++) {
                console.log(this.weights)
                weightedInput += inputs[x] * this.weights[x, i]
            }
            activations[i] = sigmoid(weightedInput)
        }
        return activations
    }
    neuronCost(activation, expected) {
        let error = activation - expected
        return error * error
    }
}

const sigmoid = (x) => 1 / (1 + Math.exp(-x))