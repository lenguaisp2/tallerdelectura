let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const body = document.body;
let particlesContainer = null;

// Efecto de temblor al avanzar
function triggerShake() {
  body.classList.add('shaking');
  setTimeout(() => {
    body.classList.remove('shaking');
  }, 350);
}

// Actualizar fondo y partículas según el nivel
function updateDepth(index) {
  body.className = `depth-${index}`;

  if (particlesContainer) {
    const pOptions = particlesContainer.options;
    pOptions.particles.number.value = 80 + (index * 40);
    pOptions.particles.move.speed.min = 1 + (index * 0.7);
    pOptions.particles.move.speed.max = 3 + (index * 1.2);
    particlesContainer.refresh();
  }
}

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

function prevSlide() {
  if (currentSlide > 0) {
    slides[currentSlide].classList.remove('active');
    currentSlide--;
    slides[currentSlide].classList.remove('previous');
    slides[currentSlide].classList.add('active');
    updateDepth(currentSlide);
  }
}

function goToStart() {
  triggerShake();
  slides.forEach(slide => {
    slide.classList.remove('active', 'previous');
  });
  currentSlide = 0;
  slides[0].classList.add('active');
  updateDepth(0);
}

// Navegación con teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    nextSlide();
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    prevSlide();
  }
});

// Configuración de la librería tsParticles
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
