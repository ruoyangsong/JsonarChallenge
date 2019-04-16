const app = require('express')();
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
      const row = result[i];
      resBody.push(row);
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
    for (let i = 0; i < result.length; i++) {
      const row = result[i];
      resBody.push(row);
    }
    res.writeHead(200, {"Content-Type": "application/json"});
    const json = JSON.stringify(resBody);
    res.end(json);
  });
});

app.listen(3000, function() {
  console.log('API up and running on port 3000');
});
