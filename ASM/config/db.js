const mysql = require('mysql2/promise');
const fs = require('fs').promises;

async function connectdb() {
    const pool = await mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ruby-watch',
        waitForConnection: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    return pool;
}

module.exports = {
    mysql,
    fs,
    connectdb
};
