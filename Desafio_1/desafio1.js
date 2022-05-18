// Clase Usuario

class Usuario {
    constructor(nombre,apellido,libros,mascotas){
    this.nombre=nombre;
    this.apellido=apellido;
    this.libros=libros;
    this.mascotas=mascotas;
    }

// Metodos

    getFullName(){
        console.log(`nombre completo es ${this.nombre} ${this.apellido}`);
    }

    addBook(nombre,autor){
        libros.push({nombre, autor})

    }

    getBookNames(){
        let mapNombres = libros.map( titulo => titulo.nombre)
        console.log(mapNombres);

    }

    addMascotas(perro, gato){
        mascotas.push(perro, gato);
        console.log(mascotas);

    }

    countMascotas(){
        const cantMascotas = mascotas.length;
        console.log(`Tenes ${mascotas.length} mascotas`);

    }
}

// Arrays y variable

let addPet;
let libros=[]
let mascotas=[]


let usuario= new Usuario('Iván','Duarte',libros,mascotas)

// Llamado de metodos

usuario.addBook("The Witcher", "Andrzej Sapkowski")
usuario.addBook("El Señor de los Anillos", "J. R. R. Tolkien")

usuario.getBookNames()

usuario.addMascotas("Torci", "Cleo")
usuario.addMascotas("Napoleon", "Luty")

usuario.countMascotas()

console.log(usuario);