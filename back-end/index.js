const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors());

const AnimesRouter = require('./routers/animes.routes');
app.use('/animes', AnimesRouter);

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome my anime´s list');
})

app.listen(PORT, (req, res) => {
    console.log(`Server running on PORT ${PORT}`);
})
