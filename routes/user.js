const express = require('express');

const router = express.Router();

// route: /user
router.get('/', (req, res) => {
  res.render('user', {
    title: '會員專區',
  });
});
module.exports = router;
