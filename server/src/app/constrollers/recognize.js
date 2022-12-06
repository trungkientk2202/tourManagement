const { plateRecognize, addVehicle } = require('../../config/db/models/vehicle.model')

async function httpPlateRecognition(req, res) {
    const file = req.file
    console.log(req)
    if (file) {
        const vehicle = plateRecognize(file)
        if (vehicle) {
            return res.status(200).json(vehicle)
        }
        return res.status(400).json({})
    }
    return res.status(400).json({
        error: "No file is chosen!"
    })


}

module.exports = {
    httpPlateRecognition,
}