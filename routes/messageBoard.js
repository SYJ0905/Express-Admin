const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const firebaseAdmin = require('../plugins/firebase-admin');

const validat = [
  check('content')
    .notEmpty()
    .withMessage('內容不得為空'),
];

// route: /messageBoard
router.post('/', validat, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('errorMessages', errors.array());
    req.flash('errorMessages', errors.array()[0].msg);
    res.redirect('/');
    return;
  }
  firebaseAdmin.ref(`user/${req.session.uid}`).once('value')
    .then((dataSnapshot) => {
      const listContent = {
        nickname: dataSnapshot.val().nickname,
        content: req.body.content,
      };
      const listRef = firebaseAdmin.ref('list');
      listRef.push(listContent)
        .then(() => {
          res.redirect('/');
        });
    });
});

module.exports = router;
