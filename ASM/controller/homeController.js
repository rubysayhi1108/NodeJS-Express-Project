const { log } = require('console');
const fs = require('fs');
const { title } = require('process');
const express = require('express');
const session = require('express-session');
const app = express();
// Sử dụng session middleware
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));
const { insertBill,insertBillProduct } = require('../models/checkoutModel');
const { insertUser} = require('../models/accountModel');
const {  accoutJson } = require('../services/getAccountData') ;
const {   billJson } = require('../services/getBillData') ;
const home = (req, res) => {
    titlePage = "Trang chủ";
    // Đọc nội dung của file JSON
    const jsonData = fs.readFileSync('./data/homeData.json');
    // Parse nội dung JSON thành object JavaScript
    const homeData = JSON.parse(jsonData);
    // Truy cập thông tin cần thiết từ object JavaScript đã parse
    const newProduct = homeData.newProduct;
    const topSellerProduct = homeData.topSellerProduct;
    const sellerProduct = homeData.bestSellerProduct;
    const saleProduct = homeData.saleProduct;
    const category = homeData.category;
    // Truyền thông tin này vào trang home để hiển thị
    res.render('home', {
        newProduct,
        topSellerProduct,
        sellerProduct,
        saleProduct,
        category,
        titlePage
    });
   
};
const shop = (req, res) => {
    titlePage = "Trang cửa hàng";
    let idCate = req.params.idCate;
    try {
        const jsonData = fs.readFileSync('./data/shopData.json');
        const shopData = JSON.parse(jsonData);
        let product = shopData.product;
        let category = shopData.category;
        let title = "";
        if (idCate == 0) {
            title = "TẤT CẢ CÁC SẢN PHẨM";
        } else {
            let nameCategory = category.find(cat => cat.id === parseInt(idCate));
            if (nameCategory) {
                title = "Đồng hồ " + nameCategory.name; 
                product = product.filter(item => item.iddm === parseInt(idCate));
            } else {
                title = "Không tìm thấy danh mục"; 
            }
        }

        res.render('shop', {
           product,
           category,
           title,
           titlePage
        });
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
        res.render('error', { message: 'Đã xảy ra lỗi khi tải dữ liệu sản phẩm' });
    }
};
const product_detail = (req, res) => {
    let id = req.params.id; 
    titlePage = "Trang chi tiết sản phẩm";
    const jsonData = fs.readFileSync('./data/shopData.json');
    const shopData = JSON.parse(jsonData);
    let product = shopData.product;
    let category = shopData.category;
    let Product = product.find(item => item.id === parseInt(id));
    if (Product) {
        let Category = category.find(cat => cat.id === Product.iddm);
        let mota = Category ? Category.mota : '';
        let relatedProduct = product.filter(item => item.iddm === Product.iddm && item.id !== Product.id).slice(0, 4);
        res.render('product-detail', {
            product: Product,
            category: Category,
            mota: mota,
            relatedProduct: relatedProduct,
            titlePage
        });
    } else {
        res.status(404).send('Không tìm thấy sản phẩm');
    }
    
    
};
const cart = (req, res) => {
    const jsonData = fs.readFileSync('./data/shopData.json');
    const shopData = JSON.parse(jsonData);
    const category = shopData.category; 
    res.render('cart', { 
        category,
        titlePage: "Trang giỏ hàng"
    });
};
const checkout = (req, res) => {
    res.render('checkout');
};
const postCheckout = (req, res) => {
    const { hoTen, soDienThoai, email, diaChiCuThe, phuongXa, quanHuyen, tinhThanhPho, shipping, cartData } = req.body;
    const jsonData = fs.readFileSync('./data/billData.json');
    const billData = JSON.parse(jsonData);
    const lastOrderId = billData.orders.length > 0 ? parseInt(billData.orders[billData.orders.length - 1].id) : 0;
    const idBill = lastOrderId > 0 ? lastOrderId + 1 : 1; 
    let tong = 0; 
    if (hoTen == "" || soDienThoai == "" || email == "" || diaChiCuThe == "" || phuongXa == "" || quanHuyen == "" || tinhThanhPho == "") {
        res.status(400).json({ title: "Xãy ra lỗi!", message: "Vui lòng điền đầy đủ thông tin!" });
    } else {
        cartData.forEach((cartItem) => {
            const thanhTien = parseInt(cartItem.thanhtien);
            tong += thanhTien; 
        });
        insertBill({
            id: idBill,
            hoTen: hoTen,
            soDienThoai: soDienThoai,
            email: email,
            diaChiCuThe: diaChiCuThe,
            phuongXa: phuongXa,
            quanHuyen: quanHuyen,
            tinhThanhPho: tinhThanhPho,
            shipping: 1,
            pttt: 1,
            stt: "Chờ xác nhận",
            tong: tong 
        });
        // console.log(tong);
        cartData.forEach((cartItem) => {
            const thanhTien = parseInt(cartItem.thanhtien);
            insertBillProduct({ 
                orderId: idBill, 
                name: cartItem.name, 
                image: cartItem.image,
                price: cartItem.price, 
                quantity: cartItem.quantity, 
                thanhTien: thanhTien 
            });
        });        
        billJson();
        res.status(200).json({ title: "Đặt hàng thành công!", message: "Đặt hàng thành công!" });
    }
}




const login = (req, res) => {
    const jsonData = fs.readFileSync('./data/shopData.json');
    const shopData = JSON.parse(jsonData);
    let category = shopData.category;
    res.render('login', { category });
   
};  

const register = (req, res) => {
    const jsonData = fs.readFileSync('./data/shopData.json');
    const shopData = JSON.parse(jsonData);
    let category = shopData.category;
    res.render('register', { category });
}
const handlesRegister = async (req, res) => {
    const {  emailAccount, passwordAccount, username } = req.body;
    if (username === "" || passwordAccount === "" || emailAccount === "") {
        res.status(200).json({ title: "Xãy ra lỗi!", message: "Vui lòng điền đầy đủ thông tin!" });
    } else if (passwordAccount && passwordAccount.length < 6) {
        res.status(200).json({ title: "Xãy ra lỗi!", message: "Mật khẩu phải có ít nhất 6 ký tự!" });
    } else {
        insertUser({username: username, pass: passwordAccount, email: emailAccount, role: 1 });
        // console.log(emailAccount, passwordAccount,username);
        accoutJson();
        // res.status(200).json({ title: "Đăng kí thành công!", message: "Đăng kí thành công!", redirectTo: "/login"  });
        res.redirect('/login');
    }

};


const handlesLogin = async (req, res) => {
    const { emailAccount, passwordAccount } = req.body;
    const jsonData = fs.readFileSync('./data/accountData.json');
    const userData = JSON.parse(jsonData);
    const user = userData.user.find(user => user.email === emailAccount && user.pass === passwordAccount);

    if (user) {
        if (user.role === 1) {
            res.status(200).json({ title: "Đăng nhập thành công!", message: "Đăng nhập thành công!", redirectTo: "/home" });
        } else {
            res.status(200).json({ title: "Đăng nhập thành công!", message: "Đăng nhập thành công!", redirectTo: "/admin/dashboard" });
        }
    } else {
        res.status(200).json({ title: "Đăng nhập thất bại!", message: "Email hoặc mật khẩu không đúng!", redirectTo: "/login" });
    }
};


module.exports   = {
    home,
    shop,
    product_detail,
    cart,
    checkout,
    postCheckout,
    login,
    register,
    handlesLogin, 
    handlesRegister,
    // orderDetail
};
