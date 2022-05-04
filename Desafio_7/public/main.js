let productList = [];
let carrito = [];
let total = 0;

function add(title, id, price) {
    carrito.push(title, id, price);
    total = total + Number(price);
    console.log(carrito);
    document.getElementById('pagar').innerHTML = `Pagar $${total}`
}

async function cart() {
    const productList = await (await fetch('/api/cart',{
        method: 'post',
        body: JSON.stringify(carrito),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json();

    alert(carrito.join(`\n`))
}

window.onload = async() => {
    console.log('fetch');
    productList = await (await fetch('/api/products')).json()
    // console.log(productList);

}


