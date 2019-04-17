const app = require('express')();
var async = require('async');
const bodyParser = require('body-parser');
// Prepare Access-Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  //'GET, POST, OPTIONS, PUT, PATCH, DELETE'); Add as required
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'same-origin');
  next();
});
app.use(bodyParser.json());
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'classicmodels'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.get('/customers', function (req, res) {
  let resBody = [];
  let queryString = 'SELECT * FROM customers';
  if(!!req.query.customerName) {
    queryString += " WHERE customerName Like '%" + req.query.customerName + "%'";
  }
  connection.query(queryString, (err,result) => {
    if(err) {
      return res.status(400).send(err);
    };
    for (let i = 0; i < result.length; i++) {
      const info = {
        customerNumber: result[i]["customerNumber"],
        customerName: result[i]["customerName"]
      };
      resBody.push(info);
    }
    res.writeHead(200, {"Content-Type": "application/json"});
    const json = JSON.stringify(resBody);
    res.end(json);
  });
});

app.get('/orders', function (req, res) {
  let resBody = [];
  if(!req.query.customerNumber) {
    return res.sendStatus(400);
  }
  let queryString = "SELECT * FROM orders WHERE customerNumber = '" + req.query.customerNumber + "'";

  connection.query(queryString, (err,result) => {
    if(err) {
      return res.status(400).send(err);
    };

    async.each(result, function (row, callback) {
      queryString = "SELECT * FROM products INNER JOIN orderdetails ON products.productCode = orderdetails.productCode WHERE orderdetails.orderNumber = " + row["orderNumber"];
      connection.query(queryString, function(emp_err, emp_rows) {
        if (emp_err) callback(emp_err);
        resBody.push(
          {
            orderNumber: row["orderNumber"],
            orderDate: row["orderDate"],
            requiredDate: row["requiredDate"],
            shippedDate: row["shippedDate"],
            status: row["status"],
            comments: row["comments"],
            products: emp_rows
          }
        );
        callback();
      });
    }, function (err) {
      if (err) {
        res.status(400).send(err);
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      const json = JSON.stringify(resBody);
      res.end(json);
    });

  });
});

app.listen(3000, function() {
  console.log('API up and running on port 3000');
});
