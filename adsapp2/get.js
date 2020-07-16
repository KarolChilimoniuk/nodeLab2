const mongoose = require('mongoose');
const router = require('./adsRouter');

const ad = require('./models/ads.model');
const user = require('./models/user.model');

router.get('/', async (req, res, next) => {
    try { 
      const adsCollection = await ad.find(req.query).populate('username');
      res.send(adsCollection);
    } catch (err) {
       next (err);
    }
});

router.get('/:id', async (req, res, next) => {
    try { 
      const { id } = req.params;
      const rightAd = await ad.findById(id).populate('username');
      res.send(rightAd);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
