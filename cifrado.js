var fraseActual = [];
var fraseCifrada = [];
var fraseDecifrada = [];

const tituloFraseCifrada = document.getElementById("tituloFraseCifrada");
const tituloFraseActual = document.getElementById("tituloFraseActual");
const tituloFraseDecifrada = document.getElementById("tituloFraseDecifrada");

const pFraseCifrada = document.getElementById("fraseCifrada");
const pFraseDecifrada = document.getElementById("fraseDecifrada");

const botonCifrar = document.getElementById("botonCifrar");
const botonDecifrar = document.getElementById("botonDecifrar");

const cajaTexto = document.getElementById("entradaFrase");
const cajaClave = document.getElementById("clave");

const abecedario = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

if (fraseCifrada.length == 0) {
    tituloFraseCifrada.textContent = "";
    pFraseCifrada.textContent = "";
}

botonCifrar.onclick = function() {
    if (cajaTexto.value === '') {
        alert("Debe introducir al menos un caracter para cifrar. Intente de nuevo.")
    } else {
        let clave = cajaClave.value;
        fraseActual = cajaTexto.value.toLowerCase();
        fraseCifrada = [];
        pFraseCifrada.textContent = '';
        pFraseDecifrada.textContent = '';
        tituloFraseDecifrada.textContent = '';

        tituloFraseCifrada.textContent = "La frase cifrada es:"

        let fraseArreglo = Array.from(fraseActual);
        fraseArreglo.forEach(letra => {
            if (letra === ' ') {
                fraseCifrada.push(letra);
                pFraseCifrada.textContent = pFraseCifrada.textContent + letra;
            } else {
                let index = abecedario.indexOf(letra);
                if (index >= 0){
                    clave = parseInt(clave);
                    let valorIndex = obtenerValorArregloCircular(index + clave);
                    
                    fraseCifrada.push(valorIndex);
                    pFraseCifrada.textContent = pFraseCifrada.textContent + valorIndex;
                }
            }
        });
        
        pFraseCifrada.style.fontWeight = "bold";

        cajaTexto.value = "";

        fraseDecifrada = "";
        pFraseDecifrada.textContent = "";

        botonCifrar.disabled = true;
        botonDecifrar.disabled = true;
    }
}

botonDecifrar.onclick = function() {
    if (cajaTexto.value === '') {
        alert("Debe introducir al menos un caracter para decifrar. Intente de nuevo.")
    } else {
        let fraseArreglo = Array.from(cajaTexto.value.toLowerCase());
        fraseDecifrada = [];
        pFraseDecifrada.textContent = '';
        let clave = cajaClave.value;


        fraseArreglo.forEach(letra => {
            if (letra === ' ') {
                fraseDecifrada.push(letra);
                pFraseDecifrada.textContent = pFraseDecifrada.textContent + letra;
            } else {
                let index = abecedario.indexOf(letra);
                if (index >= 0) {
                    clave = parseInt(clave);
                    let valorIndex = obtenerValorArregloCircular(index - clave);
                    console.log(valorIndex);
                    fraseDecifrada.push(valorIndex);
                    pFraseDecifrada.textContent = pFraseDecifrada.textContent + valorIndex;
                }
            }
        });

        tituloFraseDecifrada.textContent = "Frase decifrada:"
        cajaTexto.value = '';
        fraseCifrada = "";
        pFraseCifrada.textContent = "";
        tituloFraseCifrada.textContent = "";

        botonCifrar.disabled = true;
        botonDecifrar.disabled = true;
    }
}

function obtenerValorArregloCircular(index) {
    console.log(index);
    let nuevoIndice = ((index % abecedario.length) + abecedario.length) % abecedario.length;
    return abecedario[nuevoIndice];
}

if (cajaClave.value === '') {
    botonCifrar.disabled = true;
    botonDecifrar.disabled = true;
}

cajaClave.oninput = function() {
    if (cajaClave.value === '' || cajaTexto.value === '') {
        botonCifrar.disabled = true;
        botonDecifrar.disabled = true;
    } else {
        botonCifrar.disabled = false;
        botonDecifrar.disabled = false;
    }
}

cajaTexto.oninput = function() {
    if (cajaClave.value === '' || cajaTexto.value === '') {
        botonCifrar.disabled = true;
        botonDecifrar.disabled = true;
    } else {
        botonCifrar.disabled = false;
        botonDecifrar.disabled = false;
    }
}