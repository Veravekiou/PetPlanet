const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");
const signupStatus = document.getElementById("signup-status");
const signinStatus = document.getElementById("signin-status");
const forgotPasswordButton = document.querySelector(".forgot-password");
const socialButtons = document.querySelectorAll(".social");
const demoAccountKey = "petplanetDemoAccount";

function showFormStatus(statusElement, message, isError) {
  if (!statusElement) {
    return;
  }

  statusElement.textContent = message;
  statusElement.classList.toggle("error", Boolean(isError));
}

function getDemoAccount() {
  try {
    return JSON.parse(localStorage.getItem(demoAccountKey));
  } catch (error) {
    return null;
  }
}

if (signUpButton && signInButton && container) {
  signUpButton.addEventListener("click", function () {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", function () {
    container.classList.remove("right-panel-active");
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!signupForm.checkValidity()) {
      showFormStatus(signupStatus, "Please fill in all fields with valid details.", true);
      signupForm.reportValidity();
      return;
    }

    const formData = new FormData(signupForm);
    const account = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim().toLowerCase(),
    };

    localStorage.setItem(demoAccountKey, JSON.stringify(account));
    showFormStatus(
      signupStatus,
      `Demo account created for ${account.name}. You can now sign in with this email.`,
      false
    );
    signupForm.reset();
  });
}

if (signinForm) {
  signinForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!signinForm.checkValidity()) {
      showFormStatus(signinStatus, "Please fill in all fields with valid details.", true);
      signinForm.reportValidity();
      return;
    }

    const formData = new FormData(signinForm);
    const email = formData.get("email").trim().toLowerCase();
    const account = getDemoAccount();

    if (account && account.email === email) {
      showFormStatus(signinStatus, `Welcome back, ${account.name}. This is a frontend demo login.`, false);
    } else {
      showFormStatus(signinStatus, "Demo login successful. No backend authentication was used.", false);
    }

    signinForm.reset();
  });
}

if (forgotPasswordButton) {
  forgotPasswordButton.addEventListener("click", function () {
    showFormStatus(signinStatus, "Password reset instructions would be emailed in a full app.", false);
  });
}

socialButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const form = button.closest("form");
    const statusElement = form === signupForm ? signupStatus : signinStatus;
    showFormStatus(statusElement, "Social login is shown as UI only in this frontend demo.", false);
  });
});
