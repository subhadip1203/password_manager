const router = require('express').Router();


router.post('/login', async (req,res) => {
  res.send({msg: 'login'})
});

router.post('/register', async (req,res) => {
  res.send({msg: 'signup'})
});

module.exports = router;