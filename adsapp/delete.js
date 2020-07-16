const express = require('express');
const router = require('./adsRouter');
const adsData = require('./adsData.json');
const fs = require('fs');

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    const foundAd = adsData.find(el => el.id === Number(id));
    if(foundAd) {
        const newData = await adsData.filter(el => el.id !== foundAd.id);
        await fs.writeFile("adsData.json", `${JSON.stringify(newData)}`, "utf-8", (err) => {
            err ? err : console.log('Usunięto ogłoszenie');
        });
        res.send(`${newData.map(el => 
            `\nużytkownik: ${el.username},\nogłoszenie: ${el.advert},\nkategorie: ${el.category}\n`)}`);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;