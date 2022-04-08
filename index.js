let textoGlobal = '';
let contenedor = document.getElementById('contenedor');

async function recorrerElementos (contenedor) {
    const elementos = contenedor.children;
    let Bpart = false;
    // añadríamos un todos los elementos al array
    for (let i = 0; i < elementos.length; i++) {
        await new Promise (resolve => {
            setTimeout(() => {
                if (elementos[i].innerHTML == 'b') {
                    Bpart = true;
                }
                if (Bpart) {
                    if (elementos[i].innerHTML == 'a') {
                        contenedor.style.transform = `translateX(0px)`;
                        elementos[i].style.transform = `scale(0.75)`;
                        elementos[i].style.filter = 'blur(2px)';
                        elementos[i].style.opacity = '0.5';
                        elementos[i].style.backgroundColor = '#ff0000';
                        i = elementos.length;
                    } else if (elementos[i].innerHTML == 'b') {
                        contenedor.style.transform = `translateX(${(-i - 1) * 100}px)`;
                        elementos[i].style.transform = `scale(0.5)`;
                        elementos[i].style.opacity = '0.5';
                        elementos[i].style.filter = 'blur(2px)';
                    } else {
                        contenedor.style.transform = `translateX(0px)`;
                        elementos[i].style.transform = `scale(0.75)`;
                        elementos[i].style.filter = 'blur(2px)';
                        elementos[i].style.opacity = '0.5';
                        elementos[i].style.backgroundColor = '#ff0000';
                        i = elementos.length;
                    }
                } else if (elementos[i].innerHTML == 'a' || elementos[i].innerHTML == 'b') {
                    contenedor.style.transform = `translateX(${(-i - 1) * 100}px)`;
                    elementos[i].style.transform = `scale(0.5)`;
                    elementos[i].style.opacity = '0.5';
                    elementos[i].style.filter = 'blur(2px)';
                } else {
                    contenedor.style.transform = `translateX(0px)`;
                    elementos[i].style.transform = `scale(0.75)`;
                    elementos[i].style.filter = 'blur(2px)';
                    elementos[i].style.opacity = '0.5';
                    elementos[i].style.backgroundColor = '#ff0000';
                    i = elementos.length;
                }
                resolve();
            }, 500);
         });
    }
    contenedor.style.transform = `translateX(0px)`;
    for (let i = 0; i < elementos.length; i++) {
        new Promise (resolve => {
            setTimeout(() => {
                elementos[i].style.transform = `scale(1)`;
                elementos[i].style.opacity = '1';
                elementos[i].style.filter = 'blur(0px)';
                resolve();
            }, 100);
         });
    }
}

function crearElementos(array) {
    contenedor = document.getElementById('contenedor');

    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }

    for (let i = 0; i < array.length; i++) {
        let elemento = document.createElement('div');
        elemento.className = 'elemento';
        elemento.innerHTML = array[i];
        contenedor.appendChild(elemento);
    }
}

function obtenerCadena() {
    textoGlobal = document.getElementById('texto');
    crearElementos( texto.value );
    return textoGlobal;
}

async function validarCadena() {
    await recorrerElementos( contenedor );
   
    // Obtener el valor de n mediante la repeticion de rg en la cadena
    let n = texto.value.match('[a]{1,}') ? texto.value.match('[a]{1,}')[0].length : 0;
    let m = texto.value.match('[b]{1,}') ? texto.value.match('[b]{1,}')[0].length : 0;;  

    // Obtener el valor real de m
    m = m - n;

    // Establecer el patron
    const patron = new RegExp(`^[a]{${n}}[b]{${n}}[b]{${m}}$`);

    // Validar que la cadena es valida
    if (patron.test(texto.value)) {
        console.log(`${texto.value} es una cadena valida`);
        swal('Cadena valida', `Registro guardado exitosamente en consola\nn = ${n}, m = ${m}`, 'success');
    } else {
        console.log(`${texto.value} no es una cadena valida`);
        swal('Cadena invalida', 'Registro guardado exitosamente en consola', 'error');
    }
}