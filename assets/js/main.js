(() => {
  "use strict";

  const config = window.PK_CONFIG;

  if (config) {
    document.querySelectorAll("[data-contact-phone]").forEach((node) => {
      node.textContent = config.phoneDisplay;
    });
    document.querySelectorAll("[data-contact-email]").forEach((node) => {
      node.textContent = config.email;
    });
    document.querySelectorAll('[data-contact-link="phone"]').forEach((node) => {
      node.href = `tel:${config.phoneHref}`;
      node.setAttribute("aria-label", `Позвонить: ${config.phoneDisplay}`);
    });
    document.querySelectorAll('[data-contact-link="email"]').forEach((node) => {
      node.href = `mailto:${config.email}`;
      node.setAttribute("aria-label", `Написать: ${config.email}`);
    });

    const structuredData = document.createElement("script");
    structuredData.type = "application/ld+json";
    structuredData.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ПромКинематика",
      url: "https://promkinematika.ru/",
      email: config.email,
      telephone: config.phoneHref,
      description: "Промышленная роботизация на базе KUKA: моделирование, проектирование, интеграция и пусконаладка."
    });
    document.head.appendChild(structuredData);
  }

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const header = document.querySelector("[data-header]");
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const closeMenu = () => {
    toggle?.setAttribute("aria-expanded", "false");
    menu?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    menu?.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
