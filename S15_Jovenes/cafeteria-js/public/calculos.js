// =====================================
// FUNCIONES DE CÁLCULO
// =====================================

function calcularDescuento(precio, porcentaje) {
    return precio - (precio * porcentaje / 100);
}

function calcularImpuesto(precio, porcentajeIVA) {
    return precio + (precio * porcentajeIVA / 100);
}

function calcularTotalConEnvio(total, envio) {
    return total + envio;
}

// =====================================
// FUNCIÓN PARA LA INTERFAZ
// =====================================

function procesarCompra() {

    let precio = Number(document.getElementById("precio").value);
    let descuento = Number(document.getElementById("descuento").value);
    let iva = Number(document.getElementById("iva").value);
    let envio = Number(document.getElementById("envio").value);

    let precioDescuento = calcularDescuento(precio, descuento);
    let precioIVA = calcularImpuesto(precioDescuento, iva);
    let total = calcularTotalConEnvio(precioIVA, envio);

    document.getElementById("rDescuento").textContent =
        "$" + precioDescuento.toFixed(2);

    document.getElementById("rIVA").textContent =
        "$" + precioIVA.toFixed(2);

    document.getElementById("rTotal").textContent =
        "$" + total.toFixed(2);
}

// =====================================
// PRUEBAS CONSOLE.LOG()
// =====================================

console.log("=== PRUEBAS CAFETERÍA ===");

let precioCafe = 10000;

let conDescuento = calcularDescuento(precioCafe, 10);
console.log("Precio con descuento:", conDescuento);

let conIVA = calcularImpuesto(conDescuento, 19);
console.log("Precio con IVA:", conIVA);

let totalFinal = calcularTotalConEnvio(conIVA, 3000);
console.log("Total con envío:", totalFinal);

// =====================================
// ERROR PREPARADO A PROPÓSITO
// =====================================

let metodoPago = "efectivo";

// ERROR INTENCIONAL: = en lugar de ===
if (metodoPago = "tarjeta") {
    console.log("Pago con tarjeta");
}