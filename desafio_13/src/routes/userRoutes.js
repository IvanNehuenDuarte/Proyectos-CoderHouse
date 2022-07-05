const router = require('express').Router();
const { renderIndex, renderSignupForm, renderSigninForm, signin, signup, logout } = require('../controllers/userController');


router.get('/', renderIndex);

router.get('/signup', renderSignupForm);

router.post('/signup', signup);

router.get('/signin', renderSigninForm);

router.post('/signin', signin);

router.get('/logout', logout);

module.exports = router;