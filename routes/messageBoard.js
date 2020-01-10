const express = require('express');

const router = express.Router();

// route: /messageBoard
router.post('/', () => {

});

// route: messageBoard/success
router.get('/success', (req, res) => {
  res.render('success', {
    title: '註冊成功',
  });
});
module.exports = router;
