import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors  from 'cors';
import Conect from './Src/db/conectdb.js';
import AuthRoute from './Src/routes/AuthRoute.js';
import StudentRoute from './Src/routes/studentRoute.js'
dotenv.config();
Conect();
const app = express()
const port =  process.env.Port || 3000

app.use(morgan("dev"));
 app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use("/api/auth", AuthRoute);
app.use("/api/student",StudentRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})