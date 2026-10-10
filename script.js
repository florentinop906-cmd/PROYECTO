
// D & S PRÉSTAMOS PERSONALES
// Simulador de referencia, formulario de demostración y WhatsApp.

document.addEventListener("DOMContentLoaded", function () {
  iniciarSimulador();
  iniciarFormulario();
  configurarWhatsapp();
});

// SIMULADOR DE PRÉSTAMOS

function iniciarSimulador() {
  const boton = document.getElementById("btnSimular");
  const monto = document.getElementById("monto");

  if (boton) {
    boton.addEventListener("click", calcularPrestamo);
  }

  if (monto) {
    monto.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter") {
        evento.preventDefault();
        calcularPrestamo();
      }
    });
  }
}

function calcularPrestamo() {
  const monto = Number(document.getElementById("monto").value);
  const cuotas = Number(document.getElementById("cuotas").value);
  const resultado = document.getElementById("resultado");

  if (!Number.isFinite(monto) || monto <= 0) {
    resultado.innerHTML =
      "<p><strong>Ingresá un monto mayor que cero para realizar la simulación.</strong></p>";

    document.getElementById("monto").focus();
    return;
  }

  if (!Number.isFinite(cuotas) || cuotas <= 0) {
    resultado.innerHTML =
      "<p><strong>Seleccioná una cantidad de cuotas válida.</strong></p>";
    return;
  }

  // Se interpreta el 300 % como interés total sobre el capital.
  // Por ejemplo: $100.000 + $300.000 de interés = $400.000.
  // Es una simulación ilustrativa, no una oferta real de financiación.

  const tasaInteresTotal = 3;
  const total = monto + monto * tasaInteresTotal;
  const cuota = total / cuotas;

  document.getElementById("montoResultado").textContent = moneda(monto);
  document.getElementById("interesResultado").textContent = "300 %";
  document.getElementById("cuotasResultado").textContent = String(cuotas);
  document.getElementById("totalResultado").textContent = moneda(total);
  document.getElementById("cuotaResultado").textContent = moneda(cuota);
}

// FORMATO DE MONEDA ARGENTINA

function moneda(numero) {
  return Number(numero).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// FORMULARIO DE CONSULTA

function iniciarFormulario() {
  const formulario = document.getElementById("formulario");

  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const mensaje = document.getElementById("mensajeFormulario");

    mensaje.textContent =
      "Este formulario es una demostración y todavía no envía ni guarda la consulta. Hay que conectarlo con un servicio seguro de recepción antes de publicarlo.";
  });
}

// CONFIGURACIÓN DE WHATSAPP

function configurarWhatsapp() {
  const enlace = document.getElementById("linkWhatsapp");

  if (!enlace) {
    return;
  }

  // Reemplazá el texto vacío por el número oficial.
  // Incluí código de país y área, sin +, espacios ni guiones.
  // Ejemplo de formato: 5492284XXXXXX

  const numeroWhatsapp = "";

  if (numeroWhatsapp.trim() !== "") {
    enlace.href = "https://wa.me/" + numeroWhatsapp;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.textContent = "Consultar por WhatsApp";
  } else {
    enlace.href = "#contacto";
    enlace.textContent = "Configurar WhatsApp";

    enlace.addEventListener("click", function (evento) {
      evento.preventDefault();

      alert(
        "Agregá el número oficial de WhatsApp en el archivo script.js antes de publicar la web."
      );
    });
  }
}
