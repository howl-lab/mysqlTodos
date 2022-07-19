const express = require('express');
const routes = require('./routes');

const app = express();

// Heroku uses their own port 3001 will not work
const PORT = process.env.PORT || 3001;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`));

 