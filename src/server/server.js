import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createPool } from 'mysql2/promise';

const app = express();

// Enable CORS
app.use(cors({
  origin: '*', // Allows all origins; adjust this to limit access in production.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON requests
app.use(bodyParser.json()); // Parses `application/json`
app.use(bodyParser.urlencoded({ extended: true })); // Parses `application/x-www-form-urlencoded`

// Create a connection pool to MySQL
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'Wzh301712.',
  database: 'icbv',
});



// API to fetch all products
// API to fetch all products
app.get('/products', async (req, res) => {
  try {
    const { categories, priceMin, priceMax } = req.query;

    // Base query
    let query = `
      SELECT 
        id, 
        name, 
        CAST(price AS DECIMAL(10,2)) AS price, 
        category, 
        images, 
        route 
      FROM products 
      WHERE 1=1
    `;
    const params = [];

    // Handle categories filter
    if (categories) {
      query += ' AND category IN (?)';
      params.push(categories.split(',')); // Split comma-separated categories
    }

    // Handle price range filter
    if (priceMin && !isNaN(priceMin)) {
      query += ' AND price >= ?';
      params.push(parseFloat(priceMin));
    }
    if (priceMax && !isNaN(priceMax)) {
      query += ' AND price <= ?';
      params.push(parseFloat(priceMax));
    }

    // Execute the query
    const [rows] = await pool.query(query, params);

    // Process images and route fields
    const sanitizedRows = rows.map((row) => ({
      ...row,
      price: parseFloat(row.price), // Ensure price is a number
      
    }));

    res.json(sanitizedRows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    console.log(req.body);
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(message);
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Insert into database
    const query = `INSERT INTO contact (name, email, phone, message) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [name, email, phone || null, message]);

    return res.status(201).json({ message: 'Contact information saved successfully.', contactId: result.insertId });
  } catch (error) {
    console.error('Error saving contact information:', error);
    return res.status(500).json({ error: 'An error occurred while saving the contact information.' });
  }
});

// API to add a new product
// app.post('/api/products', async (req, res) => {
//   const { name, price, tag, images, review_count, review_stars, route_name, route_params } = req.body;

//   try {
//     const [result] = await pool.query(
//       'INSERT INTO products (name, price, tag, images, review_count, review_stars, route_name, route_params) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//       [name, price, tag, JSON.stringify(images), review_count, review_stars, route_name, JSON.stringify(route_params)]
//     );

//     res.json({ id: result.insertId, message: 'Product added successfully' });
//   } catch (err) {
//     console.error('Error adding product:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
