const express = require('express');
const authRoute = require('./routes/authRoute');

const app = express();
app.use(express.json());

app.use('/api/auth/', authRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});