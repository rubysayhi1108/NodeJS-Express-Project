const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize'); 
const indexRouter = require('./routes/severRouter');
const adminRouter = require('./routes/adminRouter');
const sequelize = require('./config/admindb');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Kết nối CSDL MySQL
async function connectDB() {
  try {
      const pool = await mysql.createPool({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'ruby-watch',
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0
      });
      console.log('Kết nối CSDL thành công.');
      return pool;
  } catch (error) {
      console.error('Không thể kết nối CSDL:', error);
      throw error;
  }
}
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));
// Kết nối CSDL
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Kết nối CSDL thành công.');
//     })
//     .catch(err => {
//         console.error('Không thể kết nối CSDL:', err);
//     });


// Sử dụng router
app.use('/', indexRouter);
app.use('/admin', adminRouter);
// Cấu hình server
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('uploads'));
// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`-------------------------------------------`);
        console.log(`Đang chạy với http://localhost:${PORT}/home`);
        console.log(`-------------------------------------------`);
        console.log(`http://localhost:${PORT}/admin/dashboard`);
        console.log(`-------------------------------------------`);
    } catch (error) {
        console.error('Không thể khởi động server:', error);
    }
});
