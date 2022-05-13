const router = require('express').Router();
const {registerValidation} = require('../../middleware/validation/authValidation')
const {registerUserController} = require("../../controller/auth.controller")

router.post('/login', async (req,res) => {
  res.send({msg: 'login'})
});

router.post('/register', registerValidation , registerUserController);

module.exports = router;