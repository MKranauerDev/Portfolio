(function () {
  emailjs.init("GMM-78pKLQ7rE44Gs");

  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const asuntoInput = document.getElementById("asunto");
  const mensajeInput = document.getElementById("mensaje");
  const submitBtn = document.getElementById("send-btn");
  const formAlert = document.getElementById("form-alert");
  const formAlertText = document.getElementById("form-alert-text");
  const contactForm = document.getElementById("contact-form");

  if (
    !contactForm ||
    !nombreInput ||
    !emailInput ||
    !asuntoInput ||
    !mensajeInput ||
    !submitBtn ||
    !formAlert ||
    !formAlertText
  ) {
    console.error("Formulario no encontrado");
    return;
  }

  const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showAlert = (message, type = "error") => {
    formAlertText.textContent = message;
    formAlert.className = `form-alert ${type}`;
  };

  const hideAlert = () => {
    formAlertText.textContent = "";
    formAlert.className = "form-alert hidden";
  };

  submitBtn.addEventListener("click", async function () {
    hideAlert();

    const name = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const subject = asuntoInput.value.trim();
    const message = mensajeInput.value.trim();

    if (!name) {
      showAlert("Por favor, ingresá tu nombre.", "error");
      return;
    }

    if (name.length < 3) {
      showAlert("El nombre debe tener al menos 3 letras.", "error");
      return;
    }

    if (!namePattern.test(name) || /\d/.test(name)) {
      showAlert("El nombre no puede contener números.", "error");
      return;
    }

    if (!email) {
      showAlert("Por favor, ingresá tu email.", "error");
      return;
    }

    if (!emailPattern.test(email)) {
      showAlert("Ingresá un email válido.", "error");
      return;
    }

    if (!subject) {
      showAlert("El asunto no puede estar vacío.", "error");
      return;
    }

    if (subject.length < 3) {
      showAlert("El asunto debe tener al menos 3 caracteres.", "error");
      return;
    }

    if (!message) {
      showAlert("El mensaje no puede estar vacío.", "error");
      return;
    }

    if (message.length < 10) {
      showAlert("El mensaje debe tener al menos 10 caracteres.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
      await emailjs.send("service_drev21q", "template_2qjgw4q", {
        name,
        email,
        subject,
        message,
      });

      showAlert("¡Has enviado tu mensaje con éxito!", "success");
      contactForm.reset();

      setTimeout(() => {
        hideAlert();
      }, 5000);
    } catch (error) {
      console.error(error);
      showAlert("Error al enviar el mensaje.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar mensaje";
    }
  });
})();