// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use(cors());



mongoose
    .connect('mongodb+srv://mohamednihmath13:nihmath2000@cluster0.lgvfsug.mongodb.net/reset-password?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.log('Mongodb Connection Error: ', err));



app.use('/api/auth', authRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
