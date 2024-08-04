const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { home, shop, product_detail,cart, login, register, checkout, postCheckout, handlesLogin, handlesRegister} = require('../controller/homeController');
// const { routerModule } = require('./adminRouter');

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads', 'img'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// route
router.get('/home', home);
router.get('/shop/:idCate', shop);
router.get('/product-detail/:id', product_detail);
router.get('/cart', cart);
router.get('/checkout', checkout);
router.get('/login', login);
router.get('/register', register);

// routes post
router.post('/postRegister', handlesRegister);
router.post('/postLogin', handlesLogin);
router.post('/postCheckout', postCheckout);

// Sử dụng routerModule
// routerModule();

module.exports = router;