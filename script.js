// MATRIX RAIN
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const chars = "01アイウエオカキクケコ10$#%&";
const charArray = chars.split("");
const fontSize = 18;
const columns = Math.floor(width / fontSize);
let drops = [];
for (let i = 0; i < columns; i++) drops[i] = Math.floor((Math.random() * -height) / 2);

function drawMatrix() {
  ctx.fillStyle = "rgba(5, 8, 12, 0.045)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#4afc7c";
  ctx.font = fontSize + 'px "Fira Code", monospace';
  for (let i = 0; i < drops.length; i++) {
    const text = charArray[Math.floor(Math.random() * charArray.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(drawMatrix);
}
drawMatrix();

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const newCols = Math.floor(width / fontSize);
  drops.length = newCols;
  for (let i = 0; i < newCols; i++) if (drops[i] === undefined) drops[i] = Math.floor((Math.random() * -height) / 2);
});

// scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((r) => observer.observe(r));

// scroll to top
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) scrollBtn.classList.add("visible");
  else scrollBtn.classList.remove("visible");
});
scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// fake send button
const sendBtn = document.getElementById("fakeSendBtn");
sendBtn.addEventListener("click", function () {
  const originalText = sendBtn.innerText;
  sendBtn.innerText = "✓ message_sent [demo]";
  sendBtn.style.background = "#2e7d5e";
  setTimeout(() => {
    sendBtn.innerText = originalText;
    sendBtn.style.background = "transparent";
  }, 2000);
});

// heart animation
const heart = document.getElementById("heartClick");
heart.addEventListener("click", () => {
  heart.style.transform = "scale(1.3)";
  heart.style.color = "#ff6b6b";
  setTimeout(() => {
    heart.style.transform = "";
    heart.style.color = "";
  }, 300);
});

// active nav highlight
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-menu a");
const secObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach((link) => {
          link.style.color = "";
          if (link.getAttribute("href") === "#" + id) {
            link.style.color = "#4afc7c";
            link.style.textShadow = "0 0 2px #4afc7c";
          } else {
            link.style.textShadow = "";
          }
        });
      }
    });
  },
  { threshold: 0.4 },
);
sections.forEach((sec) => secObserver.observe(sec));
