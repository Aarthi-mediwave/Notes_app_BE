const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.set('view engine',  'ejs');

const userRouter = require('./routes/notes');

app.use("/notes", userRouter);



app.listen(3001);