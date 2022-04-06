//  --- Traemos la librería de "express" ---
const express = require('express');

const app = express();

//  --- constante con el puerto ---
const PORT = 8080;

//  --- Llamada a que se inicie el servidor ---
const server = app.listen(PORT, () => {
    console.log(`Aplicacion express escuchando en http://localhost:${PORT}/productos`);
});

server.on("Error", error => console.log(`Se tiene el siguiente error: ${error}`));

// -------------------  Llamo al json -----------------------
const fs = require('fs');

let dataString = fs.readFileSync('./productos.json', 'utf-8');

//  --------- Parseo el json ---------
let data = JSON.parse(dataString);


// --------- endpints, petición get ----------

//  ---- Mostrar mis productos ----
app.get('/productos', (req, res) => {
    res.send(JSON.stringify(data));
})

//  ---- Mostrar un producto random ----
app.get('/productoRandom', (req, res) => {
    let random = Math.floor(Math.random()*data.length)  //variable random, redondeamos al numero entero mas cercano, ya que Math.random lanza numeros decimales, luego le decimos a Math.random que vaya del indice 0 al ultimo indice de nuestros objetos.
    res.send(JSON.stringify(data[random])); //pasamos a string y decimos que nos devuelta los objetos dentro de data, pero que lo haga desde la variable random, asi de esta manera nos devuelve los objetos, de lo contario mostraria el número de indices.
})

//  ---- Método getById ---
app.get('/api/productos/:id', (req,res) => {
    let productoss = data;

    res.json({
        result:'get by id',
        producto:productoss[req.params.id],
        id:req.params.id
    })

})
