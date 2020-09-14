// ==== Calculate Model
// import modules
const Database	= require('../core/Database');

class CalculateModel extends Database {
	getTotalStudents(send) {
		this.db.query('SELECT * FROM students', (err, results) => {
			if(err)
				console.log(err);
			else
				send(results.length);
		});
	} 
	getTotalUsers(send) {
		this.db.query('SELECT * FROM users', (err, results) => {
			if(err)
				console.log(err);
			else
				send(results.length);
		});
	}
	getTotalMajors(send) {
		this.db.query('SELECT * FROM majors', (err, results) => {
			if(err)
				console.log(err);
			else
				send(results.length);
		});
	}
}

module.exports = new CalculateModel();
