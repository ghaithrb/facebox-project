document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("facebox-theme");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    button.setAttribute("aria-label", "Toggle dark mode");
    button.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const dark = document.body.classList.contains("dark-mode");
      localStorage.setItem("facebox-theme", dark ? "dark" : "light");
      button.textContent = dark ? "☀️" : "🌙";
    });
  });

  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.parentElement.querySelector("input");
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      button.textContent = show ? "Hide" : "Show";
      button.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  });

  document.querySelectorAll("[data-login-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const identity = form.querySelector("[name=identity]");
      const password = form.querySelector("[name=password]");
      const message = form.querySelector("[data-form-message]");
      if (!identity.value.trim()) {
        if (message) message.textContent = "Enter your email or phone number.";
        identity.focus();
        return;
      }
      if (!password.value) {
        if (message) message.textContent = "Enter your password.";
        password.focus();
        return;
      }
      if (message) message.textContent = "";
    });
  });

  const modal = document.querySelector("[data-signup-modal]");
  document.querySelectorAll("[data-open-signup]").forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      modal.querySelector("input")?.focus();
    });
  });

  if (modal) {
    const closeModal = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    };
    modal.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));
    modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  }

  document.querySelectorAll("[data-signup-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });

  document.querySelectorAll("[data-recovery-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const field = form.querySelector("[name=recovery]");
      const message = form.querySelector("[data-form-message]");
      if (!field.value.trim()) {
        message.textContent = "Enter an email or mobile number.";
        field.focus();
      } else {
        message.textContent = "Search submitted. Your account information can now be verified.";
        message.style.color = "var(--green-dark)";
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("open")) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
});
