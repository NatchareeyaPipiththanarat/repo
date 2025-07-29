require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
//const bodyParser = require('body-parser')

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

////app.get('/products', (req, res) => {
////    const sql = 'SELECT * FROM products';
////    db.query(sql, (err, results) => {
////        if (err) {
        
////            return res.status(500).json({ message: 'Error occured while retrieving products.', error: err });
////        } else {
            
////            return res.status(200).json(results);
////        }
////    });
////});

app.get('/products', (req, res) => {
   db.query('SELECT * FROM products WHERE is_deleted = 0', (err, results) => {
        if (err) return res.status(500).json({error: err.message });
             res.json(results);
    });
});

app.get("/products/:id", (req, res) => {

    const id = Number(req.params.id);
    const sql = 'SELECT * FROM products WHERE id = ? AND is_deleted = 0 ';
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
    const sql = 'SELECT * FROM products WHERE name LIKE ? AND is_deleted = 0';
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

app.post('/products', (req, res) => {
    const { name, price , discount, review_count, image_url} = req.body;
    db.query(
        'INSERT INTO products (name, price , discount, review_count, image_url) VALUES (?, ?, ?, ?, ?)',
        [name, price , discount, review_count, image_url],
        (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({id: result.insertId, message: 'Product created'});
        }
    );
});

app.put('/products/:id', (req, res) => {
    const { name, price , discount, review_count, image_url} = req.body;
    db.query(
        'UPDATE products SET name = ?, price = ?, discount = ?, review_count = ?, image_url = ? WHERE id = ?',
        [name, price , discount, review_count, image_url, req.params.id],
        (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({message: 'Product updated'});
        }
    );
});

app.put('/products/restore/:id', (req, res) => {
    db.query(
        'UPDATE products SET is_deleted = 0 WHERE id = ?',
        [req.params.id],
        (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({message: 'Product restored'});
        }
    );
});

////app.delete('/products/:id', (req, res) => {
////    db.query(
////        'DELETE FROM products WHERE id = ?',
////        [req.params.id],
////        (err) => {
////            if (err) return res.status(500).json({ error: err.message });
////            res.json({message: 'Product deleted'});
////        }
////    );
////});

app.delete('/products/:id', (req, res) => {
    db.query(
        'UPDATE products SET is_deleted = 1 WHERE id = ?',
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({message: 'Product soft-deleted'});
        }
    );
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});