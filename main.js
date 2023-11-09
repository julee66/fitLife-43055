// Clase y array de Prendas y Accesorios a vender:

class PrendasAccesorios {
    constructor(tipo, precio, stock, imagen) {
        this.tipo = tipo;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }
    restarStock() {
        if (this.stock > 0){
            this.stock--;
        }
        else {
            alert("No quedan mas productos en stock");
        }
    }
}

const listadoPrendasAccesorios = [];

listadoPrendasAccesorios.push(new PrendasAccesorios ("Tops", 7000, 15, "../assets/imagenes/top1.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Tops", 7500, 20, "../assets/imagenes/top2.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Tops", 7300, 12, "../assets/imagenes/top3.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Calzas", 10500, 7, "../assets/imagenes/calza1.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Calzas", 12500, 13, "../assets/imagenes/calza2.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Calzas", 11300, 10, "../assets/imagenes/calza3.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Polleras", 8200, 8, "../assets/imagenes/pollera1.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Polleras", 8900, 7, "../assets/imagenes/pollera2.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Polleras", 9300, 11, "../assets/imagenes/pollera3.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Buzos", 15700, 20, "../assets/imagenes/buzo2.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Buzos", 16900, 14, "../assets/imagenes/buzo3.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Elasticos", 2200, 8, "../assets/imagenes/elastico1.png")); 
listadoPrendasAccesorios.push(new PrendasAccesorios ("Elasticos", 3200, 5, "../assets/imagenes/elastico2.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Mancuernas", 3000, 14, "../assets/imagenes/mancuernas1.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Mancuernas", 3600, 16, "../assets/imagenes/mancuernas3.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Mancuernas", 4500, 16, "../assets/imagenes/mancuernas2.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Tobilleras", 3100, 10, "../assets/imagenes/tobilleras1.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Tobilleras", 3900, 8, "../assets/imagenes/tobilleras2.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Tobilleras", 4300, 12, "../assets/imagenes/tobilleras3.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Colchonetas", 7000, 6, "../assets/imagenes/colchoneta1.png"));
listadoPrendasAccesorios.push(new PrendasAccesorios ("Colchonetas", 8300, 7, "../assets/imagenes/colchoneta3.png"));

// Funcion para guardar en storage productos enviados al carrito:

const guardarEnStorage = (accesorio) => {
    let carritoStorage = JSON.parse(localStorage.getItem("accesorios"));
    if (carritoStorage == null) {
        let carrito = [];
        carrito.push(accesorio);
        localStorage.setItem("accesorios", JSON.stringify(carrito));
    } else {
        carritoStorage.push(accesorio);
        localStorage.setItem("accesorios", JSON.stringify(carritoStorage));
    }
}

// Funciones del bonton (resta el stock, y guarda en storage):

const gestionarCompra = (accesorio, array) => {
    accesorio.restarStock();
    let stockActualizado = document.getElementById(`stock${array.indexOf(accesorio)}`);
    stockActualizado.innerHTML = `Stock: ${accesorio.stock}`;
    guardarEnStorage(accesorio);

};

// Agrego elementos a Pagina Accesorios:

let contenedorAccesorios = document.getElementById("contenedorAccesorios");
contenedorAccesorios.className = "gridImagenes";
let filtroAccesorios = listadoPrendasAccesorios.filter((item) => item.tipo == "Elasticos" || item.tipo == "Mancuernas" || item.tipo == "Tobilleras" || item.tipo == "Colchonetas");

const cargarAccesorios = (arrayAccesorios) => {
    for (let i=0; i < arrayAccesorios.length; i++){
        let item = arrayAccesorios[i];
        let div = document.createElement("div");
        let boton = document.createElement("button");
        boton.innerHTML = "Agregar al carrito";
        boton.className = "botonComprar";
        boton.addEventListener("click", () => gestionarCompra(item, arrayAccesorios));
        let tipo = document.createElement("h3");
        tipo.innerHTML = item.tipo;
        let imagen = document.createElement("img");
        imagen.src = item.imagen;
        let precio = document.createElement("p");
        precio.innerHTML = `Precio: $ ${item.precio}`;
        let stock = document.createElement("p");
        stock.innerHTML = `Stock: ${item.stock}`;
        stock.id = `stock${i}`;
        div.append(tipo, imagen, precio, stock, boton);  
        contenedorAccesorios.append(div);
    };
};
cargarAccesorios(filtroAccesorios);

// Select: para permitir al usuario filtrar por tipo de Accesorios:

const selectAccesorios = ["Todos","Elásticos","Mancuernas","Tobilleras","Colchonetas"];
let contenedorSelectAccesorios = document.getElementById("contenedorSelectAccesorios");
contenedorSelectAccesorios.className = "botonSelect"
let seleccion = document.createElement("select");

for (const accesorio of selectAccesorios){
    let opcion = document.createElement("option");
    opcion.value = selectAccesorios.indexOf(accesorio);
    opcion.innerHTML = accesorio;
    seleccion.append(opcion);
};
contenedorSelectAccesorios.append(seleccion);

// Switch para el Select:

let arrayAccesorios;
const seleccionAccesorio = (e) => {
    const opcion = e.target.value;
    let contenedorAccesorios = document.getElementById("contenedorAccesorios");
    switch (opcion) {
        case "0":
            contenedorAccesorios.innerHTML = "";
            cargarAccesorios(filtroAccesorios);
            break;
        case "1":
            contenedorAccesorios.innerHTML = "";
            arrayAccesorios = filtroAccesorios.filter((item) => item.tipo == "Elasticos");
            cargarAccesorios(arrayAccesorios);
            break;
        case "2":
            contenedorAccesorios.innerHTML = "";
            arrayAccesorios = filtroAccesorios.filter((item) => item.tipo == "Mancuernas");
            cargarAccesorios(arrayAccesorios);
            break;
        case "3":
            contenedorAccesorios.innerHTML = "";
            arrayAccesorios = filtroAccesorios.filter((item) => item.tipo == "Tobilleras");
            cargarAccesorios(arrayAccesorios);
            break;
        case "4":
            contenedorAccesorios.innerHTML = "";
            arrayAccesorios = filtroAccesorios.filter((item) => item.tipo == "Colchonetas");
            cargarAccesorios(arrayAccesorios);
    }
};

seleccion.addEventListener("change", (e)=> seleccionAccesorio(e));


