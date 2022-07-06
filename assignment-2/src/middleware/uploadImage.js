const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'images/inventory/',
    filename: function(req, file, cb){
        const fileType = file.mimetype.split('/')[1];
        if(!['jpg', 'jpeg', 'png'].includes(fileType.toLowerCase())){
            return cb(new Error('Invalid File Format'), undefined);
        }
        cb(undefined, Date.now() +`_inventory.${fileType}`);
    }
});

module.exports = multer({ storage: storage });