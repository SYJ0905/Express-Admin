const express = require('express');

const router = express.Router();

// route: /login
router.get('/', (req, res) => {
  res.render('login', {
    title: '登入',
  });
});

router.post('/', () => {

});
module.exports = router;
