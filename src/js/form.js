import { qs } from "./utils.js";

export function initForm() {
  const form = qs("[data-contact-form]");
  if (!form) return;

  const feedback = qs("[data-form-feedback]");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot check
    const hp = form.querySelector("[name='_gotcha']");
    if (hp && hp.value) return;

    // Clear previous errors
    form.querySelectorAll("[data-error]").forEach((el) => {
      el.textContent = "";
      el.classList.add("hidden");
    });

    // Validate
    const errors = [];
    const name = form.querySelector("[name='name']");
    const email = form.querySelector("[name='email']");
    const message = form.querySelector("[name='message']");

    if (!name.value.trim()) {
      showError(name, "Please enter your name.");
      errors.push("name");
    }

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, "Please enter a valid email address.");
      errors.push("email");
    }

    if (!message.value.trim()) {
      showError(message, "Please enter a message.");
      errors.push("message");
    }

    if (errors.length > 0) {
      const first = form.querySelector(`[name='${errors[0]}']`);
      if (first) first.focus();
      return;
    }

    // Submit
    const submitBtn = form.querySelector("[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        if (feedback) {
          feedback.innerHTML =
            '<p class="text-emerald-700 font-medium">Thank you! Your message has been sent. We\'ll be in touch shortly.</p>';
          feedback.classList.remove("hidden");
        }
      } else {
        throw new Error("Server error");
      }
    } catch {
      if (feedback) {
        feedback.innerHTML =
          '<p class="text-red-600 font-medium">Something went wrong. Please try again, or contact us directly at <a href="tel:07947834163" class="underline">07947 834163</a>.</p>';
        feedback.classList.remove("hidden");
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });

  function showError(input, msg) {
    const errorEl = input.parentElement.querySelector("[data-error]");
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.remove("hidden");
    }
    input.classList.add("border-red-400");
    input.addEventListener(
      "input",
      () => {
        input.classList.remove("border-red-400");
        if (errorEl) {
          errorEl.textContent = "";
          errorEl.classList.add("hidden");
        }
      },
      { once: true }
    );
  }
}
