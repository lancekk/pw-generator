// Assignment Code
var generateBtn = document.querySelector("#generate");

const minLength = 8;
const maxLength = 128;

const charsets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  special: ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
};

function generatePassword() {
  // prompt length
  const promptText = `Enter password length (number between ${minLength} and ${maxLength}): `;
  let len = prompt(promptText);
  while (isNaN(len) || len < minLength || len > maxLength) {
    alert(`Please enter a number between ${minLength} and ${maxLength}`);
    len = prompt(promptText);
  }

  //prompt flags
  let flags = {
    useLower: false,
    useUpper: false,
    useNumbers: false,
    useSpecial: false
  };

  // validate
  while (!(flags.useLower || flags.useUpper || flags.useNumbers || flags.useSpecial)) {
    alert("Please select at least one set of characters");
    flags.useLower = confirm("Use lowercase letters?");
    flags.useUpper = confirm("Use uppercase letters?");
    flags.useNumbers = confirm("Use numbers?");
    flags.useSpecial = confirim("Use special characters?");
  }

  // generate
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
