const router = require('./adsRouter');
const adsData = require('./adsData.json');
const fs = require('fs');

router.put('/put/:id', async (req, res) => {
    const {id} = req.params;
    const {username, advert, category} = req.body;
    const foundAd = adsData.find(el => el.id === Number(id));
    if(foundAd) {
        if(!username || !advert || !category) {
          res.sendStatus(400);
        } else {
            foundAd.username = username;
            foundAd.advert = advert;
            foundAd.category = category;
            const newData = adsData.map(el => el.id === foundAd.id ? foundAd : el);
            fs.writeFile("adsData.json", `${JSON.stringify(newData)}`, "utf-8", (err) => {
                err ? err : console.log('Zapisano nowe ogłoszenie');
            });
            res.send('Dane zaktualizowane')
        }
    } else {
        res.sendStatus(404);
    }
});

router.patch('/patch/:id', async (req, res) => {
    const {id} = req.params;
    const {advert} = req.body;
    const foundAd = adsData.find(el => el.id === Number(id));
    if(foundAd) {
        foundAd.advert = advert;
        const newData = adsData.map(el => el.id === foundAd.id ? foundAd : el);
        fs.writeFile("adsData.json", `${JSON.stringify(newData)}`, "utf-8", (err) => {
            err ? err : console.log('Zapisano nowe ogłoszenie');
        });
        res.send('Dane zaktualizowane')
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;