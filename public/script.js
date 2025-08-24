// Mensaje inicial
console.log("Portfolio de Antonela cargado correctamente ✅");

// Validación del formulario
document.getElementById("form-contacto").addEventListener("submit", async function(event){
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();

    if(nombre === "" || email === "" || mensaje === ""){
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        let respuesta = await fetch("http://localhost:3000/contacto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, mensaje })
        });

        let data = await respuesta.text();
        alert(data);
        document.getElementById("form-contacto").reset();
    } catch (error) {
        alert("❌ Error al enviar el mensaje");
    }
});

