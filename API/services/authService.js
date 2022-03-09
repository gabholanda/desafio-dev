const passport = require('passport');
const jwt = require('jsonwebtoken');

const authService = {}

authService.login = (req, res, next) => {
    try {
        passport.authenticate('oauth2')(req, res, next);
    } catch (error) {
        console.error(error);
    }
}

authService.callback = (req, res, next) => {
    passport.authenticate('oauth2', (err, theUser, failureDetails) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }

        if (!theUser) {
            // "failureDetails" contains the error messages
            res.status(401).json(failureDetails);
            return;
        }
        const token = jwt.sign(theUser, process.env.JWT_SECRET_KEY);
        req.session.jwt = token;
        res.redirect(`${process.env.REDIRECT_URL}check-login?token=${token}`);
    })(req, res, next)
}

authService.logout = (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
}

authService.loggedin = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.send(false);
        } else {
            res.send(user);
        }
    })(req, res);
}


module.exports = authService;