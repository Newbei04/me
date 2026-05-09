// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => io.observe(el));

// ACTIVE NAV HIGHLIGHT
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const navObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((a) => {
          a.style.color = "";
          if (a.getAttribute("href") === "#" + e.target.id) {
            a.style.color = "var(--text)";
          }
        });
      }
    });
  },
  { threshold: 0.5 },
);
sections.forEach((s) => navObs.observe(s));

// CONTACT FORM (UI feedback only)
document.querySelector(".contact-form .btn-primary").addEventListener("click", function () {
  this.textContent = "message_sent ✓";
  this.style.background = "#22c55e";
  setTimeout(() => {
    this.textContent = "send_message()";
    this.style.background = "";
  }, 3000);
});

// ===== HEART CLICK =====
const heartBtn = document.getElementById("heartBtn");
heartBtn.addEventListener("click", () => {
  heartBtn.classList.remove("liked");
  void heartBtn.offsetWidth; // reflow to restart animation
  heartBtn.classList.add("liked");
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  },
  { passive: true },
);

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
