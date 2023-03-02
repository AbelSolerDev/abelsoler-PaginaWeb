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


