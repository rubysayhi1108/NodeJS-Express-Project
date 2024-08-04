const { mysql, fs, connectdb } = require('../config/db');

async function insertBill(data = {}){
    const pool = await connectdb();
    const connection = await pool.getConnection();
    const query = `INSERT INTO orders (hoTen, soDienThoai, email, diaChiCuThe, phuongXa, quanHuyen, tinhThanhPho, shipping, pttt, stt, tong) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [data.hoTen, data.soDienThoai, data.email, data.diaChiCuThe, data.phuongXa, data.quanHuyen, data.tinhThanhPho, data.shipping, data.pttt, data.stt, data.tong];
    pool.query(query, values);
}
async function insertBillProduct(data = {}){
    const pool = await connectdb();
    const connection = await pool.getConnection();
    const query = `INSERT INTO order_products (orderid, name, image, price, quantity, thanhTien) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [data.orderId, data.name, data.image, data.price, data.quantity, data.thanhTien];
    pool.query(query, values);
}
module.exports = {
    insertBill,
    insertBillProduct
}
