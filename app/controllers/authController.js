// ===== Auth Controller
// import all modules
const flash			 = require('../core/Flasher');
const authModel	 = require('../models/AuthModel');
const fs					= require('fs');
const Crypt			 = require('cryptr');

const crypt			 = new Crypt(process.env.SECRET);

exports.register = async function(req, res) {

	const photo 	 = await upload(req, res);

	if(photo.type === 'warning') {
		req.session.message = photo.message;
		req.session.type		= photo.type;
		return res.redirect('/register');
	}
	
	authModel.register(req.body, photo.photo,  (message, type, action) => {
		flash.setFlash(req, message, type);
		res.redirect(action);
	});

}

exports.login = function(req, res) {
	
	const { username, password  } = req.body;

	if(!username || !password) {
		flash.setFlash(req, "Form can't be empty", 'warning');
		return res.redirect('/login');
	}

	authModel.login(username, password, (message, type, action, { photo, email, full_name, id  }) => {	
		flash.setFlash(req, message, type);
		if(type != 'warning' && type != 'danger') {
			req.session.photo = photo;
			req.session.email = email;
			req.session.full_name = full_name;
			req.session.login = true;
			req.session.password = crypt.encrypt(password);
			req.session.ids = id;
			if(req.body.remember) {
				res.cookie('login', Math.random().toString(), { maxAge: 120000 });
				res.cookie('photo', photo, { maxAge: 120000 });
				res.cookie('email', email, { maxAge: 120000 });
				res.cookie('full_name', full_name, { maxAge: 120000 });
				res.cookie('password', crypt.encrypt(password), { maxAge: 120000 });
				res.cookie('ids', id, { maxAge: 120000 });
			}

		}

		return res.redirect(action);
	});

}

exports.edit	 = async function(req, res) {
		
	let photo = '';

	if(!req.files) {
		photo = { photo: req.session.photo };
	} else {
			photo = await upload(req, res);
		
			if(photo.type === 'warning' || photo.type === 'danger') {
				flash.setFlash(req, photo.message, photo.type);
				return res.redirect('/profile');
			}

			fs.unlink('../public/uploads/' + req.session.photo, err => {
				if(err) {
					console.log(err);
					console.log('wk');
					photo.type = 'danger';
					photo.message = 'Server Error'
				} 
			});
	}
	
	authModel.edit(req.body, photo.photo, (message, type, action) => {
		if(type === 'success') {
			req.session.full_name = req.body.full_name;
			req.session.photo = photo.photo;
			req.session.password = crypt.encrypt(req.body.password);
			req.session.email  = req.body.email;
		}
		flash.setFlash(req, message, type);
		res.redirect(action);
	});
}

exports.remove = function(req, res) {
	authModel.remove(req.session.ids, (message, type, action) => {
		if(type === 'success') {
			fs.unlink('../public/uploads/' + req.session.photo, err => {
				if(err) 
					console.log(err);
				else {
					req.session.login = false;
					req.session.full_name = false;
					req.session.photo = false;
					req.session.password = false;
					req.session.email = false;
				}
			});
		}

		flash.setFlash(req, message, type);
		res.redirect(action);
	});
}

exports.logout = function(req, res) {
	req.session.login = false;
	res.cookie('login', Math.random().toString(), { maxAge: -120000 });
	res.cookie('photo', false, { maxAge: -120000 });
	res.cookie('email', false, { maxAge: -120000 });
	res.cookie('full_name', false, { maxAge: -120000 });

	if(req.cookies.password && req.cookies.ids) {
		res.cookie('ids', false, { maxAge: -120000 });
		res.cookie('password', false, { maxAge: -120000 });
	}
	res.redirect('/login');
}

function upload(req, res) {
		
	try {
		if(!req.files) {
			return {
				message: 'You must upload your photo',
				type: 'warning'
			}
		}

		const photo = req.files.photo;
		const extValid	= /jpg|png|jpeg/gi;
		const checkFileType	= extValid.test(photo.name);
		const checkMimeType	= extValid.test(photo.mimetype);

		if(!checkFileType && !checkMimeType) {
			return {
				message: `You can't upload besided photo`,
				type: 'warning'
			}
		}

		if(photo.size > 3000000) {
			return {
				message: 'Photo size max 3mb',
				type: 'warning'
			}
		}

		const ext = photo.name.split('.')[1].toLowerCase();
		let newphoto = photo.name.split('.')[0];
		newphoto += '-';
		newphoto += Date.now();
		newphoto += `.${ext}`;

		photo.mv('../public/uploads/' + newphoto);
		return { photo: newphoto, type: 'success'  };
	} catch(err) {
		console.log(err);
	}

}
