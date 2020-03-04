const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../database');

router.get('/',(req, res, next)=>{ 
    res.render('index');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
 });
router.post('/signup', passport.authenticate('local-signup',{
    successRedirect:'/profile',
    failureRedirect: '/signup',
    passReqToCallBack:true
}));

router.get('/profile',isAuthenticated, (req, res, next) => {
    res.render('profile');
});


router.get('/logout', (req, res, next)=>{
     req.logout();
     res.redirect('/');
     

});

router.get('/addpost', (req, res, next) => {
    res.render('addpost');
});

router.post('/addpost', async(req, res) => {
    const {id_user,post} = req.body;
    const newPost = {
        id_user,   
        post
    };
    await pool.query('INSERT INTO POSTS set ?',[newPost]);
    console.log(newPost);
    res.send('recibido');
});

router.get('/postslist', async(req, res) => {
    const postslist = await pool.query('select * from posts');
    console.log(postslist);
    res.render('postslist',{postslist: postslist});
})


router.get('/signin', (req, res, next) => {
    res.render('signin');
 });
router.post('/signin', passport.authenticate('local-signin',{
successRedirect: '/profile',
failureRedirect: '/signin',
passReqToCallback: true
 }));

function isAuthenticated(req, res, next){
    if(req.isAuthenticated())
    {
        return next();

    }
    res.redirect('/');
};
module.exports = router;