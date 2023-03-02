//Menu lateral
var menu_visible = false;
let menu = document.getElementById("nav");
function mostrarOcultarMenu(){
    if(menu_visible==false){//si esta oculto
        menu.style.display = "block";
        menu_visible = true;
    }
    else{
        menu.style.display = "none";
        menu_visible = false;
    }
}
//oculto el menu una vez que selecciono una opción
let links = document.querySelectorAll("nav a");
for(var x = 0; x <links.length;x++){
    links[x].onclick = function(){
        menu.style.display = "none";
        menu_visible = false;
    }
}
/************ ANIMACIÓN FOOTER ************/
// function([string1, string2],target id,[color1,color2])    
consoleText(['Abel Soler 2023 ©', '¡ Gracias por venir !', 'Abel Soler 2023 ©', '¿ Contactamos ?'], 'text',['#18b6a9','white','#18b6a9']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
};



/************ ESTRUCTURA APARICIÓN LOGOS ************/
/*
function mostrarImagenes() {
    const imagenes = document.querySelectorAll('.oculto');
    
    const opciones = {
      rootMargin: '0px',
      threshold: 0.5 // la imagen se muestra cuando al menos el 50% está en el viewport
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('oculto');
          observer.unobserve(entry.target);
        }
      });
    }, opciones);
    
    imagenes.forEach(imagen => {
      observer.observe(imagen);
    });
  };*/

/*detecto el scrolling del mouse para aplicar la animación de la barra
window.onscroll = function(){
    mostrarImagenes();
}*/


