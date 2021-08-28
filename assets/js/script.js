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
    flags.useSpecial = confirm("Use special characters?");
  }

  // generate
  let charcounts = {
    lowercase: flags.useLower?1:0,
    uppercase: flags.useUpper?1:0,
    numbers: flags.useNumbers?1:0,
    special: flags.useSpecial?1:0,
  };

  function totalcount(charcounts) {
    return charcounts.lowercase + charcounts.uppercase + charcounts.numbers + charcounts.special;
  }

  // determine how many characters of each charset will be in the password
  let ks = Object.keys(charcounts);
  let tks = [];
  for (let i = 0; i < ks.length; i++) {
    if (charcounts[ks[i]] > 0) {
      tks.push(ks[i]);
    }
  }
  while (totalcount(charcounts) < len) {
    charcounts[randomChoice(tks)]++;
  }
  console.log(charcounts);
  console.log(totalcount(charcounts));

  // generate the password
  let pw='';
  while (tks.length > 0) {
    let cset = randomChoice(tks);
    pw += randomChoice(charsets[cset]);

    charcounts[cset]--;
    tks = [];
    for (let i = 0; i < ks.length; i++) {
      if (charcounts[ks[i]] > 0) {
        tks.push(ks[i]);
      }
    }
  }

  console.log(pw);
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
