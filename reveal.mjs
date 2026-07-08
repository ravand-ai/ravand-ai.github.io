const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const STAGGER_GROUPS = [
  ".hero-visual",
  ".hero-copy",
  ".section-head",
  ".grid-3",
  ".grid-2",
  ".pipeline",
  ".stack",
  ".approach-copy",
  ".cta",
  ".pipeline-tags",
  ".footer-inner",
];

function staggerGroup(group) {
  if (group.classList.contains("approach-copy")) {
    group.classList.add("reveal");
    return;
  }

  [...group.children].forEach((child, index) => {
    child.classList.add("reveal");
    child.style.setProperty("--reveal-delay", `${index * 0.09}s`);
  });
}

function revealHero() {
  const items = document.querySelectorAll(".hero-visual > *, .hero-copy > *");
  items.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${index * 0.1}s`);
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      items.forEach((el) => el.classList.add("is-visible"));
    });
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  targets.forEach((el) => {
    if (el.closest(".hero")) return;
    observer.observe(el);
  });
}

function init() {
  STAGGER_GROUPS.forEach((selector) => {
    document.querySelectorAll(selector).forEach(staggerGroup);
  });

  if (REDUCED) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  revealHero();
  initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}