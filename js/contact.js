const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactStatus.textContent = "Please complete all required fields with valid information.";
      contactStatus.classList.add("error");
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();

    contactStatus.classList.remove("error");
    contactStatus.textContent = `Thanks, ${name}. Your message has been received and we will reply soon.`;
    contactForm.reset();
  });
}
