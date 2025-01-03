const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5003;

app.use(express.json());
app.use(cors({
    origin: '*',
  }));

// Create and open a new SQLite database
const db = new sqlite3.Database('./foodApp.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Database connected');
    }
});

// Create table if it doesn't exist
db.run(`
   CREATE TABLE IF NOT EXISTS searchHistory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        searchQuery TEXT UNIQUE
    );
`);

// POST
app.post('/api/search', (req, res) => {
    const { searchQuery } = req.body;
    // Insert the search query into the database
    db.run(`INSERT INTO searchHistory (searchQuery) VALUES (?)`, [searchQuery], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Duplicate search query is not allowed.' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, searchQuery });
    });
});

// GET
app.get('/api/search', (req, res) => {
    db.all(`SELECT * FROM searchHistory`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// DELETE
app.delete('/api/search/:id', (req, res) => {
    const { id } = req.params;
    // Delete the search query with the given id
    db.run(`DELETE FROM searchHistory WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            // If no rows were deleted, it means the id wasn't found
            return res.status(404).json({ message: 'Search query not found' });
        }
        res.status(200).json({ message: 'Search query deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});