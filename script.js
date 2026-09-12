let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const body = document.body;
let particlesContainer = null;

// Función para activar el efecto de temblor al cavar
function triggerShake() {
  body.classList.add('shaking');
  setTimeout(() => {
    body.classList.remove('shaking');
  }, 350);
}

// Actualizar el color de fondo y la densidad de partículas según el nivel
function updateDepth(index) {
  // Cambiar clase de profundidad en el body (controla el color de fondo en CSS)
  body.className = `depth-${index}`;

  // Ajustar velocidad y densidad de partículas según la profundidad
  if (particlesContainer) {
    const pOptions = particlesContainer.options;
    pOptions.particles.number.value = 80 + (index * 30); // Más tierra al bajar
    pOptions.particles.move.speed.min = 1 + (index * 0.5);
    pOptions.particles.move.speed.max = 3 + (index * 1);
    particlesContainer.refresh();
  }
}

// Avanzar a la siguiente diapositiva (Descender)
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    triggerShake();
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('previous');
    currentSlide++;
    slides[currentSlide].classList.add('active');
    updateDepth(currentSlide);
  }
}

// Retroceder a la diapositiva anterior (Ascender)
function prevSlide() {
  if (currentSlide > 0) {
    slides[currentSlide].classList.remove('active');
    currentSlide--;
    slides[currentSlide].classList.remove('previous');
    slides[currentSlide].classList.add('active');
    updateDepth(currentSlide);
  }
}

// Volver a la superficie
function goToStart() {
  triggerShake();
  slides.forEach(slide => {
    slide.classList.remove('active', 'previous');
  });
  currentSlide = 0;
  slides[0].classList.add('active');
  updateDepth(0);
}

// Control por teclado (Flechas del teclado)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    nextSlide();
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    prevSlide();
  }
});

// Configuración de la librería tsParticles (Efecto de tierra cayendo)
tsParticles.load("tsparticles", {
  fpsLimit: 60,
  particles: {
    color: {
      value: ["#8c5a32", "#5c3a21", "#362213", "#a87b51", "#2b1a10"]
    },
    move: {
      direction: "bottom",
      enable: true,
      outModes: { default: "out" },
      random: true,
      speed: { min: 1, max: 3.5 },
      straight: false
    },
    number: {
      density: { enable: true, area: 800 },
      value: 90
    },
    opacity: {
      value: { min: 0.2, max: 0.75 }
    },
    shape: { type: "circle" },
    size: {
      value: { min: 2, max: 5 }
    }
  },
  detectRetina: true
}).then(container => {
  particlesContainer = container;
});
