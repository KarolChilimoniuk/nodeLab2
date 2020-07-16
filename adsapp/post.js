const express = require('express');
const router = require('./adsRouter');
const adsData = require('./adsData.json');
const fs = require('fs');
const { nextTick } = require('process');

router.post('/add', async (req, res) => {
    try {
        if(req.user) { 
            const {username, advert, category, price} = req.body;
        const nowDate = new Date();
        const newAd = {
            username: req.user.username,
            id: Math.floor(Math.random() * 100000),
            advert: advert,
            category: category,
            price: price,
            date: `${nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()}-${nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)}-${nowDate.getFullYear()}`
        }
        await adsData.push(newAd);
        fs.writeFile("adsData.json", `${JSON.stringify(adsData)}`, "utf-8", (err) => {
            err ? err : console.log('Zapisano nowe ogłoszenie');
        });
        res.send(`\nużytkownik: ${newAd.username},\nogłoszenie: ${newAd.advert},\nkategorie: ${newAd.category}\n`);
        } else {
            res.send('Zaloguj się');
        }
    } catch(err) {
        next(e);
    }
});


module.exports = router;