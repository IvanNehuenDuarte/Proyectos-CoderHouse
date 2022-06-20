const router = require('express').Router();
const { db } = require('../firebase');

router.get('/', async (req, res) => {

    const querySnapshot = await db.collection('products').get()

    const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log(products);

    res.render('index');
});

router.post('/newProducts', async (req, res) => {

    const { title, price, img, stock } = req.body;

    await db.collection('products').add({
        title,
        price,
        img,
        stock
    });

    res.send('Nuevo producto')
});

module.exports = router;