// import { Request } from 'express';
// import multer, { Multer } from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // console.log(">>> check: ", __dirname);
// // Định nghĩa cấu hình Multer
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(__dirname, "../uploads"));
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// export const upload = multer({storage: storage})