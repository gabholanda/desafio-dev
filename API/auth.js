const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const User = require('./models/User');

const setPassportStrategy = () => passport.use(new OAuth2Strategy({
    authorizationURL: 'https://github.com/login/oauth/authorize',
    tokenURL: 'https://github.com/login/oauth/access_token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/callback"
}, (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken);
    const values = { username: accessToken }
    User.findOrCreate({
        where: values,
        defaults: {
            username: "someHash" // TODO: create user via hash, guid or another strategy
        }
    })
        .then((user) => {
            cb(null, user)
        })
        .catch((error) => {
            console.error(error);
            cb(error, null);
        });
}
));

const setUserSerialization = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = { setPassportStrategy, setUserSerialization };