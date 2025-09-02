import multer from "multer"; 

const storage = multer.diskStorage({ 
  destination: function (req, file, cb) {
    cb(null, "./public/temp") // data store in temp file prersent in public file
  },
  filename: function (req, file, cb) { // original name of the file
    cb(null, file.originalname)
  }
})

export const upload = multer({
     storage: storage 
})