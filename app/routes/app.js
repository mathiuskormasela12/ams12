// ==== App
// import all modules
const express		= require('express');
const upload		= require('express-fileupload');

// import all controller
const appController	=	require('../controllers/appController');

// init router
const router	= express.Router();

// init upload
router.use(upload({
	createParentPath: true
}));

router.post('/add', appController.add);
router.get('/search', appController.searchStudents);
router.post('/edit', appController.editStudent);
router.get('/delete/:id', appController.deleteStudent);

module.exports = router;
