/** @param {string} sel */
export const qs = (sel, root = document) => root.querySelector(sel);

/** @param {string} sel */
export const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

/**
 * Escape HTML entities to prevent XSS when rendering user/JSON data.
 * @param {string} str
 */
export function escapeHTML(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/**
 * Simple debounce utility.
 * @param {Function} fn
 * @param {number} ms
 */
export function debounce(fn, ms = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
