const { log } = require('console');
const fs = require('fs');
const { title } = require('process');
const express = require('express');
const { name } = require('ejs');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require('path');
var appRoot = require('app-root-path');
// unlink start
function unLinkImage(urlImage) {
    const imagePath = path.join(appRoot.path + "/uploads" + urlImage);
    fs.unlink(imagePath, (err) => {
    if (err) {
        console.error('Lỗi khi xóa tệp tin ảnh:', err);
    } else {
        console.log('Tệp tin ảnh đã được xóa thành công');
    }
    });
}
// unlink end
const { shopJson} = require('../services/getShopData');
const { HomeJson} = require('../services/getHomeData');
const { insertProduct,  deleteDataProduct, updateProduct} = require('../models/productModel');
const {  insertCategory, deleteDataCategory, updateCategory } = require('../models/categoryModel');
const { get } = require('http');
const dashboard = (req, res) => {
    res.render('dashboard');
}

//product
const product = async (req, res) => {
    await shopJson();
    const jsonData = fs.readFileSync('./data/shopData.json');
    const shopData = JSON.parse(jsonData);
    let productData = shopData.product; // Đổi tên biến product thành productData để tránh xung đột với tên hàm
    let categoryData = shopData.category;
    // Ví dụ: Lấy id của sản phẩm đầu tiên trong mảng productData
    let productId = productData.length > 0 ? productData[0].id : null;
    // Tìm danh mục của sản phẩm dựa trên productId
    let categoryDataFound = categoryData.find(cat => cat.id === productId);
    let categoryName = categoryDataFound ? categoryDataFound.name : '';
    console.log(categoryName);
    const totalQty = productData.length;
    res.render('product', {
        product: productData,
        category: categoryData,
        categoryName: categoryName,
        totalQty: totalQty
    });
}
const addProduct = async (req, res) => {
    const {nameAdd, priceAdd, qtyAdd, saleAdd, cateAdd, purchases, view} = req.body;
    const image = req.file.filename;
    const jsonData = fs.readFileSync('./data/shopData.json');
    const productData = JSON.parse(jsonData);
    const lastOrderId = productData.length > 0 ? parseInt(productData[productData.length - 1].id, 10) : 0;
    const newOrderId = lastOrderId + 1;
    if(nameAdd=="" || priceAdd=="" || saleAdd=="" || qtyAdd=="" || cateAdd=="" || image==""){
        res.status(400).json({title: "Xãy ra lỗi!", message: "Vui lòng điền đầy đủ thông tin!"});
    }else {
        insertProduct({id:newOrderId, name:nameAdd, price:priceAdd, qty:qtyAdd, sale:saleAdd, iddm:cateAdd, image:image, purchases:0, view:0})
        shopJson();
        HomeJson();
        res.status(200).json({title: "Thêm sản phẩm thành công!", message: "Thêm sản phẩm thành công!"});
    }
}
const handlesDeleteProduct = async (req, res) => {
    const { id } = req.body;
    await deleteDataProduct(id);
    shopJson();
    HomeJson();
    res.status(200).json({ title: "Thành công!", message: "Xóa sản phẩm thành công!" });
}
const getDataProduct = async (req, res) => {
    const { idProduct } = req.body;
    // console.log(">>>: ", idProduct);
    await shopJson();
    const jsonData = fs.readFileSync('./data/shopData.json');
    const shopData = JSON.parse(jsonData);
    const product = shopData.product.find(item => item.id == idProduct);
    console.log(">>> controller: ", product);
    res.status(200).json({productData: product });
}
const handlesUpdateProduct = async (req, res) => {
    const { nameUpdate, priceUpdate, quantityProduct, saleUpdate, idCategory, idProductOld, imageProductOld, nameProductOld } = req.body;
    let image = '';
    await shopJson();
    const jsonData = fs.readFileSync('./data/shopData.json');
    const shopData = JSON.parse(jsonData);
    const checkProductExits = shopData.product.forEach(item => {
        if(nameUpdate == nameProductOld) return false;
        if(item.name == nameUpdate) return true;
    })
    ;(item => {
        return nameUpdate == name
    });
    console.log(">>> check name product: ", checkProductExits);
    if(req.file == undefined) {
        image = imageProductOld;
    }else {
        image = req.file.filename;
        unLinkImage(imageProductOld);
    }
    if(nameUpdate == "" || priceUpdate == "" || quantityProduct == "" || saleUpdate == "") {
        res.status(400).json({title: "Xãy ra lỗi!", message: "Vui lòng điền đầy đủ thông tin!"});
    }else if (checkProductExits) {
        res.status(400).json({title: "Xãy ra lỗi!", message: "Tên sản phẩm đã tồn tại!"});
    }else {
        updateProduct(idProductOld, {
            name: nameUpdate,
            price: priceUpdate,
            qty: quantityProduct,
            sale: saleUpdate,
            iddm: idCategory,
            image: image
        })
        await shopJson();
        res.status(200).json({productData: product });
    }
}
//category
const categories = async (req, res) => {
    await shopJson();
    const jsonData = fs.readFileSync('./data/shopData.json');
    const shopData = JSON.parse(jsonData);
    const categoryData = shopData.category;
    const totalQty = categoryData.length;
    res.render('categories', {
        cate: categoryData,
        totalQty: totalQty

    });
}
const addCategory = async (req, res) => {
    const {nameAdd, motaAdd, imageAdd} = req.body;
    const image = req.file.filename;
    if(nameAdd=="" || motaAdd=="" || image==""){
        res.status(400).json({title: "Xãy ra lỗi!", message: "Vui lòng điền đầy đủ thông tin!"});
    }else {
        insertCategory({name: nameAdd, image: image, mota: motaAdd});
        shopJson();
        HomeJson();
        res.status(200).json({title: "Thêm danh mục thành công!", message: "Thêm danh mục thành công!"});
    }
}
const handlesDeleteCategory = async (req, res) => {
    const { id } = req.body;
    console.log(id);
    await deleteDataCategory(id);
    shopJson();
    HomeJson();
    res.status(200).json({ title: "Thành công!", message: "Xóa danh mục thành công!" });
}
const getDataCategory = async (req, res) => {
    const { idCate } = req.body;
    const jsonData = fs.readFileSync('./data/shopData.json');
    const shopData = JSON.parse(jsonData);
    const categoryData = shopData.category.find(c => c.id == idCate);
    // console.log(idCate);
    // console.log(categoryData);
    res.status(200).json({ categoryData: categoryData });
}

const handlesUpdateCategory = async (req, res) => {
    const { nameEdit, motaEdit, imageEdit, nameCategoryOld, imageCategoryOld, idCategoryOld } = req.body;
    const jsonData = fs.readFileSync('./data/shopData.json');
    const shopData = JSON.parse(jsonData);
    const checkCategoryExits = shopData.category.forEach(item => {
        if(nameEdit == nameCategoryOld) return false;
        if(item.name == nameEdit) return true;
    })
    ;(item => {
        return nameEdit == name
    });
    let image;
    // console.log(">>> check name product: ", checkCategoryExits);
    if(req.file == undefined) {
        image =  imageCategoryOld;
    }else {
        image = req.file.filename;
        unLinkImage( imageCategoryOld);
    }
    if(nameEdit == "") {
        res.status(400).json({title: "Xãy ra lỗi!", message: "Vui lòng điền đầy đủ thông tin!"});
    }else if (checkCategoryExits) {
        res.status(400).json({title: "Xãy ra lỗi!", message: "Tên danh mục đã tồn tại!"});
    }else {
        updateCategory(idCategoryOld, {
            name: nameEdit,
            image: image,
            mota: motaEdit
        })
        await shopJson();
        res.status(200).json({categoryData: categories });
    }
}


const order = (req, res) => {
    const jsonData = fs.readFileSync('./data/billData.json');
    const billData = JSON.parse(jsonData);
    const orders = billData.orders;


    res.render('order', {
        order: orders
    });
};
const orderDetail = (req, res) => {
    const id = req.params.id;
    const jsonData = fs.readFileSync('./data/billData.json');
    const billData = JSON.parse(jsonData);
    const order = billData.orders;
    const product = billData.order_products;
    let orderDetail = product.find(item => item.id === parseInt(id));
    if (orderDetail) {
        res.render('order-detail', {
            order: orderDetail,
            product: product
        });
    } else {
        res.status(404).send('Không tìm thấy đơn hàng');
    }
}




const user = (req, res) => {
    res.render('user');
}

module.exports  = {
    dashboard,
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
};
