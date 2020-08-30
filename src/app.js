const express= require('express');
const path = require('path');
const morgan = require('morgan')
const mysql = require('mysql')
const myConnection = require('express-myconnection');
const app = express();

// importing routes
const customerRoutes = require('./router/customer');
// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// middleware
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: '192.168.99.102',
  user: 'root',
  password: '123',
  port: 3306,
  database: 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', customerRoutes);

//starting server
app.listen(app.get('port'),()=>{
    console.log('servidor activo')
})

// static files
app.use(express.static(path.join(__dirname, 'public')));