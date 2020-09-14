// ===== App
// import all modules
const express		= require('express');
const dotenv		= require('dotenv');
const path			= require('path');

// setup dotenv
dotenv.config({ path: './.env'  });

// init app & port
const app				= express();
const port			= process.env.PORT;

// setup for gabbing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup static file
app.use(express.static('../public'));

// setup template engine
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'hbs');

// views
app.use('/', require('./routes/pages'));

// systems
app.use('/auth', require('./routes/auth'));
app.use('/app', require('./routes/app'));

app.listen(port, () => {
	console.log(`Local Computer : http://127.0.0.1:${port}`);
	console.log(`Local Network	: http://192.168.1.32:${port}`);
});
