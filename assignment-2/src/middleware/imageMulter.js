const multer = require('multer');

const uploadImage = () => {
    
    const diskStorage = multer.memoryStorage()
    
    const filter = (req, file, cb)=>{
        if(file.mimetype.split('/')[0] === 'image'){
            cb(null, true);
        }else{
            cb(new Error('Only Images are allowed!!'));
        }
    }

    return( multer({ storage: diskStorage, fileFilter: filter }) );
}

module.exports = uploadImage;