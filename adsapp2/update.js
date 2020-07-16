const mongoose = require('mongoose');
const router = require('./adsRouter');

const Ad = require('./models/ads.model');

router.put('/update/:id', async (req, res, next) => {
      try {
        const {id} = req.params;
        const ad = await Ad.findByIdAndUpdate(id, req.body).populate('username');
        res.send('Zmieniono ogłoszenie!');
      } catch(err) {
        next(err);
      }
    });

module.exports = router;