// ===== Auth
// import all modules
const express					= require('express');
const upload					= require('express-fileupload');

// import all controllers
const authController	= require('../controllers/authController');

// init router
const router					= express.Router();

// setup fileupload
router.use(upload({
	createParentPath: true
}));

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/edit', authController.edit);
router.get('/remove', authController.remove);
router.get('/logout', authController.logout);

module.exports = router;
