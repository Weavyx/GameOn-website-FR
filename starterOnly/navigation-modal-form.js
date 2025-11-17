/**
 * Toggle the navigation menu in responsive mode.
 */
function editNav() {
  const navToggle = document.getElementById("myTopnav");
  navToggle.classList.toggle("responsive");
  // Update aria-expanded for accessibility
  const toggleBtn = document.getElementById("navToggle");
  const isExpanded = navToggle.classList.contains("responsive");
  toggleBtn.setAttribute("aria-expanded", isExpanded);
}

// Handle button click instead of inline onclick
document.addEventListener("DOMContentLoaded", () => {
  const navToggleBtn = document.getElementById("navToggle");
  if (navToggleBtn) {
    navToggleBtn.addEventListener("click", editNav);
  }
});

// DOM elements
const modalbg = document.getElementById("modal");
const modalBtn = document.querySelectorAll(".btn-signup");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.getElementById("closeBtn");
const form = document.querySelector("form[name='reserve']");
const modalBody = document.querySelector(".modal-body");

// Add event listeners
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
if (closeBtn) closeBtn.addEventListener("click", closeModal);

function launchModal() {
  modalbg.style.display = "block";
  document.body.classList.add("modal-open");
  closeBtn.focus(); // Accessibility: Set focus to close button
}

function closeModal() {
  modalbg.style.display = "none";
  document.body.classList.remove("modal-open");
}

// Close modal when clicking outside of the modal content (accessibility friendly)
modalbg.addEventListener("click", function (e) {
  if (e.target === modalbg) {
    closeModal();
  }
});

// Keyboard escape to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalbg.style.display === "block") {
    closeModal();
  }
});

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
    /^[a-zA-ZÀ-ÿ\s'-]{2,}$/,
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
  );
  isValid &= checkField(
    "last",
    /^[a-zA-ZÀ-ÿ\s'-]{2,}$/,
    "Veuillez entrer 2 caractères ou plus pour le champ du nom."
  );
  isValid &= checkField(
    "email",
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Veuillez entrer une adresse email valide."
  );
  isValid &= checkField(
    "birthdate",
    /^\d{4}-\d{2}-\d{2}$/,
    "Vous devez entrer votre date de naissance."
  );
  isValid &= checkField(
    "quantity",
    /^([0-9]|[1-9][0-9])$/,
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
  const field = document.getElementById(id);
  const value = field?.value ?? "";

  if (!regex.test(value)) {
    const fieldContainer = field?.closest(".formData");
    if (fieldContainer) {
      fieldContainer.setAttribute("data-error", errorMessage);
      fieldContainer.setAttribute("data-error-visible", "true");
      field.focus(); // Accessibility: focus on invalid field
    }
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
      ?.closest(".formData");
    if (locationField) {
      locationField.setAttribute(
        "data-error",
        "Vous devez choisir une option."
      );
      locationField.setAttribute("data-error-visible", "true");
    }
    return false;
  }
  return true;
}

/**
 * Check if the terms and conditions are accepted.
 * @returns {boolean} True if the terms are accepted, otherwise false.
 */
function checkTerms() {
  const terms = document.getElementById("checkbox1")?.checked;
  if (!terms) {
    const termsField = document
      .getElementById("checkbox1")
      ?.closest(".formData");
    if (termsField) {
      termsField.setAttribute(
        "data-error",
        "Vous devez vérifier que vous acceptez les termes et conditions."
      );
      termsField.setAttribute("data-error-visible", "true");
    }
    return false;
  }
  return true;
}

// Handle form submit
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validate()) {
      logFormData();
      showConfirmationMessage();
    }
  });
}

/**
 * Display a confirmation message after successful form submission.
 */
function showConfirmationMessage() {
  modalBody.innerHTML = `
    <div class="confirmation-message">
      <p class="text-reward">Merci ! Votre réservation a été reçue.</p>
      <button class="btn-submit btn-close-modal">Fermer</button>
    </div>
  `;
  document
    .querySelector(".btn-close-modal")
    .addEventListener("click", closeModal);
}

/**
 * Log form data to console (for debugging).
 */
function logFormData() {
  const fd = new FormData(form);

  // Log all form fields
  fd.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  // Log checkbox states
  const isTermsChecked = document.getElementById("checkbox1")?.checked;
  const isEventsNotif = document.getElementById("checkbox2")?.checked;
  console.log(`Conditions acceptées: ${isTermsChecked}`);
  console.log(`Notifications activées: ${isEventsNotif}`);
}
