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

  // Iterate over checkboxes and build the password source
  checkboxes.forEach((checkboxName) => {
    const checkbox = document.querySelector(`input[name="${checkboxName}"]`);
    if (checkbox.checked) {
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
  });

  passEl.textContent = passLength;
  resultEl.textContent = generate();
}

// Update password length based on user input
function updateValue(value) {
  passLength = value;
  passEl.textContent = passLength;
  updatePassSource(); // Update password source when the password length changes
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

const copyBtn = document.getElementById("copy-btn");

copyBtn.addEventListener("click");
