function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".btn-signup");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form[name='reserve']");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.body.classList.add("modal-open");
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  document.body.classList.remove("modal-open");
}

// validate form
function validate() {
  let isValid = true;

  // Clear previous errors
  formData.forEach((field) => {
    field.removeAttribute("data-error");
    field.setAttribute("data-error-visible", "false");
  });

  // Check first name
  const firstName = document.getElementById("first").value;
  if (firstName.length < 2) {
    const firstNameField = document
      .getElementById("first")
      .closest(".formData");
    firstNameField.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    firstNameField.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Check last name
  const lastName = document.getElementById("last").value;
  if (lastName.length < 2) {
    const lastNameField = document.getElementById("last").closest(".formData");
    lastNameField.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    lastNameField.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Check email
  const email = document.getElementById("email").value;
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(email)) {
    const emailField = document.getElementById("email").closest(".formData");
    emailField.setAttribute(
      "data-error",
      "Veuillez entrer une adresse email valide."
    );
    emailField.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Check birthdate
  const birthdate = document.getElementById("birthdate").value;
  if (!birthdate) {
    const birthdateField = document
      .getElementById("birthdate")
      .closest(".formData");
    birthdateField.setAttribute(
      "data-error",
      "Vous devez entrer votre date de naissance."
    );
    birthdateField.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Check quantity
  const quantity = document.getElementById("quantity").value;
  if (quantity === "" || isNaN(quantity) || quantity < 0 || quantity > 99) {
    const quantityField = document
      .getElementById("quantity")
      .closest(".formData");
    quantityField.setAttribute(
      "data-error",
      "Veuillez entrer un nombre entre 0 et 99."
    );
    quantityField.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Check location
  const locationChecked = document.querySelector(
    "input[name='location']:checked"
  );
  if (!locationChecked) {
    const locationField = document
      .querySelector("input[name='location']")
      .closest(".formData");
    locationField.setAttribute("data-error", "Vous devez choisir une option.");
    locationField.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Check terms and conditions
  const terms = document.getElementById("checkbox1").checked;
  if (!terms) {
    const termsField = document
      .getElementById("checkbox1")
      .closest(".formData");
    termsField.setAttribute(
      "data-error",
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    termsField.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  return isValid;
}

// handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validate()) {
    // Form is valid, you can submit it or do something else
    console.log("Form submitted successfully!");
    closeModal();
  }
});
