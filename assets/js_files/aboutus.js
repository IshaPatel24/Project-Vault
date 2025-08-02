// about.js — About Page Specific Features
document.addEventListener("DOMContentLoaded", () => {
  // Animate on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll(".about-card, .stat-card, .feature-item")
    .forEach((el) => observer.observe(el));

  // Stats Counter
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;

          let number = parseInt(text);
          let suffix = "";
          if (text.includes("+")) {
            number = parseInt(text.replace("+", ""));
            suffix = "+";
          } else if (text.includes("%")) {
            number = parseInt(text.replace("%", ""));
            suffix = "%";
          } else if (text === "∞") return;

          animateCounter(el, 0, number, suffix);
          statsObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => statsObserver.observe(stat));

  function animateCounter(element, start, end, suffix) {
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(
        start + (end - start) * easeOutQuart(progress)
      );
      element.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(updateCounter);
    }

    requestAnimationFrame(updateCounter);
  }

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  // Parallax Icons
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll(".floating-icon").forEach((icon, i) => {
      const speed = 0.1 + i * 0.05;
      icon.style.transform = `translateY(${-(scrolled * speed)}px) rotate(${
        scrolled * 0.1
      }deg)`;
    });
  });

  // Typing effect
  const mainTitle = document.querySelector(".main-title");
  if (mainTitle) {
    const originalText = mainTitle.textContent;
    mainTitle.textContent = "";
    let i = 0;
    function typeWriter() {
      if (i < originalText.length) {
        mainTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    setTimeout(typeWriter, 500);
  }
});
