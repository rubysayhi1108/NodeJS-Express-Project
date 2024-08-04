const { mysql, fs, connectdb } = require('../config/db');

async function billJson() {
    try {
        const pool = await connectdb();
        const connection = await pool.getConnection();
        // Thực hiện câu truy vấn để lấy dữ liệu từ bảng orders và order_products
        const [orders, ordersFields] = await connection.query('SELECT * FROM orders');
        const [orderProducts, orderProductsFields] = await connection.query('SELECT * FROM order_products');
        // Tạo một đối tượng chứa cả dữ liệu từ hai bảng
        const data = {
            orders: orders,
            order_products: orderProducts
        };

        // Chuyển đổi dữ liệu thành JSON và ghi vào tệp
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile('./data/billData.json', jsonData);

        // Giải phóng kết nối và pool
        connection.release();
        pool.end();

        // Trả về dữ liệu
        return data;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
}
module.exports = {
    billJson
};
