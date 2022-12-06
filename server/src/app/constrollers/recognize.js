const {plateRecognize} = require('../../config/db/models/vehicle.model')

async function httpPlateRecognition(req, res) {
    const vehicle =  plateRecognize('Moto.jpg')
    if (vehicle) {
        return res.status(200).json(vehicle)
    }
    return res.status(400).json({})
}

module.exports = {
    httpPlateRecognition,
}