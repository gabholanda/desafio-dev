const express = require('express');
const router = express.Router();
const passport = require('passport');

// router.get('/login', (req, res) => {
//   res.send('<a href="/auth/login"> login</a>');
// });

router.get('/login', (req, res, next) => {
  passport.authenticate('oauth2', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.get('/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication
    res.redirect('/logged');
  });

router.get('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

router.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(401).json({ message: 'Unauthorized' });
});
module.exports = router;
