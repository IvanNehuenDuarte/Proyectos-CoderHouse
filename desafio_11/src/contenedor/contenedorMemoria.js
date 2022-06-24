const fs = require('fs');

class ContenedorMemoria {
    constructor(fileName) {
        this.fileName = fileName;
    }

    listarTodos() {
        let content = [];

        try {
            let file = fs.readFileSync(this.fileName, 'utf-8');
            content = JSON.parse(file);
        } catch (error) {
            this.guardarEnArchivo(content);
            console.log(`Creación del archivo ${this.fileName}`);
        }

        return content;
    };

    listar(id) {
        let contentArray = this.listarTodos();
        let content = null;

        if (contentArray.length > 0) {
            let element = contentArray.find(elem => elem.id == id)
            if (element) {
                content = element;
            }
        }

        return content;
    };

    guardar(content) {
        let contentArray = this.listarTodos();
        try {
            contentArray.push(content);
        } catch (error) {
            console.log(error);
        }

        this.guardarEnArchivo(content);
        return content;
    };

    guardarEnArchivo(content) {
        fs.writeFileSync(this.fileName, JSON.stringify(content));
    };

    actualizar(content, id) {
        let contentArray = this.listarTodos();

        let index = contentArray.findIndex(elem => {
            return elem.id === id;
        });

        if (index != -1) {
            contentArray[index] = content;
            this.guardarEnArchivo(contentArray);
        };

        return content;
    };

    borrar(id) {
        let contentArray = this.listarTodos();
        
        if (productos.length > 0) {
            let newProductArray = contentArray.filter(elem => elem.id != id);
            this.guardarEnArchivo(newProductArray);
        };
    };

};

module.exports = ContenedorMemoria;