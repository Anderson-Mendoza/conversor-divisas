const apiKey = "2a85cb647a51f0b73ca24496";
const apiUrl = "https://v6.exchangerate-api.com/v6/" + apiKey + "/latest/USD";

// Elementos del DOM
const cantidad = document.getElementById("cantidad");
const monedaOrigen = document.getElementById("moneda-origen");
const monedaDestino = document.getElementById("moneda-destino");
const resultado = document.getElementById("resultado");
const botonConvertir = document.getElementById("convertir");

// cargar las opciones de monedas

async function cargarMonedas() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok)
            throw new Error("Error al obtener datos de la API");
        const data = await response.json();
        const monedas = Object.keys(data.conversion_rates);

        seleccionarDivisa(monedas)

        // Llenar los selectores con las monedas disponibles

        // monedas.forEach(moneda => {
        //     const opcion1 = document.createElement("option");
        //     const opcion2 = document.createElement("option");
        //     opcion1.value = opcion2.value = moneda;
        //     opcion1.textContent = opcion2.textContent = moneda;
        //     monedaOrigen.appendChild(opcion1);
        //     monedaDestino.appendChild(opcion2);
        // });


    } catch (error) {
        console.error("Error:", error);
        resultado.textContent = "No se pudieron cargar las monedas "

    }
}


function seleccionarDivisa(moneda) {
    moneda.forEach(moneda => {
        const opcion1 = document.createElement("option");
        const opcion2 = document.createElement("option");
        opcion1.value = opcion2.value = moneda;
        opcion1.textContent = opcion2.textContent = moneda;
        monedaOrigen.appendChild(opcion1);
        monedaDestino.appendChild(opcion2);
    })
}


//Realizar la conversion 
async function convertirDivisa() {
    try {
        const cantidadValor = parseFloat(cantidad.value);
        if (isNaN(cantidadValor) || cantidadValor <= 0) {
            resultado.textContent = "por favor ingresa una cantidad valida ";
            return;
        }

        const from = monedaOrigen.value;
        const to = monedaDestino.value;

        const response = await fetch(`${apiUrl}`);
        if (!response.ok) throw new Error("Error al obtener datos de la API");
        const data = await response.json();

        const tasaCambio = data.conversion_rates[to] / data.conversion_rates[from];
        const total = cantidadValor * tasaCambio;

        resultado.textContent = `${cantidadValor} ${from} = ${total.toFixed(2)} ${to}`

    } catch (error) {
        console.error("Error:", error);
        resultado.textContent = "Error al realizar la conversion"
    }
}

//Eventos
window.addEventListener("load", cargarMonedas);
botonConvertir.addEventListener("click", convertirDivisa);