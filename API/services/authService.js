const passport = require('passport');

const authService = {}

authService.login = (req, res, next) => {
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
}

authService.callback = (req, res, next) => {
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
        (req, res) => {
            // Successful authentication
            res.redirect('/logged');
        }
}

authService.logout = (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
}

authService.loggedin = (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(401).json({ message: 'Unauthorized' });
}


module.exports = authService;