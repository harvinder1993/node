const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const UserRoute = require('./app/routes/User')
const MenuRoute = require('./app/routes/Menu')
const AuthRoute = require('./app/routes/Auth');  

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/user',UserRoute)
app.use('/menu',MenuRoute)
app.use('/auth', AuthRoute)

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true
})
.then(() => console.log('Successfully connected to the database'))
.catch(err => console.log('Could not connect to the database', err));

app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
