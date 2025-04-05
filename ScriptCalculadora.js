function operacionesBasicas() {
    let pantalla = document.getElementById("pantalla");
    let botones = document.querySelectorAll(".botones button");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            let valor = boton.textContent;
            let contenidoActual = pantalla.value;

            if (valor === "C") {
                pantalla.value = "";
                return;
            }

            if (valor === "=") {
                try {
                    // Reemplazar "×" por "*" y "−" por "-"
                    let expresion = contenidoActual.replace("×", "*").replace("−", "-");

                    // Detectar intento de dividir 0 entre 0
                    if (expresion.includes("0/0")) {
                        pantalla.value = "¿que haces? 🤔";
                        return;
                    }

                    pantalla.value = eval(expresion);
                } catch {
                    pantalla.value = "Error";
                }
                return;
            }

            // Manejo de resta como número negativo
            if (valor === "−") {
                if (contenidoActual === "" || "+×/".includes(contenidoActual.slice(-1))) {
                    pantalla.value += "-"; // Permitir negativos
                } else {
                    pantalla.value += "−"; // Permitir resta normal
                }
                return;
            }

            // Evitar operadores consecutivos
            if ("+×/".includes(valor) && "+×/".includes(contenidoActual.slice(-1))) {
                return;
            }

            pantalla.value += valor;
        });
    });
}

operacionesBasicas();
