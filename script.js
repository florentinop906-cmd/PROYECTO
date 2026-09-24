/* =========================
   SIMULADOR
========================= */

function simularPrestamo() {

    const monto = Number(
        document.getElementById("monto").value
    );

    const cuotas = Number(
        document.getElementById("cuotas").value
    );

    const resultado =
        document.getElementById("resultadoSimulador");


    if (!monto || !cuotas) {

        resultado.innerHTML =
            "<p>Por favor, completá el monto y la cantidad de cuotas.</p>";

        return;
    }


    if (monto < 10000) {

        resultado.innerHTML =
            "<p>El monto mínimo para esta simulación es de $10.000.</p>";

        return;
    }


    /*
        Tasa solamente de demostración.

        Más adelante podemos reemplazarla por
        los valores reales del proyecto.
    */

    const tasaMensual = 0.08;


    const cuota =
        monto *
        (
            tasaMensual *
            Math.pow(1 + tasaMensual, cuotas)
        )
        /
        (
            Math.pow(1 + tasaMensual, cuotas) - 1
        );


    const total = cuota * cuotas;


    resultado.innerHTML = `

        <h3>Resultado estimado</h3>

        <p>
            Monto solicitado:
            <strong>$${formatearNumero(monto)}</strong>
        </p>

        <p>
            Cantidad de cuotas:
            <strong>${cuotas}</strong>
        </p>

        <p>
            Cuota estimada:
            <strong>$${formatearNumero(cuota)}</strong>
        </p>

        <p>
            Total estimado:
            <strong>$${formatearNumero(total)}</strong>
        </p>

        <small>
            Esta simulación es únicamente orientativa.
        </small>

    `;
}



/* =========================
   CAMBIO DE PASOS
========================= */

function irAPaso(numero) {

    if (numero === 2) {

        if (!validarDatosPersonales()) {
            return;
        }

    }


    if (numero === 3) {

        if (!validarDocumentos()) {
            return;
        }

    }


    if (numero === 4) {

        if (!validarDatosBancarios()) {
            return;
        }

        cargarResumen();
    }


    document.querySelectorAll(".form-step")
        .forEach(function(paso) {

            paso.classList.remove("activo-step");

        });


    const pasoSeleccionado =
        document.getElementById("paso" + numero);


    if (pasoSeleccionado) {

        pasoSeleccionado.classList.add("activo-step");

    }


    actualizarIndicadores(numero);
}



/* =========================
   INDICADORES
========================= */

function actualizarIndicadores(numero) {

    for (let i = 1; i <= 4; i++) {

        const indicador =
            document.getElementById("indicador" + i);


        indicador.classList.remove("activo");


        if (i <= numero) {

            indicador.classList.add("activo");

        }

    }

}



/* =========================
   VALIDAR DATOS PERSONALES
========================= */

function validarDatosPersonales() {

    const nombre =
        document.getElementById("nombre").value.trim();

    const apellido =
        document.getElementById("apellido").value.trim();

    const dni =
        document.getElementById("dni").value.trim();

    const telefono =
        document.getElementById("telefono").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const monto =
        document.getElementById("montoSolicitud").value;


    if (
        !nombre ||
        !apellido ||
        !dni ||
        !telefono ||
        !email ||
        !monto
    ) {

        alert(
            "Por favor, completá todos los datos solicitados."
        );

        return false;
    }


    if (!/^\d{7,8}$/.test(dni)) {

        alert(
            "El DNI debe contener entre 7 y 8 números."
        );

        return false;
    }


    if (Number(monto) <= 0) {

        alert(
            "Ingresá un monto válido."
        );

        return false;
    }


    return true;
}



/* =========================
   VALIDAR DOCUMENTOS
========================= */

function validarDocumentos() {

    const recibo =
        document.getElementById("recibo").files.length;

    const dniFrente =
        document.getElementById("dniFrente").files.length;

    const dniDorso =
        document.getElementById("dniDorso").files.length;


    if (!recibo) {

        alert(
            "Tenés que seleccionar el último recibo de sueldo."
        );

        return false;
    }


    if (!dniFrente) {

        alert(
            "Tenés que seleccionar el frente del DNI."
        );

        return false;
    }


    if (!dniDorso) {

        alert(
            "Tenés que seleccionar el dorso del DNI."
        );

        return false;
    }


    return true;
}



/* =========================
   MOSTRAR ARCHIVO
========================= */

function mostrarArchivo(inputId, textoId) {

    const input =
        document.getElementById(inputId);

    const texto =
        document.getElementById(textoId);


    if (input.files.length > 0) {

        const archivo =
            input.files[0];


        texto.textContent =
            "✓ " + archivo.name;

    } else {

        texto.textContent =
            "Ningún archivo seleccionado";

    }

}



/* =========================
   VALIDAR CBU
========================= */

function validarCBU() {

    const campo =
        document.getElementById("cbu");

    const mensaje =
        document.getElementById("mensajeCBU");


    /*
        Dejamos únicamente números.
    */

    campo.value =
        campo.value.replace(/\D/g, "");


    if (campo.value.length === 22) {

        mensaje.textContent =
            "✓ CBU completo.";

        mensaje.style.color =
            "green";

    } else {

        mensaje.textContent =
            "El CBU debe tener 22 números.";

        mensaje.style.color =
            "#777";

    }

}



/* =========================
   VALIDAR DATOS BANCARIOS
========================= */

function validarDatosBancarios() {

    const cbu =
        document.getElementById("cbu").value.trim();


    if (!/^\d{22}$/.test(cbu)) {

        alert(
            "El CBU debe contener exactamente 22 números."
        );

        return false;
    }


    return true;
}



/* =========================
   CARGAR RESUMEN
========================= */

function cargarResumen() {

    const nombre =
        document.getElementById("nombre").value;

    const apellido =
        document.getElementById("apellido").value;

    const dni =
        document.getElementById("dni").value;

    const telefono =
        document.getElementById("telefono").value;

    const email =
        document.getElementById("email").value;

    const monto =
        Number(
            document.getElementById("montoSolicitud").value
        );

    const cbu =
        document.getElementById("cbu").value;


    document.getElementById("resumenNombre")
        .textContent =
        nombre + " " + apellido;


    document.getElementById("resumenDni")
        .textContent =
        dni;


    document.getElementById("resumenTelefono")
        .textContent =
        telefono;


    document.getElementById("resumenEmail")
        .textContent =
        email;


    document.getElementById("resumenMonto")
        .textContent =
        "$" + formatearNumero(monto);


    /*
        Por seguridad, mostramos solamente
        los últimos 4 números del CBU.
    */

    document.getElementById("resumenCBU")
        .textContent =
        "******************" +
        cbu.slice(-4);
}



/* =========================
   ENVIAR SOLICITUD
========================= */

function enviarSolicitud() {

    const acepto =
        document.getElementById("aceptoTerminos").checked;


    if (!acepto) {

        alert(
            "Debés aceptar la declaración para continuar."
        );

        return;
    }


    /*
        Actualmente esto es solamente
        una demostración del frontend.

        Más adelante conectaremos este botón
        con el backend para enviar:

        - Datos personales
        - Documentos
        - CBU
        - Solicitud
    */


    document.querySelectorAll(".form-step")
        .forEach(function(paso) {

            paso.classList.remove("activo-step");

        });


    document.getElementById("confirmacion")
        .classList.add("activo-step");


    actualizarIndicadores(4);
}



/* =========================
   VOLVER AL INICIO
========================= */

function volverInicio() {

    window.location.href = "#inicio";

}



/* =========================
   FORMATO DE NÚMEROS
========================= */

function formatearNumero(numero) {

    return new Intl.NumberFormat("es-AR", {
        maximumFractionDigits: 0
    }).format(numero);

}