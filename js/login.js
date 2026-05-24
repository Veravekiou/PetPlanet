const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");
const signupStatus = document.getElementById("signup-status");
const signinStatus = document.getElementById("signin-status");
const forgotPasswordButton = document.querySelector(".forgot-password");

function showFormStatus(statusElement, message, isError) {
  if (!statusElement) {
    return;
  }

  statusElement.textContent = message;
  statusElement.classList.toggle("error", Boolean(isError));
}

function handleDemoSubmit(form, statusElement, successMessage) {
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      showFormStatus(statusElement, "Please fill in all fields with valid details.", true);
      form.reportValidity();
      return;
    }

    showFormStatus(statusElement, successMessage, false);
    form.reset();
  });
}

if (signUpButton && signInButton && container) {
  signUpButton.addEventListener("click", function () {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", function () {
    container.classList.remove("right-panel-active");
  });
}

handleDemoSubmit(
  signupForm,
  signupStatus,
  "Account created successfully. This is a frontend demo, so no data was saved."
);

handleDemoSubmit(
  signinForm,
  signinStatus,
  "Login successful. Welcome back to the PetPlanet demo."
);

if (forgotPasswordButton) {
  forgotPasswordButton.addEventListener("click", function () {
    showFormStatus(signinStatus, "Password reset instructions would be sent in a full app demo.", false);
  });
}
