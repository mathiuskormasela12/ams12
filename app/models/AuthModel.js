// ===== Auth Model
// import all modules
const Database	= require('../core/Database'); 
const bcrypt		= require('bcryptjs');

class AuthModel extends Database {
	
	register({ full_name, username, email,  password },photo , send) {		
		this.db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, data) => {
			if(err) {
				console.log(err);
				send('Server Error', 'danger', '/register');
			}
			else if(data.length > 0) 
				send('Username or email has been used', 'warning', '/register');
			else {
				const hash = await bcrypt.hash(password, 8);
				this.db.query('INSERT INTO users SET ?', { full_name, username, email, password: hash, photo   }, err => {
					if(err) {
						console.log(err);
						send('Server Error', 'danger', '/register');
					}
					else
						send('New user has been registered', 'success', '/register')
				});
			}
		});
	}

	login(username, password, send) {
		this.db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, username], async (err, data) => {
			if(err) {
				console.log(err);
				send('Server Error', 'danger', '/login', {photo: '', full_name: '', email: ''});
			} else if(data.length < 1 || !(await bcrypt.compare(password, data[0].password)))
				send('Wrong username or password', 'warning', '/login', { photo: '', full_name: '', email: ''  });
			else
				send('', 'success', '/', { photo: data[0].photo, full_name: data[0].full_name, email: data[0].email, id: data[0].id  });
		});
	}

	getProfile(id, send) {
		this.db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
			if(err)
				console.log(err);
			else 
				send(result[0]);
		})
	}

	async edit({ full_name, username, email, id, password }, photo, send) {
		const hash = await bcrypt.hash(password, 8);
		this.db.query('UPDATE users SET ? WHERE id = ?',[{ full_name, username, email, photo, password: hash }, id], err => {
			if(err) { 
				console.log(err);
				send('Server Error', 'warning', '/profile');
			}
			else
				send('Your profile has been updated', 'success', '/profile');
		});
	}

	remove(id, send) {
		this.db.query('DELETE FROM users WHERE id = ?', [id], err => {
			if(err) {
				console.log(err);
				send('Server Error', 'danger', '/profile');
			} else
					send('User has been removed', 'success', '/login');
		});
	}

}

module.exports = new AuthModel;

