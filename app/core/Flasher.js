// ===== Flasher
class Flasher {
	static setFlash(req, message, type) {
		req.session.message = message;
		req.session.type		= type;
	}
	
	static removeFlash(req) {
		req.session.message	= false;
		req.session.type			= false;
	}
}

module.exports = Flasher;
