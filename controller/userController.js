const { initDb, getDb } = require('../database/connect');




async function addUser(req, res) {
  try {
    // Initialize the DB connection (only connects the first time)
    
    await initDb();

    // Get the already-initialized DB instance
    const db = getDb();
    const usersCollection = db.collection('refuge');

    const { name, email, phone, source, reason, consent } = req.body;

    // Simple validation
    if (!name || !email || !consent) {
      return res.status(400).json({ message: 'Name, email, and consent are required.' });
    }

    const newUser = {
      name,
      email,
      phone: phone || null,
      source: source || null,
      reason: reason || null,
      consent: consent === 'on' || consent === true,
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'User added to waitlist!', userId: result.insertedId });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ message: 'Internal server error' , error: err.message});
  }
}

module.exports = { addUser };