const express = require('express');
const colors = require('colors');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//Initializations
const app = express();
require('./database');
require('./passport/local-auth');

//settings

//rutas de las vistas
app.set('views',path.join(__dirname, 'views'));

//Motor de plantilla ejs
app.engine('ejs',engine);
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(session({ 
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
} ));
//flash debe ir antes de passport y despues de las sessiones ya que connet-flash hace uso de las sesiones al igual que passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
   app.locals.signupMessage= req.flash('signupMessage');
   app.locals.signinMessage = req.flash('signinMessage');
   app.locals.user = req.user;
   next();
});
// setting server
app.set('port', process.env.PORT || 3000);



//Routes
app.use('/', require('./routes/index'));


// starting server la constante app es mi servidor 
app.listen(app.get('port'), () => {

    console.log("Sevidor corriendo en el puerto:".green,app.get('port'));
});


app.get('/', (req, res) =>{ res.send('hola mundo');});
app.get('/about', (req, res) => { res.send('Acerca de nosotros'); });

