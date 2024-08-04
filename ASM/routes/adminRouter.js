const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
var appRoot = require('app-root-path');
const { dashboard,
        categories, 
        product, 
        order, 
        user, 
        addProduct, 
        handlesDeleteProduct,
        getDataProduct,
        handlesUpdateProduct,
        addCategory,
        handlesDeleteCategory,
        getDataCategory,
        handlesUpdateCategory,
        orderDetail
     } = require('../controller/adminController');
// Cấu hình multer start
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot.path + "/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});
// Cấu hình multer end

// unlink uploads


router.get('/dashboard', dashboard);
router.get('/categories', categories);
router.get('/product',  product);
router.get('/order', order);
router.get('/user', user);
router.get('/order-detail/:id', orderDetail);
// handle
router.post('/add-product', upload.single('imageAdd'), addProduct);
router.post('/deleteProduct', handlesDeleteProduct);
router.post('/show-edit', getDataProduct);
router.post('/edit-product', upload.single('imageUpdate'), handlesUpdateProduct);

router.post('/add-category', upload.single('imageAdd'),  addCategory);
router.post('/deleteCategory',handlesDeleteCategory );
router.post('/show-editCate', getDataCategory);
router.post('/edit-category', upload.single('imageEdit'), handlesUpdateCategory);
module.exports = router;
