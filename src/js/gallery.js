import { qs, qsa, escapeHTML } from "./utils.js";

export async function initGallery() {
  const container = qs("[data-gallery-grid]");
  const filterBar = qs("[data-gallery-filters]");
  if (!container) return;

  let items = [];

  try {
    const res = await fetch("/src/data/work.json");
    items = await res.json();
  } catch {
    container.innerHTML =
      '<p class="text-slate-500 text-center col-span-full py-12">Unable to load gallery items.</p>';
    return;
  }

  function renderItems(filtered) {
    if (filtered.length === 0) {
      container.innerHTML =
        '<p class="text-slate-500 text-center col-span-full py-12">No projects match this filter. Try selecting a different category.</p>';
      return;
    }

    container.innerHTML = filtered
      .map(
        (item) => `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-shadow group">
        <div class="relative h-56 overflow-hidden bg-slate-100">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onerror="this.style.display='none'" />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span class="inline-block bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">${escapeHTML(item.tags[0])}</span>
          </div>
        </div>
        <div class="p-5">
          <h3 class="font-bold text-primary mb-2">${escapeHTML(item.title)}</h3>
          <p class="text-slate-600 text-sm leading-relaxed">${escapeHTML(item.description)}</p>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Initial render
  renderItems(items);

  // Filter logic
  if (filterBar) {
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;

      const tag = btn.dataset.filter;

      // Update active chip
      qsa("[data-filter]", filterBar).forEach((b) => {
        b.classList.remove("bg-secondary", "text-white");
        b.classList.add("bg-slate-100", "text-slate-700");
      });
      btn.classList.add("bg-secondary", "text-white");
      btn.classList.remove("bg-slate-100", "text-slate-700");

      // Filter and render
      const filtered = tag === "all" ? items : items.filter((i) => i.tags.includes(tag));
      renderItems(filtered);
    });
  }
}
