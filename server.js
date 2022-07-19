const express = require('express');
const routes = require('./routes');

const app = express();

// goes to Heroku uses their own port
const PORT = process.env.PORT || 3001;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`));

 