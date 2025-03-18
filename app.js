const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/qr-code-signing');
mongoose.connect('mongodb://localhost/qr-code-signing').then(() => {
    console.log('Ohanz Sever Connected to MongoDB')
}).catch((err) => console.log('Error connecting to MongoDB:', err));


