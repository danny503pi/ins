let index = 0;

function mostrarImagen() {
    const imagenes = document.querySelector('.imagenes');
    const totalImagenes = imagenes.children.length;
    index = (index + 1) % totalImagenes;
    const desplazamiento = -index * 100;
    imagenes.style.transform = translateX(${desplazamiento}%);
}

// Cambiar imagen cada 3 segundos
setInterval(mostrarImagen, 3000);






// Constructor de la clase App
function App() {}

// Ejecutado cuando la ventana se carga
window.onload = function() {
    var app = new App();
    window.app = app;
}

// Método para manejar el clic en los botones del carrusel
App.prototype.processingButtom = function(event) {
    const btn = event.currentTarget;
    const carouselList = btn.parentNode;
    const track = carouselList.querySelector('#track');
    const carruseel = track.querySelectorAll('.carruseel');

    // Calcular el ancho de cada carrusel
    const carruseelWidth = carruseel[0].offsetWidth;
    const trackWidth = track.scrollWidth; // Total del ancho del track
    const listWidth = carouselList.offsetWidth; // Ancho visible del carrusel

    // Obtener la posición actual del track
    let leftPosition = parseFloat(track.style.left) || 0; // Maneja valores vacíos

    // Determinar qué acción tomar según el botón
    if (btn.dataset.buttom === "buttom-prev") {
        prevAction(leftPosition, carruseelWidth, track);
    } else if (btn.dataset.buttom === "buttom-next") {
        nextAction(leftPosition, trackWidth, listWidth, carruseelWidth, track);
    }
}
// Función para mover el carrusel hacia atrás
let prevAction = (leftPosition, carruseelWidth, track) => {
    // Evitar mover más allá del límite izquierdo
    if (leftPosition < 0) {
        track.style.left = ${Math.min(leftPosition + carruseelWidth, 0)}px;
    }
}

// Función para mover el carrusel hacia adelante
let nextAction = (leftPosition, trackWidth, listWidth, carruseelWidth, track) => {
    // Evitar mover más allá del límite derecho
    if (Math.abs(leftPosition) < (trackWidth - listWidth)) {
        track.style.left = ${Math.max(leftPosition - carruseelWidth, -(trackWidth - listWidth))}px;
    }
}
// Selecciona todos los enlaces de la navegación
const links = document.querySelectorAll('nav a[href^="#"], footer a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Desplazamiento suave
        if (targetElement) {
            smoothScroll(targetElement, 1500); // Ajusta la duración (en milisegundos)
        }
    });
});







// Lista de enlaces a los que no se les aplicará el efecto de carga
const excludedLinks = ['#footer', '#inicio', '#videosa', '#palabra', '#carusell', '#promociones'];

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Verificar si el enlace está en la lista de excluidos
        if (excludedLinks.includes(this.getAttribute('href'))) {
            return; // No hacer nada y permitir el comportamiento por defecto
        }

        e.preventDefault(); // Prevenir el comportamiento por defecto

        // Mostrar el efecto de carga
        const loading = document.getElementById('loading');
        loading.style.display = 'flex';

        // Redirigir después de un pequeño retraso
        setTimeout(() => {
            window.location.href = this.href; // Redirigir a la URL del enlace
        }, 2000); // Tiempo de carga (2000 ms = 2 segundos)
    });
});






// Función para desplazamiento suave personalizado
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}









// Inicializa la aplicación
const app = new App();




function togglePlay(video, button) {
    if (video.paused) {
        video.play();
        button.style.display = 'none'; // Oculta el botón al reproducir
    } else {
        video.pause();
        button.style.display = 'block'; // Muestra el botón al pausar
    }
}

// Inicializa el botón y el video
const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');

// Muestra el botón solo si el video está en pausa
document.getElementById('playButton1').addEventListener('click', function () {
    togglePlay(video1, this);
});

document.getElementById('playButton2').addEventListener('click', function () {
    togglePlay(video2, this);
});

// Muestra el botón cuando el video se pausa
video1.addEventListener('pause', function () {
    document.getElementById('playButton1').style.display = 'block';
});

video1.addEventListener('play', function () {
    document.getElementById('playButton1').style.display = 'none';
});

video2.addEventListener('pause', function () {
    document.getElementById('playButton2').style.display = 'block';
});

video2.addEventListener('play', function () {
    document.getElementById('playButton2').style.display = 'none';
});

// Muestra el botón al pasar el cursor sobre el contenedor del video
document.querySelectorAll('.video-container').forEach(container => {
    container.addEventListener('mouseover', function () {
        const button = this.querySelector('.play-button');
        if (button.style.display === 'none') {
            button.style.display = 'block';
        }
    });

    container.addEventListener('mouseout', function () {
        const video = this.querySelector('video');
        const button = this.querySelector('.play-button');
        if (video.paused) {
            button.style.display = 'block'; // Muestra el botón si el video está en pausa
        }
    });
});

	
	






 // Función para desplazamiento suave personalizado
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}







// Selecciona todos los enlaces de la navegación
const links = document.querySelectorAll('nav a[href^="#"], footer a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Desplazamiento suave
        if (targetElement) {
            smoothScroll(targetElement, 1500); // Ajusta la duración (en milisegundos)
        }
    });
});







// Lista de enlaces a los que no se les aplicará el efecto de carga
const excludedLinks = ['#footer', '#inicio', '#videosa', '#palabra', '#carusell', '#promociones'];

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Verificar si el enlace está en la lista de excluidos
        if (excludedLinks.includes(this.getAttribute('href'))) {
            return; // No hacer nada y permitir el comportamiento por defecto
        }

        e.preventDefault(); // Prevenir el comportamiento por defecto

        // Mostrar el efecto de carga
        const loading = document.getElementById('loading');
        loading.style.display = 'flex';

        // Redirigir después de un pequeño retraso
        setTimeout(() => {
            window.location.href = this.href; // Redirigir a la URL del enlace
        }, 2000); // Tiempo de carga (2000 ms = 2 segundos)
    });
});








let lastKnownScrollPosition = 0;
let ticking = false;

const fadeInElements = (scrollPos) => {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;

        // Verifica si el elemento está en la vista
        if (elementPosition < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            fadeInElements(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});








// Llama a la función al cargar la página
fadeInElements();




    window.onscroll = function() { stickyNav() };

    var wrapper = document.querySelector('.wrapper');
    var sticky = wrapper.offsetTop;

    function stickyNav() {
        if (window.pageYOffset > sticky) {
            wrapper.classList.add("sticky");
        } else {
            wrapper.classList.remove("sticky");
        }
    }
