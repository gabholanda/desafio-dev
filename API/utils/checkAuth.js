checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/login");
}

checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect("/logged");
    next();
}

module.exports = { checkAuthenticated, checkLoggedIn };