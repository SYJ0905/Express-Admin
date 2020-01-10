const express = require('express');

const router = express.Router();
const firebase = require('../plugins/firebase');

const firebaseAuth = firebase.auth();

// route: /login
router.get('/', (req, res) => {
  res.render('login', {
    title: '登入',
    errorMsg: req.flash('errorMsg'),
  });
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.passwd;
  firebaseAuth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      req.session.uid = user.user.uid;
      res.redirect('/');
    })
    .catch((error) => {
      const errorMsg = error.message;
      req.flash('errorMsg', errorMsg);
      res.redirect('/login');
    });
});
module.exports = router;
