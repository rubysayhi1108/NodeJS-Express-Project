const { mysql, fs, connectdb } = require('../config/db');

async function insertProduct(data = {}) {
    const pool = await connectdb();
    const connection = await pool.getConnection();
    const purchases = data.purchases === undefined || data.purchases === null ? 0 : data.purchases;
    const query = `INSERT INTO products (name, price, qty, sale, iddm, image, purchases, view) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [data.name, data.price, data.qty, data.sale, data.iddm, data.image, purchases, data.view];
    pool.query(query, values);
}
async function deleteDataProduct(idProduct) {
    const pool = await connectdb();    
    const query = `DELETE FROM products WHERE id = ?`;
    const values = [idProduct];
    pool.query(query, values);
}
async function updateProduct(idProduct, data) {
    const pool = await connectdb();
    const query = `UPDATE products SET name = ?, qty = ?, sale = ?, iddm = ?, image = ? WHERE id = ?`;
    const values = [data.name, data.qty, data.sale, data.iddm, data.image, idProduct];
    await pool.query(query, values);
}
module.exports = {
    insertProduct,
    deleteDataProduct,
    updateProduct
}
