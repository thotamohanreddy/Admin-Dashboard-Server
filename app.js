require('dotenv').config();
const mongooseConnection = require('./config/db');
const express = require('express');
const app = express();


mongooseConnection.once('open', () => {
    console.log("Connected to MongoDB");
});
mongooseConnection.on('err', (err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(express.json());

const filterRouter = require('./routes/filter');
app.use('/filter', filterRouter);
const groupRouter = require('./routes/group');
app.use('/group', groupRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log(`server running on the port ${process.env.PORT}`);
})
