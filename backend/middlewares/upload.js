import multer from 'multer';

var storage = multer.diskStorage({});

export const upload = multer({ storage: storage });
