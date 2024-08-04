const { mysql, fs, connectdb } = require('../config/db');

async function insertCategory(data = {}) {
    const pool = await connectdb();
    const connection = await pool.getConnection();
    const query = `INSERT INTO categories (name, image, mota) 
                    VALUES (?, ?, ?)`;
    const values = [data.name,data.image,data.mota];
    pool.query(query, values);
}
async function deleteDataCategory(idCate) {
    const pool = await connectdb();    
    const query = `DELETE FROM categories WHERE id = ?`;
    const values = [idCate];
    pool.query(query, values);
}
async function updateCategory(idCate, data) {
    const pool = await connectdb();
    const query = `UPDATE categories SET name = ?, image = ?, mota = ? where id = ?`;
    const values = [data.name, data.image, data.mota, idCate];
    await pool.query(query, values);
}
module.exports = {
    insertCategory,
    deleteDataCategory,
    updateCategory
}