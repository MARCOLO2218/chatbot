const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/tickets', require('./routes/tickets'));

app.get('/', (req, res) => {
  res.send('IT Tickets Bot activo');
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor activo en puerto ${process.env.PORT}`);
});
