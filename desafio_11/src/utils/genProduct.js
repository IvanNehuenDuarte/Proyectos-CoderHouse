let faker = require('@faker-js/faker');
faker.locale = 'es';

function genProduct(id) {
    return {
        id: id,
        name: faker.commerce.product(),
        price: faker.commerce.price('$'),
        image: faker.image.food()
    }
};

module.exports = {genProduct};