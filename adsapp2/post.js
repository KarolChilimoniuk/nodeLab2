const mongoose = require('mongoose');
const router = require('./adsRouter');

const Ad = require('./models/ads.model');
const User = require('./models/user.model');

router.post('/add', async (req, res, next) => {
    // try{
    //   if(req.user) {
    //     const ad = new Ad(req.body);
    //     ad.advert = req.body.advert;
    //     ad.categories = req.body.categories;
    //     ad.price = req.body.price;
    //     ad.date = new Date();
    //     ad.username = req.user;
    //     await ad.save();
    //     res.status(201).send('Dodano ogłoszenie');
    //   } else {
    //     res.send("Zaloguj się!");
    //   }

    try{
      const ad = new Ad(req.body);
        ad.advert = req.body.advert;
        ad.categories = req.body.categories;
        ad.price = req.body.price;
        ad.date = new Date();
        ad.username = req.user;
        await ad.save();
        res.status(201).send('Dodano ogłoszenie');
    } catch (err) {
      next(err);
    }
  });

  router.post('/users/add', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send('użytkownik dodany');
    } catch(err) {
      next(err);
    }
  
});

/* {
  "username": "admin",
  "password": "alamakota123",
  "firstName": "Jan",
  "lastName": "Kowalski"
} */

module.exports = router;