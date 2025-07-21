require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
        
            return res.status(500).json({ message: 'Error occured while retrieving products.', error: err });
        } else {
            
            return res.status(200).json(results);
        }
    });
});

app.get("/products/:id", (req, res) => {

    const id = Number(req.params.id);
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            
            return res.status(500).json({ message: 'Error occurred while retrieving product.', error: err });
        } else if (results.length === 0) {
            
            return res.status(404).json({ message: 'Product not found.' });
        } else {
            
            return res.status(200).json({ message: 'Product retrieved successfully.',  data: results });
        }
    });
});


app.get('/products/search/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    const sql = 'SELECT * FROM products WHERE name LIKE ?';
    db.query(sql, [`%${keyword}%`], (err, results) => {
        if (err) {
            
            return res.status(500).json({ message: 'Error occurred while searching for products.', error: err });
        } else if (results.length === 0) {
            
            return res.status(404).json({ message: 'No products found matching the search criteria.' });
        } else {
            return res.status(200).json({ message: 'Products retrieved successfully.', data: results });
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});