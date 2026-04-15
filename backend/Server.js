import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import Conect from './Src/db/conectdb.js';
import AuthRoute from './Src/routes/AuthRoute.js';
import StudentRoute from './Src/routes/studentRoute.js'
dotenv.config();
Conect();
const app = express()
const port =  process.env.Port || 3000

app.use(morgan("dev"));
 

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use("api/auth", AuthRoute);
app.use("api/student",StudentRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})