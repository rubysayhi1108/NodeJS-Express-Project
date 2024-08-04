const { mysql, fs, connectdb } = require('../config/db');
async function accoutJson(){
    try{
        const pool = await connectdb();
        const connection = await pool.getConnection();
        const [user, userFields] = await connection.query('SELECT * FROM users ');
        const accoutData = {
            user : user,
        };
        const jsonData = JSON.stringify( accoutData, null, 2);
        await fs.writeFile('./data/accountData.json', jsonData);
        connection.release();
        pool.end();
        return accoutData; 
    }catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
}
module.exports = {
    accoutJson
}