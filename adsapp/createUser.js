const express = require('express');
const { v4: uuid } = require('uuid');
const router = require('./adsRouter');
const usersData = require('./users.json');
const fs = require('fs');

router.post('/add/user', async (req, res) => {
    const {username, password} = req.body;
    const newUser = {
        id: uuid(),
        username: username,
        password: password
    }
    await usersData.push(newUser);
    fs.writeFile("users.json", `${JSON.stringify(usersData)}`, "utf-8", (err) => {
        err ? err : console.log('Zapisano nowego użytkownika');
    });
    res.send(`\nusername: ${newUser.username},\npassword: ${newUser.password}\n`);
});

/* 
{
  "username": "person",
  "password": "per",
  "firstName": "people",
  "lastName": "human"
} */


module.exports = router;