export function initBeforeAfter() {
  document.querySelectorAll("[data-before-after]").forEach((slider) => {
    const before = slider.querySelector(".ba-before");
    const handle = slider.querySelector(".ba-handle");
    let active = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      const pct = Math.min(Math.max(((x - rect.left) / rect.width) * 100, 0), 100);
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;
    }

    slider.addEventListener("pointerdown", (e) => {
      active = true;
      slider.setPointerCapture(e.pointerId);
      setPosition(e.clientX);
    });

    slider.addEventListener("pointermove", (e) => {
      if (active) setPosition(e.clientX);
    });

    slider.addEventListener("pointerup", () => {
      active = false;
    });
  });
}
