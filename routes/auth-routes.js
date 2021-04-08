//Require necessary modules and models
const express    = require('express');
const router = express.Router();
const passport   = require('passport');
const bcrypt     = require('bcryptjs');
const User       = require('../models/user-model');

//POST SIGNUP
router.post('/signup', (req, res, next) => {
    const {username, email, password, role, firstTime} = req.body

    //Validate if there are blank mandatory fields
    if (!username || !email || !password || !role) {
      res.json({ message: 'All fields are mandatory. Please provide your username, email, password and role.' });
      return;
    }

    //Validate if password meets requirements
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!regex.test(password)){
        res.json({ message: 'Password needs to have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

    //Check if email already exists in DB
    User.find({email}, (err, foundUser) => {

        //Check if errors while querying
        if(err){
            res.status(500).json({message: "Email check went bad."});
            return;
        }
        
        //If email exists, return error message
        if (foundUser.length !== 0) {
            console.log(foundUser) 
            res.json({message: 'Email taken. Choose another one.' });
            return;
        }
        
        //Encrypt password
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        
        //Create new instance of User
        const aNewUser = new User({
            username: username,
            password: hashPass,
            email: email,
            role: role,
            firstTime: firstTime
        });
        
        //Save user to DB
        aNewUser.save(err => {
            //Check if error while saving in DB
            if (err) {
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
            
            // Automatically log in user after sign up
            req.login(aNewUser, (err) => {
                //Check if error while logging in
                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
                //Send status 200 w/ user to the frontend
                res.status(200).json(aNewUser);
            });
        });
    });
});


//POST LOGIN
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {

        //Check for errors during auth
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user.' });
            return;
        }
        
        //Check for validaty of email and password
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.json(failureDetails);
            return;
        }
 
        //Save user in session
        req.login(theUser, (err) => {
            //Check for errors during session sabe
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }
 
            res.status(200).json(theUser);
        });
    })(req, res, next);
});


//POST LOGOUT
router.post('/logout', (req, res, next) => {
    //Passport method to logout
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});


//GET LOGGEDIN
router.get('/loggedin', (req, res, next) => {
    //Check if there is a session w/ passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});
 
module.exports = router;