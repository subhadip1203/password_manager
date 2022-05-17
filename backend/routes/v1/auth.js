const router = require('express').Router();
const {registerValidation,loginValidation} = require('../../middleware/validation/authValidation')
const {registerUserController,loginController} = require("../../controller/auth.controller")



router.post('/register', registerValidation , registerUserController);
router.post('/login', loginValidation , loginController);

module.exports = router;