import { initNavigation } from "./navigation.js";
import { initReveal } from "./reveal.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initReveal();

  // Page-specific modules loaded dynamically
  const page = document.body.dataset.page;

  if (page === "gallery") {
    import("./gallery.js").then((m) => m.initGallery());
  }

  if (page === "contact" || page === "home") {
    import("./form.js").then((m) => m.initForm());
  }
});
