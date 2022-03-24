checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/login");
}

checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect("/logged");
    return next();
}

module.exports = { checkAuthenticated, checkLoggedIn };