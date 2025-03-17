const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Book Review Service 📚');
});

// Endpoint to add a new book
app.post('/books', (req, res) => {
    const { isbn, title, author, review } = req.body;

    if (!isbn || !title || !author) {
        return res.status(400).json({ error: 'ISBN, title, and author are required' });
    }

    const newBook = { isbn, title, author, review: review || '' };

    // Here, you can add the book to a database or an array
    console.log('New book added:', newBook);

    res.status(201).json({ message: 'Book added successfully', book: newBook });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
