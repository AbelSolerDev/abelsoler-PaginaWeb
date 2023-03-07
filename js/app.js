
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
/************ ANIMACIÓN FOOTER CONSOLE ************/
//Introduzco los datos para pasarlos por la función.
// function([string1, string2],target id,[color1,color2])  
mostrarTextoEnConsola(['Abel Soler 2023 ©', '¡ Gracias por venir !', 'Abel Soler 2023 ©', '¿ Contactamos ?'], 'text',['#18b6a9','white','#18b6a9']);
// Función que muestra texto en la consola
function mostrarTextoEnConsola(palabras, id, colores) {
  // En caso de no proporcionar el parámetro de colores, se establece un color predeterminado
  if (colores === undefined) colores = ['#fff'];
  
  // Se inicializan las variables
  var visible = true;
  var contenedor = document.getElementById('console');
  var letraActual = 1;
  var x = 1;
  var esperando = false;
  var objetivo = document.getElementById(id)
  
  // Se establece el primer color
  objetivo.setAttribute('style', 'color:' + colores[0])
  
  // Uso de setInterval para ejecutar una tarea cada cierto tiempo
  window.setInterval(function() {
    // Si es la primera letra y no está esperando
    if (letraActual === 0 && esperando === false) {
      esperando = true;
      objetivo.innerHTML = palabras[0].substring(0, letraActual)
      
      // Se espera 1 segundo antes de continuar con el siguiente cambio de palabra/color
      window.setTimeout(function() {
        var colorUsado = colores.shift();
        colores.push(colorUsado);
        var palabraUsada = palabras.shift();
        palabras.push(palabraUsada);
        x = 1;
        objetivo.setAttribute('style', 'color:' + colores[0])
        letraActual += x;
        esperando = false;
      }, 1000)
      
    // Si llega al final de la palabra y no está esperando
    } else if (letraActual === palabras[0].length + 1 && esperando === false) {
      esperando = true;
      window.setTimeout(function() {
        x = -1;
        letraActual += x;
        esperando = false;
      }, 1000)
      
    // Si no está esperando, se escribe la palabra en progreso
    } else if (esperando === false) {
      objetivo.innerHTML = palabras[0].substring(0, letraActual)
      letraActual += x;
    }
  }, 120)
  
  // Tarea que se repite cada cierto tiempo para alternar el cursor de la consola
  window.setInterval(function() {
    // Si está visible, ocultarlo
    if (visible === true) {
      contenedor.className = 'console-underscore hidden'
      visible = false;
    // Si no está visible, mostrarlo
    } else {
      contenedor.className = 'console-underscore'
      visible = true;
    }
  }, 400)
};



/************ ESTRUCTURA PINTAR LOGOS ************/
document.addEventListener("DOMContentLoaded", function() {
  // Selección de todos los elementos img en la página
  var imagenes = document.querySelectorAll('.habilidades img');

  // Agregar un listener de eventos a cada imagen
  for (var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener('mouseover', function() {
      this.style.filter = "brightness(50%) hue-rotate(100deg)";
    });

    imagenes[i].addEventListener('mouseout', function() {
      this.style.filter = "none";
    });
  }
});








/************ REREPRODUCTOR DE MUISCA ************/
/*Este es un reproductor de música que tiene varias funciones para reproducir, 
  pausar, pasar a la siguiente o anterior canción. También tiene opciones para repetir o 
  mezclar la lista de reproducción y controlar el progreso de la canción.*/

/*variables que contienen elementos HTML como divs, botones y etiquetas de audio.*/ 
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
// Se agrega esta variable para usar la etiqueta audio del reproductor
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");

/*variable numérica que almacena el número índice de la canción actual en la lista de todas las canciones (allMusic).*/
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
//variable booleana que indica si la música está pausada o no.
isMusicPaused = true;

/*El evento "load" llama a la función loadMusic con un número aleatorio generado por Math.floor.
  Esta función actualiza el nombre de la canción, el artista y la imagen utilizando los datos de la variable allMusic.*/
window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  playingSong(); 
});
/*La función 'loadMusic' carga la música según el índice que se le proporciona*/
function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `img/reproductor/${allMusic[indexNumb - 1].src}.jpg`;
  //se establece la fuente de audio cargando la canción seleccionada
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

// Función para reproducir la música
/*reproduce la canción, cambia la clase CSS del envoltorio de la aplicación 
  y el icono del botón de reproducir/pausar. */
function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  // Se reproduce la canción utilizando la etiqueta de audio del reproductor
  mainAudio.play();
}

// Función para pausar la música
/*pausa la canción, elimina la clase CSS del envoltorio de la aplicación 
  y cambia el icono del botón de reproducir/pausar.*/
function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

// Función para retroceder la música
/*La función prevMusic disminuye el valor de musicIndex en uno y carga la canción anterior 
  utilizando loadMusic. Si musicIndex es menor que 1, se establece en allMusic.length. 
  Entonces, llama a playMusic y luego a playingSong. */
function prevMusic(){
  musicIndex--; /// Si el índice es menor que 1, 
  //se establecerá en la longitud del array para que se reproduzca la última música
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
  renderFrame()
}

// Función para avanzar la música
/*La función nextMusic aumenta el valor de musicIndex en uno y carga la siguiente canción 
  utilizando loadMusic. Si musicIndex es mayor que allMusic.length, se establece en 1. 
  Luego llama a playMusic y luego a playingSong. */
function nextMusic(){
  musicIndex++; // Si el índice es mayor que la longitud del array, 
  //se establecerá en 1 para que se reproduzca la primera música.
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
  renderFrame()
}

// Evento del botón de reproducir o pausar la música
/* El evento del botón de reproducir/pausar llama a pauseMusic o playMusic 
  según el estado actual de la música. Después llama a playingSong.*/
playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = wrapper.classList.contains("paused");
  // Si la música está siendo reproducida, llama a la función 'pauseMusic', 
  //  de lo contrario llama a la función 'playMusic'.
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
  renderFrame()
});

/*Los eventos de los botones anterior y siguiente llaman a prevMusic y nextMusic, respectivamente.*/
// Evento del botón para retroceder una canción
prevBtn.addEventListener("click", ()=>{
  prevMusic();
});
// Evento del botón para avanzar una canción
nextBtn.addEventListener("click", ()=>{
  nextMusic();
});


// Actualiza la barra de progreso según el tiempo actual de la música
/*El evento "timeupdate" recalcula el ancho de la barra de progreso según el tiempo transcurrido 
  y lo muestra en la pantalla junto al tiempo actual de la canción y la duración total. 
  Esto se hace calculando el tiempo actual de la canción y la duración total mediante 
  la propiedad currentTime y duration de mainAudio. */
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //mientras se reproduce la canción currentTime
  const duration = e.target.duration; //mientras se reproduce la canción total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
  musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    // Actualiza la duración total de la música
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){  // Si los segundos son menores que 10, agrega un 0 antes.
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
   // Actualiza el tiempo actual de la música que se está reproduciendo
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ // Si los segundos son menores que 10, agrega un 0 antes.
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});


// Actualiza el tiempo actual de la música según el ancho de la barra de progreso.
/*El evento "click" en el área de progreso ajusta el tiempo de reproducción de la 
  canción según dónde hagan clic los usuarios en la barra de progreso. 
  También llama a playMusic y luego a playingSong. */
progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth; //obtener el ancho de la barra de progreso
  let clickedOffsetX = e.offsetX; //obteniendo el valor compensado x
  let songDuration = mainAudio.duration; //obtener la duración total de la canción
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //llamando a la función playMusic
  playingSong();
});

//cambiar bucle, reproducción aleatoria, repetir icono al hacer click
const repeatBtn = wrapper.querySelector("#repeat-plist");
/*El evento "click" en el botón de repetición cambia el icono y el título del botón 
  según lo que el usuario desea hacer: repetir la lista de reproducción entera, 
  repetir solo una canción o mezclar aleatoriamente. */
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; //obteniendo esta etiqueta innerText
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

//código de qué hacer después de que termine la canción.
/*El evento "ended" se activa cuando la canción llega al final. 
  Depende del modo de repetición definido por el usuario: después de cada canción, 
  la misma canción o una canción aleatoria se reproducen a través de las funciones nextMusic, 
  loadMusic y playMusic.
 */
mainAudio.addEventListener("ended", ()=>{
  // lo haremos de acuerdo con el ícono significa que si el usuario ha configurado el ícono
  // para repetir la canción, repetiremos la canción actual y lo haremos en consecuencia
  let getText = repeatBtn.innerText; //gobteniendo esta etiqueta innerText
  switch(getText){
    case "repeat":
      nextMusic(); //llamando a la función nextMusic 
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //establecer el tiempo actual de audio en 0
      loadMusic(musicIndex); //llamando a la función loadMusic con argumento, en el argumento hay un index de la canción actual
      playMusic(); //llamando a la función playMusic
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //generar índice/número aleatorio con rango máximo de longitud de matriz
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); //este bucle se ejecuta hasta que el próximo número aleatorio no sea el mismo que el actual musicIndex
      musicIndex = randIndex; //pasando randomIndex a musicIndex
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

//mostrar la lista de música al hacer clic en el icono de la música
/*Los eventos "click" en los botones de "más música" y "cerrar más música" 
  permiten al usuario ver y cerrar la lista completa de canciones disponibles.*/
moreMusicBtn.addEventListener("click", ()=>{
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", ()=>{
  moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");
// vamos a crear etiquetas "li" de acuerdo con la longitud de la matriz para la lista
/*Un ciclo for crea una lista de todas las canciones ("li"Tag) al insertar los nombres 
  y artistas utilizando los datos de la variable allMusic. 
  Dentro de ese ciclo se definen también los atributos del audio de cada canción. */
for (let i = 0; i < allMusic.length; i++) {
  //pasemos el nombre de la canción, artista de la matriz
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); //insertando la etiqueta "li" dentro de "ul"

  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //si sec es menor que 10, agrega 0 antes
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //pasando la duración total de la canción
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //agregando el atributo t-duration con el valor de duración total
  });
}

//Reproduzca una canción en particular de la lista al hacer clic en la etiqueta "li"
/*La función playingSong muestra en verde la canción que está siendo reproducida en 
  la lista de canciones mientras que devulve a su estado normal la que dejó de serlo. */
function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //si el índice de la etiqueta "li" es igual a "musicIndex", entonces agregue class de reproducción en él
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

//función particular "li" clicada
/*La función clicked(element) toma el li-index de la canción en que se ha 
  hecho clic en la lista de canciones y llama a loadMusic, playMusic y playingSong. */
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //actualizando el índice de la canción actual con el índice "li" pulsado
  loadMusic(musicIndex);
  playMusic();
  playingSong();
  renderFrame()
}


/**SECCIÓN DE  VISUALIZACIÓN DE FRECUENCIAS**/

var context = new AudioContext();
var src = context.createMediaElementSource(mainAudio);
var analyser = context.createAnalyser();

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

src.connect(analyser);
analyser.connect(context.destination);

analyser.fftSize = 256;
var bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);
var dataArray = new Uint8Array(bufferLength);
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var barWidth = (WIDTH / bufferLength) * 2.5;
var barHeight;
var x = 0;

//esta es la función que actualiza el visualizador en cada fotograma
function renderFrame() {
  requestAnimationFrame(renderFrame);

  x = 0;
  analyser.getByteFrequencyData(dataArray);
  
  ctx.fillStyle = "#202020";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  for (var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    
    var r = barHeight + (25 * (i/bufferLength));
    var g = 250 * (i/bufferLength);
    var b = 50;

    /*ctx.fillStyle = "#18b6a9";*/
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}
/* *********OTRO COLOR DIFERENTE*******
function renderFrame() {
  requestAnimationFrame(renderFrame);

  x = 0;
  analyser.getByteFrequencyData(dataArray);
  
  ctx.fillStyle = "#202020";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  for (var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    
    var hue = i / bufferLength * 240;
    ctx.fillStyle = 'hsl(' + hue + ',50%,' + barHeight/2+'%)';

    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}*/