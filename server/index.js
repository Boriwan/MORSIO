require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb+srv://jakubstadnik:12345@test.vaqoajx.mongodb.net/?retryWrites=true&w=majority&appName=test"

// Updated MongoDB connection without deprecated options
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});

const usersRouter = require("./api/userListRoute");
const translationRoute = require("./api/translationRoute");
const translationSessionRoute = require("./api/translationSessionRoute");

app.use("/user", usersRouter);
app.use("/translation", translationRoute);
app.use("/translationSession", translationSessionRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
