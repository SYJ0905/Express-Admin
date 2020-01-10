const express = require('express');

const router = express.Router();
const firebase = require('../plugins/firebase');
const firebaseAdmin = require('../plugins/firebase-admin');

const firebaseAuth = firebase.auth();

// route: /signup
router.get('/', (req, res) => {
  res.render('signup', {
    title: '註冊',
    errorMsg: req.flash('errorMsg'),
  });
});

// route: /signup
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.passwd;
  const nickname = req.body.nickname;
  firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      const userInfo = {
        uid: user.user.uid,
        email: user.user.email,
        nickname,
      };
      firebaseAdmin.ref(`/user/${user.user.uid}`).set(userInfo);
      res.redirect('/signup/success');
    })
    .catch((error) => {
      const errorMsg = error.message;
      req.flash('errorMsg', errorMsg);
      res.redirect('/signup');
    });
});

router.get('/success', (req, res) => {
  res.render('success', {
    title: '註冊成功',
  });
});

module.exports = router;
