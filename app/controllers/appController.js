// ====== App Controller
// import all modules
const flash					= require('../core/Flasher');
const url						= require('url');
const fs						= require('fs');

// import models
const studentsModel	= require('../models/StudentsModel');

exports.add = async function(req, res) {
	const { 
		student_name: name, 
		nisn, 
		grade, 
		major, 
		birth_place, 
	  birthday } = req.body;
	
	try {
		const photo = await upload(req, res);
	
		if(photo.type !== 'success') {
			flash.setFlash(req, photo.message, photo.type);
			return res.redirect('/add');
		}
	
		studentsModel.add(name, nisn, grade, major, birth_place, birthday, photo.photo, (message, type, action) => {
			flash.setFlash(req, message, type);
			res.redirect(action);
		});
	} catch(err) {
		console.log(err);
	}
}

exports.searchStudents = function(req, res) {
	
	if(req.session.login) {
		const request = url.parse(req.url, true).query;
	
		studentsModel.searchStudents(request.keyword, request.limit, (status, result) => {
			res.status(status).json(result);
		});
	} else if(req.cookies.login) {
			session.login = true;
			req.session.photo = req.cookies.photo;
			req.session.email = req.cookies.email;
			req.session.full_name = req.cookies.full_name;
			req.session.password  = req.cookies.password;
			req.session.ids       = req.cookies.ids;
			res.redirect('/');
	}	else
			res.redirect('/login');
}

exports.editStudent = async function(req, res) {
	
	let photo = '';

	if(!req.files) 
		photo = { photo: req.body.foto }; 
	else {
		photo = await upload(req, res);

		if(photo.type == 'warning' || photo.type == 'danger') {
			flash.setFlash(req, photo.message, photo.type);
			return res.redirect('/');
		} else  {
				fs.unlink('./public/uploads/' + req.body.foto, err => {
					if(err)
						console.log(err);
				})
			}
	}

	studentsModel.editStudent(req.body, photo.photo, (message, type, action, file) => {
		flash.setFlash(req, message, type);
		res.redirect(action);
	});
}

exports.deleteStudent = function(req, res) {
	const id = req.params.id;
	studentsModel.deleteStudent(id, (message, type, action, photo) => {

		if(type == 'success') {
			fs.unlink('./public/uploads/' + photo, err => {
				if(err)
					console.log(errr);
			})
		}
		flash.setFlash(req, message, type);
		res.redirect(action);
	})
}

function upload(req, res) {
	
	if(!req.files) {
		return {
			message: 'You must upload photo',
			type: 'warning'
		}
	}

 const photo 					= req.files.photo;
 const extValid 			= /jpg|jpeg|png/gi;
 const checkType			= extValid.test(photo.name);
 const checkMimeType	= extValid.test(photo.mimetype);

 if(!checkType && !checkMimeType) {
		return {
			message: "You can't upload besides photo",
			type: 'warning'
		}
 }

 if(photo.size > 3000000) {
		return {
			message: 'Photo max 3 mb',
			type: 'warning'
		}
 }

 let file 	= photo.name.split('.')[0];
 const ext	= photo.name.split('.')[1].toLowerCase();
 file += '-';
 file += Date.now();
 file += `.${ext}`;

 photo.mv('./public/uploads/' + file);
 return {
		photo: file,
		type: 'success'
 }

}
