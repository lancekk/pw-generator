// Assignment Code
var generateBtn = document.querySelector("#generate");

const minLength = 8;
const maxLength = 128;

const charsets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  special: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
};

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePassword() {
  // prompt length
  const promptText = `Enter password length (number between ${minLength} and ${maxLength}): `;
  let len = prompt(promptText);
  while (isNaN(len) || len < minLength || len > maxLength) {
    alert(`Please enter a number between ${minLength} and ${maxLength}`);
    len = prompt(promptText);
  }

  // validate
  let charcounts = {};
  while (Object.keys(charcounts).length === 0) {
    if (confirm("Use lowercase letters?")) {
      charcounts.lowercase = 1;
    }
    if (confirm("Use uppercase letters?")) {
      charcounts.uppercase = 1;
    }
    if (confirm("Use numbers?")) {
      charcounts.numbers = 1;
    }
    if (confirm("Use special characters?")) {
      charcounts.special = 1;
    }
    if (Object.keys(charcounts).length === 0) {
      alert("Please select at least one set of characters");
    }
  }

  function totalcount(obj) {
    let total = 0;
    for (k of Object.keys(obj)) {
      total += obj[k];
    }
    return total;
  }

  // determine how many characters of each charset will be in the password
  let ks = Object.keys(charcounts);
  while (totalcount(charcounts) < len) {
    // weight each character set by its size
    let choices = [];
    for (let i = 0; i < ks.length; i++) {
      choices.push(Array(charsets[ks[i]].length).fill(ks[i]));
    }
    charcounts[randomChoice(choices.flat())]++;
  }

  // generate the password
  let pw='';
  while (ks = Object.keys(charcounts), ks.length > 0) {
    let cset = randomChoice(ks);
    pw += randomChoice(charsets[cset]);

    charcounts[cset]--;
    if (charcounts[cset] === 0) {
      delete charcounts[cset];
    }
  }

  return pw;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
