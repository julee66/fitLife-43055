// Funcion para pasar productos guardados del storage al HTML Carrito:

let objetosDelCarrito = document.getElementById("contenedorCarrito");
let carrito = JSON.parse(localStorage.getItem("accesorios"));

const cargarCarrito = (arrayCarrito) => {
    for (let i=0; i < arrayCarrito.length; i++){
        let item = arrayCarrito[i];
        let div = document.createElement("div");
        let tipo = document.createElement("h3");
        tipo.innerHTML = item.tipo;
        let imagen = document.createElement("img");
        imagen.src = item.imagen;
        let precio = document.createElement("p");
        precio.innerHTML = `Precio: $ ${item.precio}`;
        div.append(tipo, imagen, precio);  
        objetosDelCarrito.append(div);
    };
};
cargarCarrito(carrito);

// Boton comprar para cerrar operacion y limpiar storage:

let botonComprar = document.getElementById("ComprarFinalizar");

const agradecerPorCompra = () => {
    finDeCompra = document.getElementById("contenedorCarrito");
    finDeCompra.innerHTML = "Gracias por su compra";
    localStorage.clear();
}

botonComprar.addEventListener("click", agradecerPorCompra);

