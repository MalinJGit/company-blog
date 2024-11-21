const express = require('express'),
  path = require('path'),
  dotenv = require('dotenv'),
  { Client } = require('pg');

const app = express();

// Middleware för att kunna ta emot JSON-data i POST-förfrågningar
app.use(express.json());

// CORS-kod för att fixa CORS-problemet
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'https://din-produktionsdomän.se'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  // Tillåt specifika headers och metoder
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Om det är en OPTIONS-begäran, skicka 200 som svar
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use('/Images', express.static(path.join(__dirname, 'Images')));

// Anslut till PostgreSQL-databasen
dotenv.config();
const client = new Client({
  connectionString: process.env.PGURI
});
client.connect();

// Hämta alla blogginlägg
app.get('/api/posts', async (req, res) => {
  try {
    const { rows } = await client.query('SELECT * FROM posts'); // Ändra 'posts' till ditt faktiska tabellnamn
    res.json(rows);
  } catch (error) {
    console.error('Fel vid hämtning av inlägg:', error);
    res.status(500).json({ message: 'Något gick fel.' });
  }
});

// Hämta ett specifikt inlägg
app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await client.query('SELECT * FROM posts WHERE id = $1', [id]); // Ändra 'posts' till ditt faktiska tabellnamn
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Inlägget hittades inte.' });
    }
  } catch (error) {
    console.error('Fel vid hämtning av inlägg:', error);
    res.status(500).json({ message: 'Något gick fel.' });
  }
});

// POST-rutt för att skapa ett nytt inlägg
app.post('/api/posts', async (req, res) => {
  const { title, content, image_url } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO posts (title, content, image_url) VALUES ($1, $2, $3) RETURNING *',
      [title, content, image_url]
    );
    res.status(201).json(result.rows[0]); // Skicka tillbaka det nya inlägget
  } catch (error) {
    console.error('Fel vid skapande av inlägg:', error);
    res.status(500).json({ message: 'Något gick fel.' });
  }
});

// PUT-rutt för att uppdatera ett inlägg
app.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url } = req.body;

  try {
    const result = await client.query(
      'UPDATE posts SET title = $1, content = $2, image_url = $3 WHERE id = $4 RETURNING *',
      [title, content, image_url, id]
    );
    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Inlägget hittades inte.' });
    }
  } catch (error) {
    console.error('Fel vid uppdatering av inlägg:', error);
    res.status(500).json({ message: 'Något gick fel.' });
  }
});

// DELETE-rutt för att ta bort ett inlägg
app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rowCount > 0) {
      res.json({ message: 'Inlägget har tagits bort.' });
    } else {
      res.status(404).json({ message: 'Inlägget hittades inte.' });
    }
  } catch (error) {
    console.error('Fel vid borttagning av inlägg:', error);
    res.status(500).json({ message: 'Något gick fel.' });
  }
});

// Serverinställningar
app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(4000, () => {
  console.log('Redo på http://localhost:4000/');
});
