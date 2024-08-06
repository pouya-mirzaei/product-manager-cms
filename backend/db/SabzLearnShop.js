const mysql = require('mysql');

const SabzlearnShopDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product-manager-cms',
});

module.exports = SabzlearnShopDB;
