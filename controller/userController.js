const { client } = require('../database/connect');

// Access the database and collection
const db = client.db('refuge'); // use your DB name
const usersCollection = db.collection('users');

async function addUser(req, res) {
  try {
    const { name, email, phone, source, reason, consent } = req.body;

    // Simple validation
    if (!name || !email || !consent) {
      return res.status(400).json({ message: 'Name, email, and consent are required.' });
    }

    // Create user object
    const newUser = {
      name,
      email,
      phone: phone || null,
      source: source || null,
      reason: reason || null,
      consent: consent === 'on' || consent === true,
      createdAt: new Date(),
    };

    // Insert into MongoDB
    const result = await usersCollection.insertOne(newUser);

    // Respond
    res.status(201).json({ message: 'User added to waitlist!', userId: result.insertedId });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { addUser };