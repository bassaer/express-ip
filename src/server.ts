import express from 'express';

const app = express();

app.use('/', (req, res, next) => {
    res.send("OK");
});

const port = process.env.PORT || 80;
app.listen(port, () => { console.log(`start: http://localhost:${port}`) })
