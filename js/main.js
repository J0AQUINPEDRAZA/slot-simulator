

//variables 
let nombreUsuario = localStorage.getItem('nombreUsuario');
let apellidoUsuario = localStorage.getItem('apellidoUsuario');
let edadUsuario = localStorage.getItem('edadUsuario');
let saldoGuardado = localStorage.getItem('saldoGuardado');
let saldoSession = sessionStorage.getItem('saldoSession');
let inputNombre = sessionStorage.getItem('inputNombre');
let inputApellido = sessionStorage.getItem('inputApellido');
let jugadasSession = sessionStorage.getItem('jugadasSession');
let jugadasGuardadas = sessionStorage.getItem('jugadasGuardadas');
let inventarioGuardado = localStorage.getItem('inventario');
let saldoInicial = 1000;
let jugadas = 1;
let tirada = document.getElementById('tirada');
let saldo = document.getElementById('saldo');
let recarga = document.getElementById('recargaSaldo');
let child1 = document.getElementById('casilla1');
let child2 = document.getElementById('casilla2');
let child3 = document.getElementById('casilla3');
let child4 = document.getElementById('casilla4');
let child5 = document.getElementById('casilla5');
let child6 = document.getElementById('casilla6');
let child7 = document.getElementById('casilla7');
let child8 = document.getElementById('casilla8');
let child9 = document.getElementById('casilla9');

//constantes
const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const edad = document.querySelector('#edad');
const contFormulario = document.querySelector('#contFormulario');
const contenido = document.querySelector('#contenido');
const logout = document.querySelector('#logout');
const modal1 = document.querySelector('#modal1');
const modal2 = document.querySelector('#modal2');
const modalRecarga = document.querySelector('#modalRecarga');
const modalInventario = document.querySelector('#modalInventario');
const alertMenorEdad = document.querySelector('#alertMenorEdad');
const modal = document.querySelector('#modal');
const btnContinuar = document.querySelector('#btnContinuar');
const no = document.querySelector('#no');
const btnCerrar = document.querySelector('#btnCerrar');
const recargar = document.querySelector('#recargar');
const containerTirada = document.getElementById('containerTirada');
const modalCanjear = document.getElementById('modalCanjear');
const btnCanjear = document.querySelector('#btnCanjear');
const btnCerrarCanjear = document.querySelector('#btnCerrarCanjear');
const mandarInventario = document.querySelector('#mandarInventario');
const cerrarRecarga = document.querySelector('#btnCerrarRecarga');
const btnInventario = document.querySelector('#btnInventario');
const btnCerrarInventario = document.querySelector('#btnCerrarInventario');
const skins = document.getElementById('skins');
const inventario = document.getElementById('inventario');
const submit = document.getElementById('jugar');
const salir = document.getElementById('salir');
const chau = document.getElementById('chau');
const YEAR = 2022;
const mayorDeEdad = 18;

//ARRAY DEL INVENTARIO DEL LOCALSTORAGE
const canasta = canastaGuardada = JSON.parse(localStorage.getItem("canastaGuardada")) ?? [];

//ARRAY CON LOS EMOJIS
let demoArray = [`&#128520`, `&#128520`, `&#128520`, `&#128520`, `&#128520`, `&#128520`, `&#128520`, `&#128520`, `&#128520`,
  `&#128526`, `&#128526`, `&#128526`, `&#128526`, `&#128526`, `&#128526`, `&#128526`, `&#128526`, `&#128526`,
  `&#129297`, `&#129297`, `&#129297`, `&#129297`, `&#129297`, `&#129297`, `&#129297`, `&#129297`, `&#129297`];

///////////////////////////LO IN - LOG OUT - VENTANAS EMERGENTES - LOCAL & SESsION STORAGE/////////////////////////////////
modal.style.display = 'none';
//FUNCION DE OCULTAR EL FORMULARIO DE LOGIN Y IMPRIMIR LOS DATOS EN EL HTML
const ocultarFormulario = () => {
  modal.style.display = 'none';
  modal1.style.display = 'none';
  alertMenorEdad.style.display = 'none';
  contenido.innerHTML =
    `<div>NOMBRE: ${nombreUsuario}</div>
  <div>APELLIDO: ${apellidoUsuario}</div>
  <div>EDAD: ${edadUsuario}  años.</div>`;
}

//EVENTO BOTON CONTINUAR DE LA VENTANA DE BIENVENIDA
btnContinuar.onclick = (e) => {
  e.preventDefault();
  alertMenorEdad.style.display = 'none';
  modal.style.display = 'flex';
  modal1.style.display = 'none';
};

//FORMULARIO DE LOG IN - AGREGAR LOS DATOS AL LOCAL STORAGE
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  nombreUsuario = nombre.value;
  apellidoUsuario = apellido.value;
  edadUsuario = YEAR - edad.value;

  //VALIDACION DE EDAD
  if (edadUsuario < mayorDeEdad) {
    alertMenorEdad.style.display = 'flex';
    modal.style.display = 'none';
    localStorage.setItem('esMayorEdad', edadUsuario < mayorDeEdad == false);
    localStorage.clear;
    sessionStorage.clear;
  }
  if (edadUsuario >= mayorDeEdad) {
    localStorage.setItem('nombreUsuario', nombre.value);
    localStorage.setItem('apellidoUsuario', apellido.value);
    localStorage.setItem('edadUsuario', edadUsuario);
    localStorage.setItem('esMayorEdad', edadUsuario >= mayorDeEdad == true);
    localStorage.setItem('canastaGuardada', JSON.stringify(canasta));;
    ocultarFormulario();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'LogIn coreccto',
      showConfirmButton: false,
      timer: 1500
    })
  }
})
//EVENTO BOTON CERRAR VENTANA DE ALERTA MENOR DE EDAD Y VOLVER A LA VENTANA ANTERIOR
btnCerrar.onclick = () => {
  alertMenorEdad.style.display = 'none';
  modal.style.display = 'flex';
};

//VALIDACION PARA OCULTAR FORMULARIO DE LOGIN
if (!!nombreUsuario && !!apellidoUsuario && !!edadUsuario) {
  modal1.style.display = 'none';
}

//EVENTOS PARA RECIBIR LOS DATOS DEL LOGIN Y MANDARLOS AL LOCAL STORAGE
nombre.value = inputNombre;
apellido.value = inputApellido;
nombre.addEventListener('input', (e) => {
  sessionStorage.setItem('inputNombre', e.target.value);
})
apellido.addEventListener('input', (e) => {
  sessionStorage.setItem('inputApellido', e.target.value);
})

//EVENTO PARA DESLOGEAR - LOG OUT
logout.onclick = () => {
  document.getElementById(`txt`).style.display = `none`;
  modal2.style.display = 'flex';
}
//BOTON SALIR DEL LOG OUT
salir.onclick = () => {
  sessionStorage.clear();
  localStorage.clear();
  modal2.style.display = 'none';
};

//BOTON DE NO CERRAR SALIR
no.onclick = () => {
  modal2.style.display = 'none';
};


/////////////////////////////////JUEGO/////////////////////////////////////////

saldo.innerHTML = saldoInicial;

if (saldoGuardado) {
  saldo.innerHTML = saldoGuardado;
}

//RESTAR SALDO POR CADA PATRON PERDEDOR

let restarSaldo = () => {
  saldo.innerHTML = Number(saldo.innerHTML) - Number(tirada.value);
  if (saldo.innerHTML <= 0) {
    saldo.innerHTML = 0;
  }
}

// --- PREMIOS --- MULTIPLICAR TIRADA Y SUMARLO AL SALDO POR CADA PATRON GANADOR

const premioX2 = () => {
  saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value * 2);
}
const premioX4 = () => {
  saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value * 4);
}
const premioX6 = () => {
  saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value * 6);
}
const premioX8 = () => {
  saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value * 8);
}
const premioX10 = () => {
  saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value * 10);
}
const premioX12 = () => {
  saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value * 12);
}
const premioX16 = () => {
  saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value * 16);
}

//mostrar popup ganador y sumar el premio
const popUpx2 = () => {
  document.getElementById(`popUp__boxX2`).style.display = `flex`;
  setTimeout(() => {
    document.getElementById(`popUp__boxX2`).style.display = `none`;
  }, 2100);
  premioX2()
}
const popUpx4 = () => {
  setTimeout(() => {
    document.getElementById(`popUp__boxX4`).style.display = `flex`;
  }, 400);
  setTimeout(() => {
    document.getElementById(`popUp__boxX4`).style.display = `none`;
  }, 2600);
  premioX4()
}
const popUpx6 = () => {
  setTimeout(() => {
    document.getElementById(`popUp__boxX6`).style.display = `flex`;
  }, 400);
  setTimeout(() => {
    document.getElementById(`popUp__boxX6`).style.display = `none`;
  }, 2600);
  premioX6()
}
const popUpx8 = () => {
  setTimeout(() => {
    document.getElementById(`popUp__boxX8`).style.display = `flex`;
  }, 400);
  setTimeout(() => {
    document.getElementById(`popUp__boxX8`).style.display = `none`;
  }, 2600);
  premioX8()
}
const popUpx10 = () => {
  setTimeout(() => {
    document.getElementById(`popUp__boxX10`).style.display = `flex`;
  }, 400);
  setTimeout(() => {
    document.getElementById(`popUp__boxX10`).style.display = `none`;
  }, 2600);
  premioX10()
}
const popUpx12 = () => {
  setTimeout(() => {
    document.getElementById(`popUp__boxX12`).style.display = `flex`;
  }, 400);
  setTimeout(() => {
    document.getElementById(`popUp__boxX12`).style.display = `none`;
  }, 2600);
  premioX12()
}
const popUpx16 = () => {
  setTimeout(() => {
    document.getElementById(`popUp__boxX16`).style.display = `flex`;
  }, 400);
  setTimeout(() => {
    document.getElementById(`popUp__boxX16`).style.display = `none`;
  }, 2600);
  premioX16()
}

//FUNCION DE MEZCLAR ARRAY
function mezclarArray(array) {
  array.sort(() => Math.random() - 0.5);
}

//BORRAR EMOJIS AL VOLVER A JUGAR CAMBIAR SU CLASE
const borrarEmoji = (Element) => {
  Element.className = '';
  Element.innerHTML = '';
}
//animacion de los emojis de la fila1
const animacionEmojisFila1 = (Element) => {
  Element.className = 'emoji1';
}
//animacion de los emojis de la fila2
const animacionEmojisFila2 = (Element) => {
  Element.className = 'emoji2';
}
//animacion de los emojis de la fila3
const animacionEmojisFila3 = (Element) => {
  Element.className = 'emoji3';
}
// GUARDAR JUGADAS EN EL LOCALSTORAGE
let nroJugadas = jugadasGuardadas = localStorage.getItem("jugadasGuardadas") ?? jugadas++;
if (!!jugadasGuardadas >= 0) {
  jugadas = jugadasGuardadas;
}
//CLICK AL BOTON JUGAR - BUCLE DE LA APP - CONTADOR DE CLICKS - SUMA Y RESTA DE PREMIOS - VALIDACION DE PATRONES GANADORES
containerTirada.onsubmit = (e) => {
  e.preventDefault();

  //MEZCLA DEL ARRAY CONTENEDOR DE EMOJIS
  mezclarArray(demoArray);
  borrarEmoji(child1);
  borrarEmoji(child2);
  borrarEmoji(child3);
  borrarEmoji(child4);
  borrarEmoji(child5);
  borrarEmoji(child6);
  borrarEmoji(child7);
  borrarEmoji(child8);
  borrarEmoji(child9);
  //contador de clicks-jugadas - validador de cantidad de jugadas para poder canjear los items por el saldo
  if (saldo.innerHTML > 50) {
    nroJugadas = jugadas++;
    localStorage.setItem('jugadasGuardadas', nroJugadas);
  } else {
    nroJugadas = 0;
    localStorage.setItem('jugadasGuardadas', nroJugadas);
  }
  //BUCLE DEL JUEGO
  while (saldo.innerHTML >= 0) {
    //VALIDACION DE SALDO PARA JUGAR
    if (saldo.innerHTML == 0) {
      document.getElementById(`txt`).style.display = `block`;
      break
    }
    if (saldo.innerHTML > 0) {
      document.getElementById(`txt`).style.display = `none`;
    }

    //INPRESION DE CADA EMOJI EN SU CASILLA CORRESPONDIENTE
    mezclarArray(demoArray)
    let arrayUnido = demoArray.slice(0, 1);
    let casilla1 = `${arrayUnido.join(" ")}`;
    let arrayUnido2 = demoArray.slice(1, 2);
    let casilla2 = `${arrayUnido2.join(" ")}`;
    let arrayUnido3 = demoArray.slice(2, 3);
    let casilla3 = `${arrayUnido3.join(" ")}`;
    let arrayUnido4 = demoArray.slice(3, 4);
    let casilla4 = `${arrayUnido4.join(" ")}`;
    let arrayUnido5 = demoArray.slice(4, 5);
    let casilla5 = `${arrayUnido5.join(" ")}`;
    let arrayUnido6 = demoArray.slice(5, 6);
    let casilla6 = `${arrayUnido6.join(" ")}`;
    let arrayUnido7 = demoArray.slice(6, 7);
    let casilla7 = `${arrayUnido7.join(" ")}`;
    let arrayUnido8 = demoArray.slice(7, 8);
    let casilla8 = `${arrayUnido8.join(" ")}`;
    let arrayUnido9 = demoArray.slice(8, 9);
    let casilla9 = `${arrayUnido9.join(" ")}`;

    if (tirada.value <= Number(saldo.innerHTML)) {
      jugar.disabled = true;
      setTimeout(() => {
        animacionEmojisFila3(child1);
        child1.innerHTML = casilla1;
      }, 100);
      setTimeout(() => {
        animacionEmojisFila2(child2);
        child2.innerHTML = casilla2;
      }, 300);
      setTimeout(() => {
        animacionEmojisFila1(child3);
        child3.innerHTML = casilla3;
      }, 500);
      setTimeout(() => {
        animacionEmojisFila3(child4);
        child4.innerHTML = casilla4;
      }, 900);
      setTimeout(() => {
        animacionEmojisFila2(child5);
        child5.innerHTML = casilla5;
      }, 1100);
      setTimeout(() => {
        animacionEmojisFila1(child6);
        child6.innerHTML = casilla6;
      }, 1300);
      setTimeout(() => {
        animacionEmojisFila3(child7);
        child7.innerHTML = casilla7;
      }, 1700);
      setTimeout(() => {
        animacionEmojisFila2(child8);
        child8.innerHTML = casilla8;
      }, 1900);
      setTimeout(() => {
        animacionEmojisFila1(child9);
        child9.innerHTML = casilla9;
      }, 2100);
      setTimeout(() => {
        jugar.disabled = false;
      }, 2200);

      //VALIDACION DE PATRONES GANADORES

      //PATRON GANADOR COLUMNA Nro 1, Nro 2 y Nro 3 [|||] (9 emojis iguales)
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla9 && casilla6 == casilla8 && casilla6 == casilla7 && casilla6 == casilla1 && casilla6 == casilla2 && casilla6 == casilla3) {
        popUpx16();
        break
      }
      //PATRON GANADOR X12 sin casilla 2
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla9 && casilla6 == casilla8 && casilla6 == casilla7 && casilla6 == casilla1 && casilla6 == casilla3) {
        popUpx12();
        break
      }
      //PATRON GANADOR X12 sin casilla 4
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla9 && casilla6 == casilla8 && casilla6 == casilla7 && casilla6 == casilla1 && casilla6 == casilla2 && casilla6 == casilla3) {
        popUpx12();
        break
      }
      //PATRON GANADOR X12 sin casilla 8
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla9 && casilla6 == casilla7 && casilla6 == casilla1 && casilla6 == casilla2 && casilla6 == casilla3) {
        popUpx12();
        break
      }
      //PATRON GANADOR X12 sin casilla 6
      if (casilla2 == `&#129297` && casilla2 == casilla5 && casilla2 == casilla9 && casilla2 == casilla8 && casilla2 == casilla7 && casilla2 == casilla1 && casilla2 == casilla3) {
        popUpx12();
        break
      }
      //PATRON GANADOR X10 sin esquinas casilla 1
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla9 && casilla6 == casilla8 && casilla6 == casilla7 && casilla6 == casilla2 && casilla6 == casilla3) {
        popUpx10();
        break
      }
      //PATRON GANADOR X10 sin esquinas casilla 3
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla9 && casilla6 == casilla8 && casilla6 == casilla7 && casilla6 == casilla1 && casilla6 == casilla2) {
        popUpx10();
        break
      }
      //PATRON GANADOR X10 sin esquinas casilla 7
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla9 && casilla6 == casilla8 && casilla6 == casilla1 && casilla6 == casilla2 && casilla6 == casilla3) {
        popUpx10();
        break
      }
      //PATRON GANADOR X10 sin esquinas casilla 9
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla8 && casilla6 == casilla7 && casilla6 == casilla1 && casilla6 == casilla2 && casilla6 == casilla3) {
        popUpx10();
        break
      }
      //PATRON GANADOR X10 sin casillas 2 y 8
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla9 && casilla6 == casilla7 && casilla6 == casilla1 && casilla6 == casilla3) {
        popUpx10();
        break
      }
      //PATRON GANADOR X10 sin casillas 6 y 4
      if (casilla2 == `&#129297` && casilla2 == casilla5 && casilla2 == casilla8 && casilla2 == casilla9 && casilla2 == casilla7 && casilla2 == casilla1 && casilla2 == casilla3) {
        popUpx10();
        break
      }
      //PATRON GANADOR X8 COLUMNA SIN LA CASILLA DEL MEDIO CASILLA 5
      if (casilla6 == `&#129297` && casilla6 == casilla4 && casilla6 == casilla9 && casilla6 == casilla8 && casilla6 == casilla7 && casilla6 == casilla1 && casilla6 == casilla2 && casilla6 == casilla3) {
        popUpx8();
        break
      }
      //PATRON GANADOR X8 sin casillas 6 y 2
      if (casilla4 == `&#129297` && casilla4 == casilla5 && casilla4 == casilla9 && casilla4 == casilla8 && casilla4 == casilla7 && casilla4 == casilla3 && casilla4 == casilla1) {
        popUpx8();
        break
      }
      //PATRON GANADOR X8 sin casillas 6 y 8
      if (casilla4 == `&#129297` && casilla4 == casilla5 && casilla4 == casilla9 && casilla4 == casilla7 && casilla4 == casilla3 && casilla4 == casilla2 && casilla4 == casilla1) {
        popUpx8();
        break
      }
      //PATRON GANADOR X8 sin casillas 4 y 8
      if (casilla2 == `&#129297` && casilla2 == casilla5 && casilla2 == casilla6 && casilla2 == casilla9 && casilla2 == casilla7 && casilla2 == casilla1 && casilla2 == casilla3) {
        popUpx8();
        break
      }
      //PATRON GANADOR X8 sin casillas 4 y 2
      if (casilla8 == `&#129297` && casilla8 == casilla5 && casilla8 == casilla6 && casilla8 == casilla9 && casilla8 == casilla7 && casilla8 == casilla1 && casilla8 == casilla3) {
        popUpx8();
        break
      }
      //PATRON GANADOR X6 DOBLE DIAGONAL y 4
      if (casilla3 == `&#129297` && casilla3 == casilla5 && casilla3 == casilla7 && casilla3 == casilla1 && casilla3 == casilla9 && casilla3 == casilla4) {
        popUpx6();
        break
      }
      //PATRON GANADOR X6 DOBLE DIAGONAL y 2
      if (casilla3 == `&#129297` && casilla3 == casilla5 && casilla3 == casilla7 && casilla3 == casilla1 && casilla3 == casilla9 && casilla3 == casilla2) {
        popUpx6();
        break
      }
      //PATRON GANADOR X6 DOBLE DIAGONAL y 8
      if (casilla3 == `&#129297` && casilla3 == casilla5 && casilla3 == casilla7 && casilla3 == casilla1 && casilla3 == casilla9 && casilla3 == casilla8) {
        popUpx6();
        break
      }

      //PATRON GANADOR X6 DOBLE DIAGONAL y 6
      if (casilla3 == `&#129297` && casilla3 == casilla5 && casilla3 == casilla7 && casilla3 == casilla1 && casilla3 == casilla9 && casilla3 == casilla6) {
        popUpx6();
        break
      }
      //PATRON GANADOR X6 COLUMNA Nro 1 y Nro 2 Y CASILLA 8
      if (casilla3 == `&#129297` && casilla3 == casilla2 && casilla3 == casilla1 && casilla3 == casilla6 && casilla3 == casilla5 && casilla3 == casilla4 && casilla3 == casilla8) {
        popUpx6();
        break
      }
      //PATRON GANADOR X6 COLUMNA Nro 2 y Nro 3 Y CASILLA 2
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla9 && casilla6 == casilla8 && casilla6 == casilla7 && casilla6 == casilla2) {
        popUpx6();
        break
      }
      //PATRON GANADOR X6 FILA Nro 1 y 2 Y CASILLA 4
      if (casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9 && casilla3 == casilla2 && casilla3 == casilla5 && casilla3 == casilla8 && casilla3 == casilla4) {
        popUpx6();
        break
      }
      //PATRON GANADOR X6 FILA Nro 2 y 3 Y CASILLA 6
      if (casilla2 == `&#129297` && casilla2 == casilla5 && casilla2 == casilla8 && casilla2 == casilla1 && casilla2 == casilla4 && casilla2 == casilla7 && casilla2 == casilla6) {
        popUpx6();
        break
      }
      //PATRON GANADOR FILA Nro 2 Y COLUMNA 2
      if (casilla2 == `&#129297` && casilla2 == casilla5 && casilla2 == casilla8 && casilla2 == casilla4 && casilla2 == casilla6) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 2 Y DIAGONAL 1
      if (casilla2 == `&#129297` && casilla2 == casilla5 && casilla2 == casilla8 && casilla2 == casilla3 && casilla2 == casilla7) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 2 Y DIAGONAL 2
      if (casilla2 == `&#129297` && casilla2 == casilla5 && casilla2 == casilla8 && casilla2 == casilla1 && casilla2 == casilla9) {
        popUpx4();
        break
      }
      //PATRON GANADOR COLUMNA Nro 2 Y DIAGONAL 1
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla3 && casilla6 == casilla7) {
        popUpx4();
        break
      }
      //PATRON GANADOR COLUMNA Nro 2 Y DIAGONAL 2
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla1 && casilla6 == casilla9) {
        popUpx4();
        break
      }
      //PATRON GANADOR COLUMNA Nro3 Y DIAGONAL 1
      if (casilla9 == `&#129297` && casilla9 == casilla8 && casilla9 == casilla7 && casilla9 == casilla5 && casilla9 == casilla3) {
        popUpx4();
        break
      }
      //PATRON GANADOR COLUMNA Nro3 Y DIAGONAL 2
      if (casilla9 == `&#129297` && casilla9 == casilla8 && casilla9 == casilla7 && casilla9 == casilla5 && casilla9 == casilla1) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 1 Y   DIAGONAL 1
      if (casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9 && casilla3 == casilla5 && casilla3 == casilla7) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 1 Y   DIAGONAL 2
      if (casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9 && casilla3 == casilla5 && casilla3 == casilla1) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro3 Y DIAGONAL 1
      if (casilla1 == `&#129297` && casilla1 == casilla4 && casilla1 == casilla7 && casilla1 == casilla5 && casilla1 == casilla9) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro3 Y DIAGONAL 2
      if (casilla1 == `&#129297` && casilla1 == casilla4 && casilla1 == casilla7 && casilla1 == casilla5 && casilla1 == casilla3) {
        popUpx4();
        break
      }
      //PATRON GANADOR DOBLE DIAGONAL 
      if (casilla3 == `&#129297` && casilla3 == casilla5 && casilla3 == casilla7 && casilla3 == casilla1 && casilla3 == casilla9) {
        popUpx4();
        break
      }
      //PATRON GANADOR COLUMNA Nro 1 y Nro3  [| |]
      if (casilla3 == `&#129297` && casilla3 == casilla2 && casilla3 == casilla1 && casilla3 == casilla9 && casilla3 == casilla8 && casilla3 == casilla7) {
        popUpx4();
        break
      }
      //PATRON GANADOR COLUMNA Nro 1 y Nro 2 [|| ]
      if (casilla3 == `&#129297` && casilla3 == casilla2 && casilla3 == casilla1 && casilla3 == casilla6 && casilla3 == casilla5 && casilla3 == casilla4) {
        popUpx4();
        break
      }
      //PATRON GANADOR COLUMNA Nro 2 y Nro 3 [ ||]
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla9 && casilla6 == casilla8 && casilla6 == casilla7) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 1 y 2
      if (casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9 && casilla3 == casilla2 && casilla3 == casilla5 && casilla3 == casilla8) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 1 y 3
      if (casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9 && casilla3 == casilla1 && casilla3 == casilla4 && casilla3 == casilla7) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 2 y 3
      if (casilla2 == `&#129297` && casilla2 == casilla5 && casilla2 == casilla8 && casilla2 == casilla1 && casilla2 == casilla4 && casilla2 == casilla7) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 1 y columna 1
      if (casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9 && casilla3 == casilla2 && casilla3 == casilla1) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 1 y columna 2
      if (casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9 && casilla3 == casilla5 && casilla3 == casilla4) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 1 y columna 3
      if (casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9 && casilla3 == casilla8 && casilla3 == casilla7) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro3 y columna 1
      if (casilla1 == `&#129297` && casilla1 == casilla4 && casilla1 == casilla7 && casilla1 == casilla2 && casilla1 == casilla3) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro3 y columna 2
      if (casilla1 == `&#129297` && casilla1 == casilla4 && casilla1 == casilla7 && casilla1 == casilla5 && casilla1 == casilla6) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro3 y columna 2
      if (casilla1 == `&#129297` && casilla1 == casilla4 && casilla1 == casilla7 && casilla1 == casilla8 && casilla1 == casilla9) {
        popUpx4();
        break
      }
      //PATRON GANADOR FILA Nro 1
      if (casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9) {
        popUpx2();
        break
      }
      //PATRON GANADOR FILA Nro 2
      if (casilla2 == `&#129297` && casilla2 == casilla5 && casilla2 == casilla8) {
        popUpx2();
        break
      }
      //PATRON GANADOR FILA Nro3 
      if (casilla1 == `&#129297` && casilla1 == casilla4 && casilla1 == casilla7) {
        popUpx2();
        break
      }
      //PATRON GANADOR COLUMNA Nro 1
      if (casilla3 == `&#129297` && casilla3 == casilla2 && casilla3 == casilla1) {
        popUpx2();
        break
      }
      //PATRON GANADOR COLUMNA Nro 2
      if (casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4) {
        popUpx2();
        break
      }
      //PATRON GANADOR COLUMNA Nro3 
      if (casilla9 == `&#129297` && casilla9 == casilla8 && casilla9 == casilla7) {
        popUpx2();
        break
      }
      //PATRON GANADOR DIAGONAL1
      if (casilla3 == `&#129297` && casilla3 == casilla5 && casilla3 == casilla7) {
        popUpx2();
        break
      }
      //PATRON GANADOR DIAGONAL 2
      if (casilla1 == `&#129297` && casilla1 == casilla5 && casilla1 == casilla9) {
        popUpx2();
        break
      }
      //VALIDACION DE PATRONES PERDEDORES
      else {
        restarSaldo()
        break
      }
    }
    //VALIDACION DE SALDO AL JUGAR
    else {
      document.getElementById(`txt`).style.display = `block`;
      break
    }
  }
  //GUARDADO Y ACTUALIZACION DEL SALDO EN TIEMPO REAL
  localStorage.setItem('saldoGuardado', saldo.innerHTML);
  sessionStorage.setItem('saldoSession', saldo.innerHTML);
}
//JSON - FETCH - PREMIOS

//constructor de itemInventario
class itemInventario {
  constructor(img, nombre, price,) {
    this.img = img;
    this.nombre = nombre;
    this.price = price;
  }
}

//BOTON QUE ABRE EL APARTADO "CANJEAR" y HACE UN FETCH DE premios.json - Traer las skins o items del json al html
btnCanjear.onclick = (e) => {
  document.getElementById(`txt`).style.display = `none`;
  modalCanjear.style.display = 'flex';
  fetch('./premios.json')
    .then(res => res.json())
    .then(premiosResults = (premios) => {
      for (const item of premios) {
        const { img, price, nombre } = item;
        const card = document.createElement('div');
        const mandarInventario = document.createElement('button');
        mandarInventario.className = `botonCanjear`;
        mandarInventario.innerHTML = `Canjear`;
        card.className = 'card';
        card.innerHTML =
          `<img src="${img}" alt=""></img>
        <p class="nombreSkin">${nombre}</p>
        <p class="precioSkin">$${price}</p>`
        card.append(mandarInventario);
        skins.append(card);
        //VALIDACION DE JUGADAS (PARA QUE NO DEJE CANJEAR SI NO JUGASTE UN MINIMO DE 10 VECES)

        //BOTON DE CANJEAR - AGREGA LOS ITEMS A UN ARRAY Y LOS MANDA AL LOCAL STORAGE - VALIDA SI TIENE EL SALDO SUFICIENTE PARA COMPRAR O NO
        mandarInventario.onclick = () => {
          if (nroJugadas <= 10) {
            mandarInventario.disabled = true;
            Swal.fire({
              icon: 'error',
              text: `Debes jugar minimo 10 veces`,
            })
          }
          else {
            mandarInventario.disabled = false;
            if (price <= saldo.innerHTML) {
              const guardarInfo = () => {
                canasta.push(new itemInventario(img, nombre, price));
                localStorage.setItem('canastaGuardada', JSON.stringify(canasta));;
              }
              guardarInfo()
              card.style.display = `none`;
              saldo.innerHTML = saldo.innerHTML - price;
              localStorage.setItem('saldoGuardado', saldo.innerHTML);
              sessionStorage.setItem('saldoSession', saldo.innerHTML);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'canjeado',
                showConfirmButton: false,
                timer: 1500
              })
            }
            else {
              Swal.fire({
                icon: 'error',
                text: 'No tienes saldo suficiente!',
              })
            }
          }
        }
      }
    })
    .catch(error => {
      skins.innerHTML = `<h1 class="chauTitle">No encontramos los items, recarga la pagina.</h1>`
    }).finally()
};

// FUNCION QUE VERIFICA SI HAY ALGUN ITEM EN EL LOCAL STORAGE Y LO IMPRIME EN EL "INVENTARIO"
const verificarStorage = () => {
  if (!!canastaGuardada && canastaGuardada.length > 0) {
    for (const itemInventario of canastaGuardada) {
      const { img, price, nombre } = itemInventario;
      const card = document.createElement('div');
      const cardInventario = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<img src="${img}">
      <p>${nombre}</p>
      <p>$${price}</p>`;
      cardInventario.append(card);
      inventario.appendChild(cardInventario);
    };
  };
};
verificarStorage()

// BOTON QUE CIERRA EL APARTADO DE "CANJEAR"
btnCerrarCanjear.onsubmit = () => {
  modalCanjear.style.display = 'none';
  skins.innerHTML = "";
};

//RECARGA DE SALDO
btnRecarga.onclick = () => {
  document.getElementById(`txt`).style.display = `none`;
  modalRecarga.style.display = 'flex';
};
cerrarRecarga.onclick = () => {
  modalRecarga.style.display = 'none';
};
recargar.onclick = () => {
  if (recarga.value <= 1500) {
    if (saldo.innerHTML == 0) {
      saldo.innerHTML = Number(saldo.innerHTML) + Number(recarga.value);
    }
    else {
      Swal.fire({
        icon: 'error',
        text: `Para recargar tu saldo debe ser 0, y es ${saldo.innerHTML}!`,
      })
    }
  }
  else { }
  localStorage.setItem('saldoGuardado', saldo.innerHTML);
  sessionStorage.setItem('saldoSession', saldo.innerHTML);
};

//BOTON QUE ABRE EL INVENTARIO
btnInventario.onclick = () => {
  document.getElementById(`txt`).style.display = `none`;
  modalInventario.style.display = 'flex';
};
//BOTON QUE CIERRA EL INVENTARIO
btnCerrarInventario.onclick = () => {
  modalInventario.style.display = 'none';
};
