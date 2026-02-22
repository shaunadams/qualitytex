import { qs } from "./utils.js";

export function initNavigation() {
  const nav = qs("nav");
  const toggle = qs("[data-nav-toggle]");
  const menu = qs("[data-nav-menu]");
  const logoFull = qs("[data-logo-full]");
  const logoMark = qs("[data-logo-mark]");

  if (!nav || !toggle || !menu) return;

  // Mobile menu toggle
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));

    if (isOpen) {
      menu.style.maxHeight = "0";
      menu.style.opacity = "0";
    } else {
      menu.style.maxHeight = menu.scrollHeight + "px";
      menu.style.opacity = "1";
    }
  });

  // Logo swap helper
  function swapLogo(scrolled) {
    if (!logoFull || !logoMark) return;
    if (scrolled) {
      logoFull.classList.add("hidden");
      logoMark.classList.remove("hidden");
    } else {
      logoFull.classList.remove("hidden");
      logoMark.classList.add("hidden");
    }
  }

  // Scroll-aware nav background (only on pages with light heroes)
  const page = document.body.dataset.page;
  const alwaysWhiteNav = page === "gallery" || page === "contact" || page === "about";

  if (alwaysWhiteNav) {
    nav.classList.add("bg-white", "shadow-md");
    nav.classList.remove("bg-transparent");
  }

  const onScroll = () => {
    const scrolled = window.scrollY > 60;
    swapLogo(scrolled);
    if (!alwaysWhiteNav) {
      if (scrolled) {
        nav.classList.add("bg-white", "shadow-md", "py-3");
        nav.classList.remove("bg-transparent", "py-5");
      } else {
        nav.classList.remove("bg-white", "shadow-md", "py-3");
        nav.classList.add("bg-transparent", "py-5");
      }
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
