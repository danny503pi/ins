let index = 0;

function mostrarImagen() {
    const imagenes = document.querySelector('.imagenes');
    const totalImagenes = imagenes.children.length;
    index = (index + 1) % totalImagenes;
    const desplazamiento = -index * 100;
    imagenes.style.transform = `translateX(${desplazamiento}%)`;
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
        track.style.left = `${Math.min(leftPosition + carruseelWidth, 0)}px`;
    }
}

// Función para mover el carrusel hacia adelante
let nextAction = (leftPosition, trackWidth, listWidth, carruseelWidth, track) => {
    // Evitar mover más allá del límite derecho
    if (Math.abs(leftPosition) < (trackWidth - listWidth)) {
        track.style.left = `${Math.max(leftPosition - carruseelWidth, -(trackWidth - listWidth))}px`;
    }
}

   document.addEventListener('DOMContentLoaded', () => {
        const videos = document.querySelectorAll('.vdio');
        const buttons = document.querySelectorAll('.control-btn');

        buttons.forEach((button, index) => {
            const video = videos[index]; // Selecciona el video correspondiente

            button.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    button.textContent = 'Pausar';
                    video.classList.remove('paused');
                } else {
                    video.pause();
                    button.textContent = 'Reproducir';
                    video.classList.add('paused');
                }
            });
        });
    });
	
	
const loadLinks = document.querySelectorAll('.load-link');

loadLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Evita que el enlace se siga inmediatamente
        const href = this.getAttribute('href'); // Obtén la URL del enlace
        
        // Muestra el loader
        document.getElementById('loader').style.display = 'flex';
        
        // Simula un tiempo de carga (puedes ajustar esto)
        setTimeout(() => {
            window.location.href = href; // Redirige después de mostrar el loader
        }, 1500); // 1500 ms = 1.5 segundos
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
