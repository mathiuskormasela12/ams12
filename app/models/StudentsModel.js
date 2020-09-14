// import all modules
const moment = require('moment');

// import database
const Database	= require('../core/Database');

class StudentsModel extends Database {
	add(name, nisn, grade, major, birth_place, birthday, photo, send) {
		this.db.query('SELECT * FROM students WHERE nisn = ?', [nisn], (err, data) => {
			if(err) {
				console.log(err);
				send('Server Error', 'danger', '/add');
			} else if(data.length > 0) 
					send('NISN already taken', 'warning', '/add');
			else {
				this.db.query('INSERT INTO students SET ?', { name, nisn, class: grade, major_code: major, birth_place, birthday, photo}, err => {
					if(err) {
						console.log(err);
						send('Server Error', 'danger', '/add');
					} else
							send('Student has been inserted', 'success', '/add');
				});
			}
		});
	}
	getSeveralStudents(send) {
		const sql = `SELECT students.name,
								 students.id,
								 students.nisn,
								 students.class,
								 majors.major_name,
								 students.birth_place,
								 students.birthday,
								 students.photo
								 FROM students
								 INNER JOIN majors ON
								 students.major_code = majors.major_code
								 LIMIT 7
								`;
		this.db.query(sql, (err, results) => {
			if(err)
				console.log(err);
			else {
				results = results.map((item, index) => {
					return {	
										id: item.id,
										no: ++index,
										name: item.name,
										nisn: item.nisn,
										grade: item.class,
										major_name: [...item.major_name].map(item => {
											if(item.match(/[A-Z]/g) == null) {
												item = '';
											}
											return item;
										}).join('') ,
										birthday: `${item.birth_place}, ${moment(item.birthday).format('D MMMM YYYY')}`,
										photo: item.photo,
								}		
				})
				send(results);
			}
		});
	}
	getAllStudents(send) {
		const sql = `SELECT students.name,
								 students.id,
								 students.nisn,
								 students.class,
								 majors.major_name,
								 students.birth_place,
								 students.birthday,
								 students.photo
								 FROM students
								 INNER JOIN majors ON
								 students.major_code = majors.major_code
								`;
		this.db.query(sql, (err, results) => {
			if(err)
				console.log(err);
			else {
				results = results.map((item, index) => {
					return {	
										id: item.id,
										no: ++index,
										name: item.name,
										nisn: item.nisn,
										grade: item.class,
										major_name: [...item.major_name].map(item => {
											if(item.match(/[A-Z]/g) == null) {
												item = '';
											}
											return item;
										}).join('') ,
										birthday: `${item.birth_place}, ${moment(item.birthday).format('D MMMM YYYY')}`,
										photo: item.photo,
								}		
				})
				send(results);
			}
		});
	}
	searchStudents(keyword, limit, send) {

		let sql = `SELECT students.name,
								 students.id,
								 students.nisn,
								 students.class,
								 majors.major_name,
								 students.birth_place,
								 students.birthday,
								 students.photo
								 FROM students
								 INNER JOIN majors ON
								 students.major_code = majors.major_code
								 WHERE 
								 students.name LIKE '%${keyword}%' OR
								 students.nisn LIKE '%${keyword}%'
								`;
		if(limit != '' && limit != null && limit != undefined)
			sql += ' LIMIT 7'

		this.db.query(sql, (err, results) => {
			if(err) {
				send(500, {
					status: 500,
					message: 'Server Error',
					results: ''
				});
			}
			else {
				results = results.map((item, index) => {
				return {	
					id: item.id,
					no: ++index,
					name: item.name,
					nisn: item.nisn,
					grade: item.class,
					major_name: [...item.major_name].map(item => {
						if(item.match(/[A-Z]/g) == null) {
							item = '';
						}
						return item;
					}).join('') ,
					birthday: `${item.birth_place}, ${moment(item.birthday).format('D MMMM YYYY')}`,
					photo: item.photo,
				}		
				});
				send(200, {
					status: 200,
					message: `results from ${results.length} students`,
					results
				});
			}
		});
	}
	
	deleteStudent(id, send) {
		this.db.query('SELECT photo FROM students WHERE id = ?', [id], (err, data) => {
			if(err)
				send('Server Error', 'danger', '/');
			else {
				this.db.query('DELETE FROM students WHERE id = ?', [id], err => {
					if(err)
						send('Server Error', 'danger', '/');
					else
						send('Student has been deleted', 'success', '/', data[0].photo);
				})
			}
		})
	}

	getStudentById(id, send) {
		this.db.query('SELECT * FROM students WHERE id = ?', [id], (err, data) => {
			if(err) 
				console.log(err)
			else {
				data = data.map(item => {
					if(item.class == 'X')
						item.x = true;
					else if(item.class == 'XI')
						item.xi = true;
					else if(item.class == 'XII')
						item.xii = true;
					if(item.major_code == 'a')
						item.akl = true;
					else if(item.major_code == 'b')
						item.otkp = true;
					else if(item.major_code == 'c')
					  item.rpl = true;
					else if(item.major_code == 'd')
						item.bdp = true;
					item.birthday = moment(item.birthday).format('YYYY-MM-DD')
					return item;
				});
				send(data[0]);
			}
		});
	}

	editStudent({ id, student_name: name, nisn, class: grade, major, birth_place, birthday}, photo, send) {
		this.db.query('SELECT * FROM students WHERE id = ?', [id], (err, data) => {
			if(err) {
				console.log(err);
				send('Server Error', 'danger', '/');
			} else if(data.length < 1)
				send('There is not student', 'warning', '/');
			else {
				this.db.query('UPDATE students SET ? WHERE id = ?', [{ name, nisn, class: grade, major_code: major, birth_place, birthday, photo}, id], err => {
					if(err) {
						console.log(err);
						send('Server Error', 'danger', '/');
					} else
							send('Student has been edited', 'success', '/', data[0].photo);
				});
			}
		})
	}

} 

module.exports = new StudentsModel();
