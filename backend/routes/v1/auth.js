const router = require('express').Router();
const {registerValidation} = require('../../middleware/validation/authValidation')

router.post('/login', async (req,res) => {
  res.send({msg: 'login'})
});

router.post('/register', registerValidation , async (req,res) => {
  res.send({msg: 'signup'})
});

module.exports = router;