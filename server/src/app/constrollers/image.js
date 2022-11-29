const multer = require('multer');
const path = require('path');

let fileName;
const storage = multer.diskStorage({
    destination: `${__dirname}/uploads`,
    filename: (req, file, cb) => {
        try{
            fileName = `${file.originalname.split('.')[0]}-${Date.now()}${path.extname(file.originalname).toLowerCase()}`;
            console.log('filename:  ', fileName);
            cb(null, fileName);
        }
        catch(error){
            console.log(error.message);
            cb(error);
        }
    }
});
const uploadImage = multer({storage});

const uploadImageHandler = (req, res) => {
    try{
        console.log("####req: ", req.file);
        if(req.file)
        {
            return res.status(200).json({
                message: 'Uploaded successfully',
                file: req.file.filename
            })
        }

    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            message: error.message
            })
    }
}
// https://localhost:8000/api/image/farLoneSails-1669739998740.png
const getImage = (req, res) => {
    try{
        const id = req.params.id
        if(id)
        {
            console.log('hello#########');
            res.sendFile(path.join(__dirname, `./uploads/${id}`));
        }
        else
            return res.status(401).json({
                message: 'Missing id'
            })
    }catch(error)
    {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
            })
    }
}

module.exports = {
    uploadImage,
    uploadImageHandler,
    getImage
};