const { mysql, fs, connectdb } = require('../config/db');
async function HomeJson() {
    try {
        const pool = await connectdb();
        const connection = await pool.getConnection();
        const [newRows, newFields] = await connection.query('SELECT * FROM products ORDER BY id DESC LIMIT 7');
        const [topSellerRow, topSellerField] = await connection.query('SELECT * FROM products WHERE purchases = (SELECT MAX(purchases) FROM products) limit 1');
        const [bestSellerRows, bestSellerFields] = await connection.query('SELECT * FROM products ORDER BY purchases DESC');
        const [saleRows, saleFields] = await connection.query('SELECT * FROM products WHERE sale > 0 ORDER BY sale DESC LIMIT 7');
        const [cateRows, cateFields] = await connection.query('SELECT * FROM categories');
        const homeData = {
            newProduct: newRows,
            topSellerProduct :topSellerRow,
            bestSellerProduct: bestSellerRows,
            saleProduct: saleRows,
            category: cateRows
        };
        const jsonData = JSON.stringify( homeData, null, 2);
        await fs.writeFile('./data/homeData.json', jsonData);
        connection.release();
        pool.end();
        return homeData; 
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
}
module.exports = { HomeJson };
