const express = require('express');
const router = require('./adsRouter');
const adsData = require('./adsData.json');
const { join } = require('path');

router.get('/', (req, res) => {
    adsData.length === 0 ? res.send('brak ogłoszeń') : res.send(`${adsData.map(ad => 
    `\nużytkownik: ${ad.username},\ntreść: ${ad.advert},\ncena: ${ad.price}, \nkategorie: ${ad.category}, \ndata dodania: ${ad.date}\n`)}`);
});

router.get('/id/:id', (req, res) => {
    const {id} = req.params;
    const foundAd = adsData.find(ad => ad.id === Number(id));
    foundAd ? res.send( `\nużytkownik: ${foundAd.username},\ntreść: ${foundAd.advert},\ncena: ${foundAd.price},\nkategorie: ${foundAd.category}, \ndata dodania: ${foundAd.date}\n`) : res.sendStatus(404);
});

router.get('/category/:category', (req, res) => {
    const {category} = req.params;
    const adsWithCategory = adsData.filter(ad => ad.category.includes(category) ? ad : null);
    adsWithCategory.length !== 0 ? res.send(`${adsWithCategory.map(ad => `\nużytkownik: ${ad.username},\ntreść: ${ad.advert}, \ncena: ${ad.price},\nkategorie: ${ad.category}, \ndata dodania: ${ad.date}\n`)}`) : res.sendStatus(404);
});

router.get('/date/:date', (req, res) => {
    const {date} = req.params;
    const adsWithDate = adsData.filter(ad => ad.date === date ? ad : null);
    adsWithDate.length !== 0 ? res.send(`${adsWithDate.map(ad => `\nużytkownik: ${ad.username},\ntreść: ${ad.advert}, \ncena: ${ad.price},}\nkategorie: ${ad.category}, \ndata dodania: ${ad.date}\n`)}`) : res.sendStatus(404);
});

router.get('/author/:author', (req, res) => {
    const {author} = req.params;
    const adsWithAuthor = adsData.filter(ad => ad.username.toLowerCase() === author ? ad : null);
    adsWithAuthor.length !== 0 ? res.send(`${adsWithAuthor.map(ad => `\nużytkownik: ${ad.username},\ntreść: ${ad.advert}, \ncena: ${ad.price},\nkategorie: ${ad.category}, \ndata dodania: ${ad.date}\n`)}`) : res.sendStatus(404);
});

router.get('/price/:price', (req, res) => {
    const {price} = req.params;
    const adsWithPrice = adsData.filter(ad => {
        const joinedPrice = ad.price.split(" ").join("");
        return joinedPrice === price ? ad : null;
    });
    adsWithPrice.length !== 0 ? res.send(`${adsWithPrice.map(ad => `\nużytkownik: ${ad.username},\ntreść: ${ad.advert},\ncena: ${ad.price},\nkategorie: ${ad.category}, \ndata dodania: ${ad.date}\n`)}`) : res.sendStatus(404);
});

router.get('/content/:content', (req, res) => {
    const {content} = req.params;
    const adsWithContent = adsData.filter(ad => {
        const joinedContent = ad.advert.toLowerCase().split(" ").join("");
        return joinedContent.includes(content) ? ad : null;
    });
    adsWithContent.length !== 0 ? res.send(`${adsWithContent.map(ad => `\nużytkownik: ${ad.username},\ntreść: ${ad.advert}, \ncena: ${ad.price},\nkategorie: ${ad.category}, \ndata dodania: ${ad.date}\n`)}`) : res.sendStatus(404);
});

module.exports = router;
