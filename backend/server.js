const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/profileMessages', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Message Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// API endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(200).json({ success: true, msg: 'Message received!' });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server error.' });
    }
});

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
