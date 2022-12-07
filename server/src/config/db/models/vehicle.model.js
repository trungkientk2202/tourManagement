const fetch = require('node-fetch')
const FormData = require('form-data')
const fs = require('fs')
const vehicles = require('./vehicle.mongo')

async function plateRecognize(file) {
    const image = 'src/app/constrollers/uploads/'+file.filename;
    let body = new FormData();
    body.append("upload", fs.createReadStream(image));
    //body.append('upload', base64Image);
    body.append("regions", "vn"); // Change to your country
    const plate = await fetch("https://api.platerecognizer.com/v1/plate-reader/", {
        method: 'post',
        headers: {
            Authorization: "Token 82855433eb03ab130019c5dd77a69a44ed95d3f7",
        },
        body: body,
    }).then((res) => res.json())
    console.log('Plate: ',plate)
    return await plate.results[0]
}

async function addVehicle(vehicle) {
    try {
        await vehicles.updateOne({licensePlate: vehicle.licensePlate}, {
            id: Number(await getLatestId()+1) ,
            licensePlate: vehicle,
            type: vehicle.type
        }, {
            upsert: true
        })
        return vehicle
    } catch(err) {
        console.log(err)
        return {}
    }
}

const getLatestId = async() => {
    const latestUser = await vehicles.findOne().sort('-_id');

    if (!latestUser) {
        return 0;
    }
    return latestUser._id;
}

module.exports = {
    plateRecognize, 
    addVehicle,

}