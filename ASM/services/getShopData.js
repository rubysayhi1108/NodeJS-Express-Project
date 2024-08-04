const { mysql, fs, connectdb } = require('../config/db');
async function shopJson() {
    try {
        const pool = await connectdb();
        const connection = await pool.getConnection();
        const [product, productFields] = await connection.query('SELECT * FROM products ORDER BY id DESC  ');
        const [category, categoryFields] = await connection.query('SELECT * FROM categories ORDER BY id DESC ');
        const shopData = {
            product : product,
            category : category

        };
        const jsonData = JSON.stringify( shopData, null, 2);
        await fs.writeFile('./data/shopData.json', jsonData);
        connection.release();
        pool.end();
        return shopData; 
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
}
module.exports = {
    shopJson
}