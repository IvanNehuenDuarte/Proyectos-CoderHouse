const express = require('express');
const path = require('path')
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// cambio github

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let dataString = fs.readFileSync('./public/productos.json', 'utf-8');
let dataProduct = JSON.parse(dataString);

app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index', {
        dataProduct
    });
    
})

app.get('/api/products', (req, res)=>{
    res.send(dataProduct);
})

app.get('/api/products/:id', (req,res)=>{

    // let isSame = false;

    // dataProduct.forEach(element =>{
    //     if (element.id === req.params.id) {
    //         isSame = true;
    //     }
    // })

    res.json({
        result:'get by id',
        producto:dataProduct[req.params.id]
        })
})

app.get('/api/newProduct', (req, res) => {
    res.render('newProduct.ejs')
})

app.get('/api/delete/:id', (req, res) => {
    dataProduct = dataProduct.filter(product => product.id != req.params.id);
    
    fs.writeFileSync('./public/productos.json', JSON.stringify(dataProduct));

    res.status(400).end()
})

app.post('/api/newProduct', (req,res)=> {
    let {title, price, img, id} = req.body;
    if (!title && !price && !img) {
        res.status(400).send('Entries must have a title, price and image')
        return
    };
    
    id = [dataProduct.length]

    let newProduct = {
        title,
        id,
        price,
        img
    }

    newProduct.id++

    dataProduct.push(newProduct);


    fs.writeFileSync('./public/productos.json', JSON.stringify(dataProduct));


    res.redirect('/');
})

app.post('/api/cart', (req,res)=>{
    console.log(req.body);
    res.send(dataProduct);
})

// dataProduct.forEach(e => {
//     id = e.id
//     console.log(id);
// })

app.put('/api/update/:id', (req, res) => {
    isSame = false;
    dataProduct.forEach((element, index) => {
        if (element.id === req.params.id) {
            isSame = true;
            dataProduct.splice(index, 1, req.body);

            let newData = JSON.stringify(dataProduct);

            dataProduct.push(newData);

            // fs.writeFileSync('./public/productos.json', JSON.stringify(dataProduct));
        }
    });

    if (isSame) {
        res.status(200).json({"status":200, "message": "Product update"}).end();
    } else {
        res.status(404).json({"status":404, "message": "Product not found"}).end();
    }
})

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${app.get('port')}`);
})
