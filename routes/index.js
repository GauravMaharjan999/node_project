const express = require('express');
const router = express.Router();


let users = []; //id, name, email, address



//get all users, request method : get 
router.get('/users', (req, res) => {
    res.json(users);

})


// create a user , request method : post
router.post('/users', (req, res) => {
    users.push(req.body);
    res.status(201).json(req.body);
})

//get user by id , request method :Get
router.get('/users/:id', (req, res) => {
    let user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) res.status(404).send('The user with the given id is not found');

    res.json(user)
})


module.exports = router