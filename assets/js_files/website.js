// Webfolio JavaScript - Animation and Interactive Effects

document.addEventListener("DOMContentLoaded", function () {
  // Load footer
  loadFooter();

  // Initialize animations
  initializeAnimations();

  // Add scroll animations
  addScrollAnimations();

  // Add interactive effects
  addInteractiveEffects();
});

// Load footer from external file
function loadFooter() {
  fetch("/footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Footer not found");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((error) => {
      console.log("Footer loading failed:", error);
      // Fallback footer
      document.getElementById("footer-placeholder").innerHTML = `
        <footer style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 2rem;">
          <p>&copy; 2024 Project Vault. All rights reserved.</p>
        </footer>
      `;
    });
}

// Initialize card animations
function initializeAnimations() {
  const cards = document.querySelectorAll(".category-card");

  cards.forEach((card, index) => {
    // Set animation delay based on index
    card.style.animationDelay = `${index * 0.1}s`;

    // Add hover effect listeners
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Add scroll-triggered animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all cards
  document.querySelectorAll(".category-card").forEach((card) => {
    observer.observe(card);
  });
}

// Add interactive effects
function addInteractiveEffects() {
  // Enhanced button interactions
  const buttons = document.querySelectorAll(".view-button");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    button.addEventListener("click", function (e) {
      // Add ripple effect
      createRipple(e, this);
    });
  });

  // Back button enhancement
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)";
    });

    backButton.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  }
}

// Create ripple effect on button click
function createRipple(event, element) {
  const button = element;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add("ripple");

  // Add ripple styles
  circle.style.position = "absolute";
  circle.style.borderRadius = "50%";
  circle.style.background = "rgba(255, 255, 255, 0.6)";
  circle.style.transform = "scale(0)";
  circle.style.animation = "ripple 0.6s linear";
  circle.style.pointerEvents = "none";

  // Add CSS animation keyframes if not already added
  if (!document.querySelector("#ripple-keyframes")) {
    const style = document.createElement("style");
    style.id = "ripple-keyframes";
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);

  // Remove ripple after animation
  setTimeout(() => {
    circle.remove();
  }, 600);
}

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading animation for page
window.addEventListener("load", function () {
  document.body.classList.add("page-loaded");

  // Add subtle entrance animation to header
  const header = document.querySelector(".webfolio-header");
  if (header) {
    header.style.opacity = "0";
    header.style.transform = "translateY(-20px)";

    setTimeout(() => {
      header.style.transition = "all 0.8s ease-out";
      header.style.opacity = "1";
      header.style.transform = "translateY(0)";
    }, 100);
  }
});
