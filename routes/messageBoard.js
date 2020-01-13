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
      console.log('取得資料庫留言');
      const listContent = {
        nickname: dataSnapshot.val().nickname,
        content: req.body.content,
      };
      const listRef = firebaseAdmin.ref('list');
      return listRef.push(listContent);
    })
    .then(() => {
      console.log('加入留言成功');
      res.redirect('/');
    })
    .catch((error) => {
      console.log('加入留言失敗', error.message);
    });
});

module.exports = router;
