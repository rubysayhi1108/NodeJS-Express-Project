const { mysql, fs, connectdb } = require('../config/db');

async function insertUser(data = {}){
    const pool = await connectdb();
    const connection = await pool.getConnection();
    const query = `INSERT INTO users (image, username, pass, email, role) 
    VALUES (?, ?, ?, ?, ?)`;
    const values = [data.image, data.username, data.pass, data.email, data.role];
    pool.query(query, values);
}
module.exports = {
    insertUser
}
