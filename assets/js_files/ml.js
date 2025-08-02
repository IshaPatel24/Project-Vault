// ML Projects JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Simple intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe all project cards
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    observer.observe(card);
  });

  // Simple hover effects for tech tags
  const techTags = document.querySelectorAll(".tech-tag");
  techTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-1px)";
    });

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
    });
  });

  // View code button click effects
  const viewCodeBtns = document.querySelectorAll(".view-code-btn");
  viewCodeBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Simple click feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      console.log(
        "Viewing code for:",
        this.closest(".project-card").querySelector("h3").textContent
      );
    });
  });

  // Back button animation
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.addEventListener("click", function (e) {
      e.preventDefault();

      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Going back...';

      setTimeout(() => {
        window.location.href = this.getAttribute("href");
      }, 300);
    });
  }

  // Smooth scrolling for internal links
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

  // Update project statistics
  updateProjectStats();
});

// Update project statistics
function updateProjectStats() {
  const totalProjects = document.querySelectorAll(".project-card").length;
  const techTags = document.querySelectorAll(".tech-tag");
  const uniqueTechnologies = new Set(
    Array.from(techTags).map((tag) => tag.textContent)
  );

  console.log(
    `ML Projects Dashboard: ${totalProjects} projects using ${uniqueTechnologies.size} technologies`
  );
}
