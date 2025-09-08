function mostrarClima() {
  const fecha = document.getElementById("fecha").value;
  const resultado = document.getElementById("resultado");

  if (!fecha) {
    resultado.innerHTML = "<p>📅 Selecciona una fecha</p>";
    return;
  }

  // Por ahora mostramos un clima "ficticio"
  const climas = ["Soleado ☀", "Nublado ☁", "Lluvioso 🌧", "Tormenta ⛈"];
  const temp = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
  const clima = climas[Math.floor(Math.random() * climas.length)];

  resultado.innerHTML = `
    <p><strong>Fecha:</strong> ${fecha}</p>
    <p><strong>Temperatura:</strong> ${temp}°C</p>
    <p><strong>Estado:</strong> ${clima}</p>
  `;
}
