const fetch = require('node-fetch')
const FormData = require('form-data')
const fs = require('fs')
const axios = require('axios')

async function plateRecognize(image_path) {
    let body = new FormData();
    body.append("upload", fs.createReadStream(image_path));
    // Or body.append('upload', base64Image);
    body.append("regions", "vn"); // Change to your country
    const plate = await axios.post("https://api.platerecognizer.com/v1/plate-reader/", {
        headers: {
            Authorization: "Token 82855433eb03ab130019c5dd77a69a44ed95d3f7",
        },
        body: body,
    })
    console.log(plate.data)
    return await plate.data
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log('AlumiMNAT: ', data.results[0].plate)
        //     // return json.results[0].plate
        // })
        // .catch((err) => {
        //     console.log(err);
        //     // return {}
        // });
}

module.exports = {
    plateRecognize
}