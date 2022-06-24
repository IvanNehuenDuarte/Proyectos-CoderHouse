let faker = require('@faker-js/faker');
faker.locale = 'es';

function genId() {
    return faker.datatype.uuid();
};

module.exports = {genId}