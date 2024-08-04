// const { mysql, fs, connectdb } = require('../config/db');
// async function accountJson(){
//     try{
//         const pool = await connectdb();
//         const connection = await pool.getConnection();
//         const [users, usersFields] = await connection.query('SELECT * FROM user where');
//         connection.release();
//         pool.end();
//         return users; 
//     }catch (error) {
//         console.error('Lỗi:', error);
//         throw error;
//     }
// }
// module.exports = {
//     accountJson
// }