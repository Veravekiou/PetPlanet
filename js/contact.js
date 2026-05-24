const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

function showContactStatus(message, isError) {
  contactStatus.textContent = message;
  contactStatus.classList.toggle("error", Boolean(isError));
}

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      showContactStatus("Please complete all required fields with valid information.", true);
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const subject = formData.get("subject").trim();

    showContactStatus(
      `Thanks, ${name}. Your "${subject}" message was received in this frontend demo.`,
      false
    );
    contactForm.reset();
  });

  contactForm.addEventListener("input", function () {
    if (contactStatus.classList.contains("error")) {
      showContactStatus("", false);
    }
  });
}
