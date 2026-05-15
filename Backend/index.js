import express from 'express';
import { connection } from './dataBase/connection.js';






const app = express()
const port = 3000
connection();



app.use(express.json());

app.get('', (req, res) => {

    res.send("Hello World!");


});
app.listen(port, () => {

    console.log(`server is running....... on ${port}`);

});