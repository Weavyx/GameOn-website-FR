/**
 * Toggle the navigation menu in responsive mode.
 */
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".btn-signup");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form[name='reserve']");
const modalBody = document.querySelector(".modal-body");

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);

function launchModal() {
  modalbg.style.display = "block";
  document.body.classList.add("modal-open");
}

function closeModal() {
  modalbg.style.display = "none";
  document.body.classList.remove("modal-open");
}

/**
 * Validate the form fields.
 * @returns {boolean} True if the form is valid, otherwise false.
 */
function validate() {
  let isValid = true;

  // Clear previous errors
  formData.forEach((field) => {
    field.removeAttribute("data-error");
    field.setAttribute("data-error-visible", "false");
  });

  // Validate each field
  isValid &= checkField(
    "first",
    /^[a-zA-Z]{2,}$/,
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
  );
  isValid &= checkField(
    "last",
    /^[a-zA-Z]{2,}$/,
    "Veuillez entrer 2 caractères ou plus pour le champ du nom."
  );
  isValid &= checkField(
    "email",
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    "Veuillez entrer une adresse email valide."
  );
  isValid &= checkField(
    "birthdate",
    /^\d{4}-\d{2}-\d{2}$/,
    "Veuillez entrer une date de naissance valide au format AAAA-MM-JJ."
  );
  isValid &= checkField(
    "quantity",
    /^\d{1,2}$/,
    "Veuillez entrer un nombre entre 0 et 99."
  );
  isValid &= checkLocation();
  isValid &= checkTerms();

  return !!isValid;
}

/**
 * Check an individual field against a regex pattern.
 * @param {string} id - The ID of the field to check.
 * @param {RegExp} regex - The regex pattern to test against.
 * @param {string} errorMessage - The error message to display if the field is invalid.
 * @returns {boolean} True if the field is valid, otherwise false.
 */
function checkField(id, regex, errorMessage) {
  const value = document.getElementById(id).value;
  if (!regex.test(value)) {
    const field = document.getElementById(id).closest(".formData");
    field.setAttribute("data-error", errorMessage);
    field.setAttribute("data-error-visible", "true");
    return false;
  }
  return true;
}

/**
 * Check if a location is selected.
 * @returns {boolean} True if a location is selected, otherwise false.
 */
function checkLocation() {
  const locationChecked = document.querySelector(
    "input[name='location']:checked"
  );
  if (!locationChecked) {
    const locationField = document
      .querySelector("input[name='location']")
      .closest(".formData");
    locationField.setAttribute(
      "data-error",
      "Veuillez sélectionner une ville."
    );
    locationField.setAttribute("data-error-visible", "true");
    return false;
  }
  return true;
}

/**
 * Check if the terms and conditions are accepted.
 * @returns {boolean} True if the terms are accepted, otherwise false.
 */
function checkTerms() {
  const terms = document.getElementById("checkbox1").checked;
  if (!terms) {
    const termsField = document
      .getElementById("checkbox1")
      .closest(".formData");
    termsField.setAttribute(
      "data-error",
      "Vous devez accepter les conditions d'utilisation."
    );
    termsField.setAttribute("data-error-visible", "true");
    return false;
  }
  return true;
}

// Handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validate()) {
    // Form is valid, show confirmation message
    showConfirmationMessage();
    logFormData();
  }
});

/**
 * Display a confirmation message after successful form submission.
 */
function showConfirmationMessage() {
  modalBody.innerHTML = `
    <div class="confirmation-message">
      <p class="text-reward">Merci pour votre inscription</p>
      <button class="btn-close-modal">Fermer</button>
    </div>
  `;
  document
    .querySelector(".btn-close-modal")
    .addEventListener("click", closeModal);
}

function logFormData() {
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
}
