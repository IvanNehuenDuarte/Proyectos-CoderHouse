const ContenedorMemoria = require('../contenedor/contenedorMemoria');
const { genProduct } = require('../utils/genProduct');
const { genId } = require('../utils/genId');

class ApiProductosMock extends ContenedorMemoria {
    constructor() {
        super('src/data/productosMock.json');
    }

    productosTest(cant = 5) {
        const nuevosProductos = [];

        for (let index = 0; index < cant; index++) {
            const nuevoProducto = genProduct(genId);
            nuevosProductos.push(nuevoProducto);
        };

        this.guardar(nuevosProductos);

        return nuevosProductos;
    }
}

module.exports = ApiProductosMock;