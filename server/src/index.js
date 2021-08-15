import express from 'express';
import cors from 'cors';
import ConnectionRouter from "routes/ConnectionRoute";
const app = express();

app.use(cors());
app.use(ConnectionRouter);

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.listen(3001, () => {
    console.log('listening od port 3001')
});
