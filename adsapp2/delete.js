const mongoose = require('mongoose');
const router = require('./adsRouter');

const Ad = require('./models/ads.model');

router.delete('/del/:id', async (req, res, next) => {
    try { 
      const { id } = req.params;
      await Ad.findByIdAndDelete(id);
      res.status(200).send('usunięto');
    } catch(err) {
        next(err);
    }
});

module.exports = router;