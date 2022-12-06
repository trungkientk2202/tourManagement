const { plateRecognize, addVehicle } = require('../../config/db/models/vehicle.model')
const {uploadImageHandler} = require('./image')

async function httpPlateRecognition(req, res) {
    const file = req.file
    console.log('File: ', file)
    if (file) {
        console.log('start')
        // await uploadImageHandler(req, res)
        const vehicle = await plateRecognize(file)
        console.log('Vehicle: ', vehicle)
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