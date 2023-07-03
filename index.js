// Set initial password length
let passLength = 8;

// Get DOM elements
let passEl = document.getElementById("pass-el");
let resultEl = document.getElementById("result-el");

// Set default password source
let passSource = "";

// Update the password source based on selected checkbox options
function updatePassSource() {
  passSource = "";

  // Array of checkbox names
  const checkboxes = ["uppercase", "lowercase", "numbers", "specialsymbols"];
  let isChecked = false; // Variable to check if any checkbox is checked

  // Iterate over checkboxes and build the password source
  checkboxes.forEach((checkboxName) => {
    const checkbox = document.querySelector(`input[name="${checkboxName}"]`);
    if (checkbox.checked) {
      isChecked = true; // At least one checkbox is checked
      switch (checkboxName) {
        case "uppercase":
          passSource += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "lowercase":
          passSource += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "numbers":
          passSource += "0123456789";
          break;
        case "specialsymbols":
          passSource += "!@#$%^&*()";
          break;
      }
    }
    updatePassStrength(); // Update password strength when the password source changes
  });

  if (!isChecked) {
    // If no checkbox is checked
    alert(
      "All boxes are unchecked. Default is lowercase to generate new password."
    );
    passSource = "abcdefghijklmnopqrstuvwxyz"; // Set password source to lowercase characters
  }

  passEl.textContent = passLength;
  resultEl.textContent = generate();
}

// Update password length based on user input
function updateValue(value) {
  passLength = value;
  passEl.textContent = passLength;
  updatePassSource(); // Update password source when the password length changes
  updatePassStrength(); // Update password strength when the password length changes
}

// Generate a random password based on the selected options
function generate() {
  let password = "";
  for (let i = 0; i < passLength; i++) {
    const randomIndex = Math.floor(Math.random() * passSource.length);
    password += passSource[randomIndex];
  }
  return password;
}

// Generate a new password
function getGenerate() {
  resultEl.textContent = generate();
}

// Set initial password source based on the checkbox default values
updatePassSource();

// Get all checkboxes
const checkboxElements = document.querySelectorAll('input[type="checkbox"]');

// Add event listener to each checkbox
checkboxElements.forEach((checkbox) => {
  checkbox.addEventListener("change", updatePassSource);
});

// Copy password to clipboard
function copyToClipboard() {
  // Create a temporary input element
  const tempInput = document.createElement("input");

  // Set its value to the password text
  tempInput.value = resultEl.textContent;

  // Append it to the body
  document.body.appendChild(tempInput);

  // Select the text
  tempInput.select();

  // Execute the copy command
  document.execCommand("copy");

  // Remove the temporary input element from the body
  document.body.removeChild(tempInput);

  // Notify user about copied password
  alert("Password copied to clipboard");
}

// Add update password strength level
function updatePassStrength() {
  let passStrengthEl = document.getElementById("pass-level");
  let strength = 0;

  // Add strength based on the types of characters and length
  if (passSource.includes("ABCDEFGHIJKLMNOPQRSTUVWXYZ")) strength++;
  if (passSource.includes("abcdefghijklmnopqrstuvwxyz")) strength++;
  if (passSource.includes("0123456789")) strength++;
  if (passSource.includes("!@#$%^&*()")) strength++;
  if (passLength > 15) strength++;

  // Update pass-level element based on strength
  switch (strength) {
    case 1:
    case 2:
      passStrengthEl.textContent = "VERY WEAK";
      passStrengthEl.style.color = "red";
      break;
    case 3:
      passStrengthEl.textContent = "WEAK";
      passStrengthEl.style.color = "orange";
      break;
    case 4:
      passStrengthEl.textContent = "STRONG";
      passStrengthEl.style.color = "green";
      break;
    case 5:
      passStrengthEl.textContent = "VERY STRONG";
      passStrengthEl.style.color = "darkgreen";
      break;
  }
}
