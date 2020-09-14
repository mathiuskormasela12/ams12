// ===== Pages
// import all modules
const express		= require('express');
const session		= require('express-session');
const cookie		= require('cookie-parser');
const flash			= require('../core/Flasher');
const Crypt			= require('cryptr');

// import all models
const authModel	= require('../models/AuthModel');
const calculateModel = require('../models/CalculateModel');
const studentsModel		= require('../models/StudentsModel');

// init router
const router		= express.Router();

// setup session
router.use(session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true
}));

// setup cookie
router.use(cookie());

const crypt			= new Crypt(process.env.SECRET);

router.get('/', (req, res) => {
	if(req.session.login) {
			calculateModel.getTotalStudents(totalStudents => {
				studentsModel.getSeveralStudents(students => {
					calculateModel.getTotalUsers(totalUsers => {
						calculateModel.getTotalMajors(totalMajors => {
							res.render('index', { 
								message: req.session.message, 
								type: req.session.type, 
								photo: req.session.photo, 
								full_name: req.session.full_name, 
								name: req.session.full_name.split(' ')[0], 
			  				totalStudents,
								totalUsers,
								totalMajors,
								students
							});	
							flash.removeFlash(req);
						});
					});
				});
			});
	} else if(req.cookies.login) {
		req.session.login = true;
		req.session.photo	= req.cookies.photo;
		req.session.email = req.cookies.email;
		req.session.full_name = req.cookies.full_name;
		req.session.password	= req.cookies.password;
		req.session.ids				= req.cookies.ids;
		res.redirect('/');
	}	
	else
		res.redirect('/login');
});

router.post('/', (req, res) => {
	if(req.session.login) {
			calculateModel.getTotalStudents(totalStudents => {
				studentsModel.getAllStudents(students => {
					calculateModel.getTotalUsers(totalUsers => {
						calculateModel.getTotalMajors(totalMajors => {
							res.render('index_post', { 
								message: req.session.message, 
								type: req.session.type, 
								photo: req.session.photo, 
								full_name: req.session.full_name, 
								name: req.session.full_name.split(' ')[0], 
			  				totalStudents,
								totalUsers,
								totalMajors,
								students
							});	
							flash.removeFlash(req);
						});
					});
				});
			});
	} else if(req.cookies.login) {
		req.session.login = true;
		req.session.photo	= req.cookies.photo;
		req.session.email = req.cookies.email;
		req.session.full_name = req.cookies.full_name;
		req.session.password	= req.cookies.password;
		req.session.ids				= req.cookies.ids;
		res.redirect('/');
	}	
	else
		res.redirect('/login');
});

router.get('/profile', (req, res) => {
	if(req.session.login) {
		const profile = authModel.getProfile(req.session.ids, result => {
		res.render('profile', { message: req.session.message, type: req.session.type, photo: req.session.photo, full_name: req.session.full_name, email: req.session.email,  name: req.session.full_name.split(' ')[0], username: result.username, password: crypt.decrypt(req.session.password), id: req.session.ids });
			flash.removeFlash(req);
		});
	}	else if (req.cookies.login) {
		req.session.login = true;
		req.session.photo	= req.cookies.photo;
		req.session.email = req.cookies.email;
		req.session.full_name = req.cookies.full_name;
		res.redirect('/profile');
	}
	else
		res.redirect('/login');
});

router.get('/add', (req, res) => {
	if(req.session.login) {
		res.render('add', { message: req.session.message, type: req.session.type, photo: req.session.photo, full_name: req.session.full_name, email: req.session.email,  name: req.session.full_name.split(' ')[0]  });
		flash.removeFlash(req);
	} else if(req.cookies.login) {
		req.session.login = true;
		req.session.photo = req.cookies.photo;
		req.session.email = req.cookies.email;
		req.session.full_name = req.cookies.full_name;
		res.redirect('/add');
	} else
			res.redirect('/login');
});

router.get('/edit/:id', (req, res) => {
	const id = req.params.id;
	if(req.session.login) {
		studentsModel.getStudentById(id, result => {
			res.render('edit', { 
				id, 
				result,
				message: req.session.message, 
				type: req.session.type, 
				photo: req.session.photo, 
				full_name: req.session.full_name, 
				email: req.session.email,  
				name: req.session.full_name.split(' ')[0]  
			});
			flash.removeFlash(req);
		});
	}	else if(req.cookies.login) {
		req.session.login = true;
		req.session.photo = req.cookies.photo;
		req.session.email = req.cookies.email;
		req.session.full_name = req.cookies.full_name;
		res.redirect('/edit/:id');
	} else
			res.redirect('/login');
});

router.get('/register', (req, res) => {
	if(req.session.login) {
		res.render('register', { message: req.session.message, type: req.session.type, photo: req.session.photo, full_name: req.session.full_name, email: req.session.email,  name: req.session.full_name.split(' ')[0]  });
		flash.removeFlash(req);
	} else if(req.cookies.login) {
		req.session.login = true;
		req.session.photo = req.cookies.photo;
		req.session.email = req.cookies.email;
		req.session.full_name = req.cookies.full_name;
		res.redirect('/register');
	} else
			res.redirect('/login');
});

router.get('/login', (req, res) => {
	res.render('login', { message: req.session.message, type: req.session.type  });
	flash.removeFlash(req);
});

module.exports = router;
