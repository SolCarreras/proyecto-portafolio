let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  renderCarrito();
}

function renderCarrito() {
  const lista = document.getElementById("carrito");
  lista.innerHTML = "";
  carrito.forEach((item, i) => {
    lista.innerHTML += `<li>${item.nombre} - $${item.precio}</li>`;
  });
  document.getElementById("total").innerText = total;
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
  } else {
    alert("¡Gracias por tu compra! 🥳");
    carrito = [];
    total = 0;
    renderCarrito();
  }
}
