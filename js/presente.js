const relationshipStartDate = new Date("2021-03-03T08:00:00");

const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const openSurpriseBtn = document.getElementById("open-surprise");
const loveBtn = document.getElementById("love-btn");
const heartsContainer = document.getElementById("hearts-container");

const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");

let musicStarted = false;
let heartsInterval = null;

/* =========================
   CONTADOR DO TEMPO JUNTOS
========================= */
function updateRelationshipCounter() {
  const now = new Date();

  let years = now.getFullYear() - relationshipStartDate.getFullYear();
  let months = now.getMonth() - relationshipStartDate.getMonth();
  let days = now.getDate() - relationshipStartDate.getDate();
  let hours = now.getHours() - relationshipStartDate.getHours();

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }

  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  yearsEl.textContent = years;
  monthsEl.textContent = months;
  daysEl.textContent = days;
  hoursEl.textContent = hours;
}

/* =========================
   MÚSICA
========================= */
async function startMusic() {
  if (musicStarted) return;

  try {
    music.volume = 0.45;
    await music.play();
    musicStarted = true;
    musicToggle.textContent = "♫ Música tocando";
  } catch (error) {
    console.warn("Não foi possível iniciar a música automaticamente:", error);
    musicToggle.textContent = "♫ Tocar música";
  }
}

async function toggleMusic() {
  try {
    if (!musicStarted) {
      await startMusic();
      return;
    }

    if (music.paused) {
      await music.play();
      musicToggle.textContent = "♫ Música tocando";
    } else {
      music.pause();
      musicToggle.textContent = "♫ Música pausada";
    }
  } catch (error) {
    console.warn("Erro ao alternar música:", error);
  }
}

/* =========================
   CORAÇÕES
========================= */
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "❤" : "♡";

  const left = Math.random() * 100;
  const size = Math.random() * 18 + 16;
  const duration = Math.random() * 3 + 4;
  const drift = Math.random() * 60 - 30;

  heart.style.left = `${left}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.setProperty("--drift", `${drift}px`);

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

function burstHearts(amount = 18) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      createHeart();
    }, i * 100);
  }
}

function startSoftHeartFlow() {
  if (heartsInterval) return;

  heartsInterval = setInterval(() => {
    createHeart();
  }, 900);
}

function stopSoftHeartFlow() {
  if (heartsInterval) {
    clearInterval(heartsInterval);
    heartsInterval = null;
  }
}

/* =========================
   REVEAL AO SCROLL
========================= */
function setupRevealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

/* =========================
   BOTÃO ABRIR PRESENTE
========================= */
function handleOpenSurprise() {
  startMusic();
  burstHearts(24);
  startSoftHeartFlow();

  const targetSection = document.querySelector(".counter-section");

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  openSurpriseBtn.textContent = "Seu presente foi aberto ♡";
  openSurpriseBtn.disabled = true;
  openSurpriseBtn.style.opacity = "0.9";
  openSurpriseBtn.style.cursor = "default";
}

/* =========================
   BOTÃO FINAL
========================= */
function handleLoveButton() {
  burstHearts(30);

  loveBtn.textContent = "Eu te amo muito ♡";
  loveBtn.disabled = true;
  loveBtn.style.opacity = "0.95";
  loveBtn.style.cursor = "default";
}

/* =========================
   INTERAÇÕES EXTRAS
========================= */
function enablePhotoGlowEffect() {
  const photos = document.querySelectorAll(".photo-card");

  photos.forEach((photo) => {
    photo.addEventListener("mouseenter", () => {
      photo.style.boxShadow = "0 18px 40px rgba(221, 176, 171, 0.18)";
    });

    photo.addEventListener("mouseleave", () => {
      photo.style.boxShadow = "";
    });
  });
}

/* =========================
   EVENTOS
========================= */
musicToggle.addEventListener("click", toggleMusic);
openSurpriseBtn.addEventListener("click", handleOpenSurprise);
loveBtn.addEventListener("click", handleLoveButton);

/* =========================
   INIT
========================= */
updateRelationshipCounter();
setInterval(updateRelationshipCounter, 1000 * 60);

setupRevealOnScroll();
enablePhotoGlowEffect();