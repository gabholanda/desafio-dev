const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { User } = require('./models/index.js');
const axios = require('axios');

const authStrategy = new OAuth2Strategy({
    authorizationURL: 'https://github.com/login/oauth/authorize',
    tokenURL: 'https://github.com/login/oauth/access_token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/callback"
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const options = {
            method: "GET",
            url: "https://api.github.com/user",
            headers: {
                Authorization: `token ${accessToken}`
            }
        }
        const user = await axios(options);
        const values = { username: user.data.login, password: user.data.id.toString() }
        User.findOrCreate({
            where: values
        })
            .then((userDb) => {
                cb(null, values)
            })
    } catch (error) {
        console.error(error);
        cb(error, null);
    }

})

const jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: (req) => req.session.jwt,
        secretOrKey: process.env.JWT_SECRET_KEY,
    },
    (payload, done) => {
        return done(null, payload);
    }
);

const setPassportStrategy = () => {
    passport.use(authStrategy);
    passport.use(jwtStrategy);
}

const setUserSerialization = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = { setPassportStrategy, setUserSerialization };