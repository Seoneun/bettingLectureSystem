var express = require('express');
var sequelize = require('./models').sequelize;
var app = express();
var cookieParser = require('cookie-parser');
sequelize.sync(); 

app.use(express.urlencoded({extended: false}))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());

var router = require('./router/main')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});
app.use(express.static('public'));