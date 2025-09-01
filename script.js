// ⏳ Cuenta regresiva
const countdownDate = new Date("July 28, 2027 16:00:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector(".countdown").innerHTML = "¡Es hoy!";
    }
}, 1000);

// 🎊 Confeti animado
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetto");

    // Posición aleatoria horizontal
    confetti.style.left = Math.random() * window.innerWidth + "px";

    // Tamaño aleatorio
    const size = Math.random() * 10 + 5;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";

    // Color aleatorio
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

    // Forma aleatoria: círculo, rectángulo, estrella
    const formas = ["circle", "square", "triangle"];
    const forma = formas[Math.floor(Math.random() * formas.length)];

    if (forma === "circle") {
        confetti.style.borderRadius = "50%";
    } else if (forma === "square") {
        confetti.style.borderRadius = "0";
    } else if (forma === "triangle") {
        confetti.style.width = "0";
        confetti.style.height = "0";
        confetti.style.borderLeft = size / 2 + "px solid transparent";
        confetti.style.borderRight = size / 2 + "px solid transparent";
        confetti.style.borderBottom = size + "px solid " + confetti.style.backgroundColor;
        confetti.style.backgroundColor = "transparent";
    }

    // Duración de caída aleatoria
    confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";

    document.querySelector(".confetti").appendChild(confetti);

    confetti.addEventListener("animationend", () => confetti.remove());
}

// Generar confeti constantemente
setInterval(createConfetti, 100);


// Generar musica

const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let musicStarted = false;
let musicPlaying = false;

// Función para iniciar música al primer click
function startMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicPlaying = true;
            updateMusicBtn();
        }).catch(() => {});
    }
}

// Función para pausar/reproducir desde el botón
function toggleMusic() {
    if (!musicStarted) {
        startMusic();
    } else {
        if (musicPlaying) {
            bgMusic.pause();
            musicPlaying = false;
        } else {
            bgMusic.play();
            musicPlaying = true;
        }
        updateMusicBtn();
    }
}

function updateMusicBtn() {
    if (musicPlaying) {
        musicBtn.classList.add("playing");
    } else {
        musicBtn.classList.remove("playing");
    }
}

// Reproducir música al primer click en la página
document.body.addEventListener("click", startMusic, { once: true });

// Escuchar click en el botón de música
musicBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // evita reiniciar el listener del body
    toggleMusic();
});