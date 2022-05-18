const express = require("express");
const router = express.Router();
const productos = require("../models/products");

// Todos los productos
const products = (req, res) => {
  return productos
    .productos()
    .then((response) => res.render("index", { data: response }))
    .catch((e) => res.json({ e }));
};

// Un producto por id
const single = (req, res) => {
  return productos
    .productos({ product_id: req.params.id })
    .then((response) => res.json(response))
    .catch((e) => res.json({ e }));
};

// Crear un nuevo producto
const create = (req, res) => {
  let newProduct = ({
    product_name,
    product_price,
    product_img,
    product_stock
  } = req.body);
  console.log(newProduct);

  productos
    .crear(newProduct)
    .then((response) => res.json(response))
    .catch((e) => ({ e }));

  res.redirect("products");
};

// Actualizar un productos
const update = (req, res) => {
  const updateProduct = ({
    product_name,
    product_price,
    product_img,
    product_stock
  } = req.body);

  return productos
    .update({product_id: req.params.id}, updateProduct)
    .then((response) => res.json(response))
    .catch((e) => res.json({ e }));
};

// Eliminar un producto
const remove = (req, res) => {
  const deleteProduct = ({
    product_name,
    product_price,
    product_img,
    product_stock
  } = req.body);

  return productos
    .remove({ product_id: req.params.id }, deleteProduct)
    .then((response) => res.json(response))
    .catch((e) => res.json({ e }))

};

// Metodos HTTP
router.get("/products", products);
router.get("/products/:id", single);
router.get("/newProducts", (req, res) => res.render("newProducts"));
router.post("/newProducts", create);
router.put("/products/:id", update);
router.get("/delete/:id", remove);

module.exports = router;
