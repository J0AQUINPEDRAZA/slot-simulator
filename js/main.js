const YEAR = 2022;



///////////////////////////LO IN - LOG OUT - VENTANAS EMERGENTES - LOCAL & SESsION STORAGE/////////////////////////////////

let nombreUsuario = localStorage.getItem('nombreUsuario');
let apellidoUsuario = localStorage.getItem('apellidoUsuario');
let edadUsuario = localStorage.getItem('edadUsuario');
let saldoGuardado = localStorage.getItem('saldoGuardado');
let saldoSession = sessionStorage.getItem('saldoSession');
let inputNombre = sessionStorage.getItem('inputNombre');
let inputApellido = sessionStorage.getItem('inputApellido');


const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const edad = document.querySelector('#edad');
const contFormulario = document.querySelector('#contFormulario');
const contenido = document.querySelector('#contenido');
const logout = document.querySelector('#logout');
const modal1 = document.querySelector('#modal1');
const modal2 = document.querySelector('#modal2');
const modal = document.querySelector('#modal');
const btnContinuar = document.querySelector('#btnContinuar');
const ok = document.querySelector('#ok');




modal.style.display = 'none';

const ocultarFormulario = () => {
 modal.style.display = 'none';
 modal1.style.display = 'none';
  contenido.innerHTML = `Hola  ${nombreUsuario}  ${apellidoUsuario}, tienes  ${edadUsuario}  años.`;
}


btnContinuar.onclick = (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
  modal1.style.display = 'none';
};

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  nombreUsuario = nombre.value;
  apellidoUsuario = apellido.value;
  edadUsuario = YEAR - edad.value;

  
  if (edad.value > 2004){
   alert(`No puedes ingresar al sitio, eres menor de edad`)
    localStorage.setItem('esMayorEdad', false);
    localStorage.clear;
    sessionStorage.clear;
    modal.style.display = '';
  }
  if (edad.value <= 2004){
    localStorage.setItem('nombreUsuario', nombre.value);
    localStorage.setItem('apellidoUsuario', apellido.value);
    localStorage.setItem('edadUsuario',  YEAR - edad.value);
    localStorage.setItem('esMayorEdad', true);
    ocultarFormulario();
  }
})



if (!!nombreUsuario && !!apellidoUsuario && !!edadUsuario) {
  ocultarFormulario();
  
}

console.log(inputNombre, inputApellido);

nombre.value = inputNombre;
apellido.value = inputApellido;

nombre.addEventListener('input', (e) => {
  sessionStorage.setItem('inputNombre', e.target.value);
})

apellido.addEventListener('input', (e) => {
  sessionStorage.setItem('inputApellido', e.target.value);
})

logout.onclick = () => {
  sessionStorage.clear();
  localStorage.clear();
  localStorage.removeItem('nombreUsuario');
  localStorage.removeItem('apellidoUsuario');
  localStorage.removeItem('edadUsuario');
  localStorage.removeItem('esMayorEdad');

}




/////////////////////////////////JUEGO/////////////////////////////////////////


let saldoInicial = 1000;

let tirada = document.getElementById('tirada');
let saldo = document.getElementById('saldo');
let child1 = document.getElementById('casilla1');
let child2 = document.getElementById('casilla2');
let child3 = document.getElementById('casilla3');
let child4 = document.getElementById('casilla4');
let child5 = document.getElementById('casilla5');
let child6 = document.getElementById('casilla6');
let child7 = document.getElementById('casilla7');
let child8 = document.getElementById('casilla8');
let child9 = document.getElementById('casilla9');
const submit = document.getElementById('jugar');
const salir = document.getElementById('salir');
const chau = document.getElementById('chau');

saldo.innerHTML = saldoInicial;

if(!!saldoSession){
  saldo.innerHTML = saldoSession;
}




let restarSaldo = () =>{
    saldo.innerHTML = Number(saldo.innerHTML) - Number(tirada.value);

    if (saldo.innerHTML <= 0){
        saldo.innerHTML = 0;
    }

}


let premioX2 = () =>{
    saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value*2);

}

let premioX4 = () =>{
    saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value*4);

}

let premioX6 = () =>{
    saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value*6);

}

let premioX8 = () =>{
    saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value*8);

}

let premioX9 = () =>{
    saldo.innerHTML = Number(saldo.innerHTML) + Number(tirada.value*9);

}




const containerTirada = document.getElementById('containerTirada');

let demoArray = [`&#128520`,`&#128520`,`&#128520`,`&#128520`,`&#128520`,`&#128520`,`&#128520`,`&#128520`,`&#128520`,
`&#128526`,`&#128526`,`&#128526`,`&#128526`,`&#128526`,`&#128526`,`&#128526`,`&#128526`,`&#128526`,
`&#129297`,`&#129297`,`&#129297`,`&#129297`,`&#129297`,`&#129297`,`&#129297`,`&#129297`,`&#129297`];



function mezclarArray(array){
    array.sort(()=> Math.random() - 0.5);
}






containerTirada.onsubmit = (e) => {
    e.preventDefault(); 
    mezclarArray(demoArray);
    child1.innerHTML= '';
    child2.innerHTML= '';
    child3.innerHTML= '';
    child4.innerHTML= '';
    child5.innerHTML= '';
    child6.innerHTML= '';
    child7.innerHTML= '';
    child8.innerHTML= '';
    child9.innerHTML= '';
  while(saldo.innerHTML >= 0){ 
        if(saldo.innerHTML == 0){
          document.getElementById(`txt`).style.display= `block`;
          document.getElementById(`salir`).style.margin= `18.6px 0px 0px 0px`;
        break
        }
        if(saldo.innerHTML > 0){
          document.getElementById(`txt`).style.display= `none`;
          document.getElementById(`salir`).style.margin= `40px 0px 0px 0px`;
          
        }
          mezclarArray(demoArray)
          
            let arrayUnido = demoArray.slice(0,1);
            let casilla1 = `${arrayUnido.join(" ")}`;
            let arrayUnido2 = demoArray.slice(1,2);
            let casilla2 = `${arrayUnido2.join(" ")}`;
            let arrayUnido3 = demoArray.slice(2,3);
            let casilla3 = `${arrayUnido3.join(" ")}`;
            let arrayUnido4 = demoArray.slice(3,4);
            let casilla4 = `${arrayUnido4.join(" ")}`;
            let arrayUnido5 = demoArray.slice(4,5);
            let casilla5 = `${arrayUnido5.join(" ")}`;
            let arrayUnido6 = demoArray.slice(5,6);
            let casilla6 = `${arrayUnido6.join(" ")}`;
            let arrayUnido7 = demoArray.slice(6,7);
            let casilla7 = `${arrayUnido7.join(" ")}`;
            let arrayUnido8 = demoArray.slice(7,8);
            let casilla8 = `${arrayUnido8.join(" ")}`;
            let arrayUnido9 = demoArray.slice(8,9);
            let casilla9 = `${arrayUnido9.join(" ")}`;
        
        
        if(tirada.value <= Number(saldo.innerHTML)){
          jugar.disabled = true;
            setTimeout(() =>{
              child1.innerHTML= casilla1;

            },100);
            setTimeout(() =>{
              child2.innerHTML= casilla2;
            },300);
            setTimeout(() =>{
              child3.innerHTML= casilla3;
            },500);
            setTimeout(() =>{
              child4.innerHTML= casilla4;
            },700);
            setTimeout(() =>{
              child5.innerHTML= casilla5;
            },900);
            setTimeout(() =>{
              child6.innerHTML= casilla6;
            },1100);
            setTimeout(() =>{
              child7.innerHTML= casilla7;
            },1300);
            setTimeout(() =>{
              child8.innerHTML= casilla8;
            },1500);
            setTimeout(() =>{
              child9.innerHTML= casilla9;
            },1700);
            setTimeout(() =>{
              jugar.disabled = false;
            },1900);
          console.log(casilla1, casilla2, casilla3, casilla4, casilla5, casilla6, casilla7, casilla8, casilla9);

           




          //PATRON GANADOR COLUMNA Nro 1 y Nro3
          if(casilla3 == `&#129297` && casilla3 == casilla2 && casilla3 == casilla1 && casilla3 == casilla9 && casilla3 == casilla8 && casilla3 == casilla7){
            document.getElementById(`popUp__boxX4`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX4`).style.display= `none`;
            }, 2500);
            premioX4()
            break     
          }


          //PATRON GANADOR COLUMNA Nro 1 y Nro 2
           if(casilla3 == `&#129297` && casilla3 == casilla2 && casilla3 == casilla1 && casilla3 == casilla6 && casilla3 == casilla5 && casilla3 == casilla4){
            document.getElementById(`popUp__boxX4`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX4`).style.display= `none`;
            }, 2500);
            premioX4()
            break     
          }


          //PATRON GANADOR COLUMNA Nro 2 y Nro 3
          if(casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4 && casilla6 == casilla9 && casilla6 == casilla8 && casilla6 == casilla7){
            document.getElementById(`popUp__boxX4`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX4`).style.display= `none`;
            }, 2500);
            premioX4()
            break   
          }



          //PATRON GANADOR FILA Nro 1 y 2
          if(casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9 && casilla3 == casilla2 && casilla3 == casilla5 && casilla3 == casilla8){
            document.getElementById(`popUp__boxX4`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX4`).style.display= `none`;
            }, 2500);
            premioX4()
            break     
          }


          //PATRON GANADOR FILA Nro 1 y 3
          if(casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9 && casilla3 == casilla1 && casilla3 == casilla4 && casilla3 == casilla7){
            document.getElementById(`popUp__boxX4`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX4`).style.display= `none`;
            }, 2500);
            premioX4()
            break
                
          }
          //PATRON GANADOR FILA Nro 2 y 3
          if(casilla2 == `&#129297` && casilla2== casilla5 && casilla2 == casilla8 && casilla2 == casilla1 && casilla2 == casilla4 && casilla2 == casilla7){
            document.getElementById(`popUp__boxX4`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX4`).style.display= `none`;
            }, 2500);
            premioX4()
            break 
          }

               //PATRON GANADOR FILA Nro 1
               if(casilla3 == `&#129297` && casilla3 == casilla6 && casilla3 == casilla9){
                document.getElementById(`popUp__boxX2`).style.display= `flex`;
                setTimeout (() =>{
                  document.getElementById(`popUp__boxX2`).style.display= `none`;
                }, 2500);
                premioX2()
                    
              }
              //PATRON GANADOR FILA Nro 2
              if(casilla2 == `&#129297` && casilla2== casilla5 && casilla2 == casilla8){
                document.getElementById(`popUp__boxX2`).style.display= `flex`;
                setTimeout (() =>{
                  document.getElementById(`popUp__boxX2`).style.display= `none`;
                }, 2500);
                premioX2()
              }
              //PATRON GANADOR FILA Nro3 
              if(casilla1 == `&#129297` && casilla1 == casilla4 && casilla1 == casilla7){
                document.getElementById(`popUp__boxX2`).style.display= `flex`;
                setTimeout (() =>{
                  document.getElementById(`popUp__boxX2`).style.display= `none`;
                }, 2500);
                premioX2()    
              }


            //PATRON GANADOR COLUMNA Nro 1
           if(casilla3 == `&#129297` && casilla3 == casilla2 && casilla3 == casilla1){
            document.getElementById(`popUp__boxX2`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX2`).style.display= `none`;
            }, 2500);
            premioX2()  
          }
         
          //PATRON GANADOR COLUMNA Nro 2
          if(casilla6 == `&#129297` && casilla6 == casilla5 && casilla6 == casilla4){
            document.getElementById(`popUp__boxX2`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX2`).style.display= `none`;
            }, 2500);
            premioX2()  
          }
          //PATRON GANADOR COLUMNA Nro3 
          if(casilla9 == `&#129297` && casilla9 == casilla8 && casilla9 == casilla7){
            document.getElementById(`popUp__boxX2`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX2`).style.display= `none`;
            }, 2500);
            premioX2()     
          }
          //PATRON GANADOR DOBLE DIAGONAL
          if(casilla3 == `&#129297` && casilla3 == casilla5 && casilla3 == casilla7 && casilla3 == casilla1 && casilla3 == casilla9){
            document.getElementById(`popUp__boxX4`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX4`).style.display= `none`;
            }, 2500);
            premioX4()
            break    
          }
          //PATRON GANADOR DIAGONAL1
          if(casilla3 == `&#129297` && casilla3 == casilla5 && casilla3 == casilla7){
            document.getElementById(`popUp__boxX2`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX2`).style.display= `none`;
            }, 2500);
            premioX2()
            break    
          }
          //PATRON GANADOR DIAGONAL 2
          if(casilla1 == `&#129297` && casilla1 == casilla5 && casilla1 == casilla9){
            document.getElementById(`popUp__boxX2`).style.display= `flex`;
            setTimeout (() =>{
              document.getElementById(`popUp__boxX2`).style.display= `none`;
            }, 2500);
            premioX2()
            break     
          }
          else{
          restarSaldo()
          break
          } 
        }
      else{
        document.getElementById(`txt`).style.display= `block`;
        document.getElementById(`salir`).style.margin= `18.6px 0px 0px 0px`; 
        
        break
      }
    }
    
   
    


    localStorage.setItem('saldoGuardado', saldo.innerHTML);
    sessionStorage.setItem('saldoSession', saldo.innerHTML);

} 


salir.onclick = () => {
  modal2.style.display = 'flex';
  
};

ok.onclick = () => {
  modal2.style.display = 'none';
  
  
};


//JSON - FETCH - PREMIOS
const modal3 = document.getElementById('modal3');
const btnCanjear = document.querySelector('#btnCanjear')
const btnCerrarCanjear = document.querySelector('#btnCerrarCanjear')

const skins = document.getElementById('skins');



  btnCanjear.onclick = () => {
    modal3.style.display = 'flex';
    fetch('./premios.json')
    .then(res => res.json())
    .then(premiosResults = (premios) => {
    for(const PREMIOS of premios){
        const {img, price, name} = PREMIOS;
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = 
        `<img src="${img}" alt=""></img>
        <p class="nombreSkin">${name}</p>
        <p class="precioSkin">$${price}</p>
        <button type="button" class="botonCanjear" id="ok">Canjear</button>`;
        skins.append(card);
    }
    })
    .catch();
  };

  btnCerrarCanjear.onclick = () => {
    modal3.style.display = 'none';
    skins.innerHTML="";
    
    
  };
  
console.log(saldoGuardado)

//INVENTARIO