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
const modalBody = document.querySelector(".modal-body");

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

  // Check fields
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

// check individual field
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

// check location field
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

// check terms and conditions
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

// handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validate()) {
    // Form is valid, show confirmation message
    showConfirmationMessage();
  }
});

// show confirmation message
function showConfirmationMessage() {
  modalBody.innerHTML = `
    <div class="confirmation-message">
      <p>Merci ! Votre réservation a été reçue.</p>
      <button class="btn-close-modal">Fermer</button>
    </div>
  `;
  document
    .querySelector(".btn-close-modal")
    .addEventListener("click", closeModal);
}
