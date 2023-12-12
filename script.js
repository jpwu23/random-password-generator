// Declaring variables globally so user choices are accessible by every function

var specialChar;
var numericChar;
var lowerChar;
var upperChar;
var length;

// Declare a function to ask for a valid password length until one is selected
var getPasswordLength = function () {
  var passwordLength;
  do {
    passwordLength = parseInt(window.prompt("Enter a password length (between 8 and 128 characters):"));
    if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
      window.alert("Please select at least one criterion or provide a valid length.");
    }
  } while (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128);
  return passwordLength;
};

// Function to ask the user's criterion for password generation
var newPassword = function () {
  do {
    // Prompt user using OK/Cancel prompt(s)
    length = getPasswordLength();
    specialChar = window.confirm("Would you like your password to include special characters?");
    numericChar = window.confirm("Would you like your password to include numeric characters?");
    lowerChar = window.confirm("Would you like your password to include lowercase characters?");
    upperChar = window.confirm("Would you like your password to include upper characters?");

    // Until at least 1 window.confirm criterion is selected, alert and keep prompting
    if (!(specialChar || numericChar || lowerChar || upperChar)) {
      window.alert("Please select at least one criterion or provide a valid length.");
    }
  } while (!(specialChar || numericChar || lowerChar || upperChar));

  // Call the generatePassword function so the password is generated with user choices taking into account
  var password = generatePassword(specialChar, numericChar, lowerChar, upperChar, length);
  // Updates the HTML element value that has the id: password with the generated password 
  document.getElementById("password").value = password;
};

// Actual function for generating a randomized password based on the above criteria as per the OWASP Foundation for special characters
  
var generatePassword = function (specialChar, numericChar, lowerChar, upperChar, length) {   
  // Character sets 
  specialChars = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
  numericChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  lowerChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  upperChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // Declare a local variable "passwordArray" as an array within the generatePassword function 
  let passwordArray = [];

  // Concatenating characters to passwordArray from the character sets above based on user criterion
  if (specialChar) {
    passwordArray = passwordArray.concat(specialChars);
  }

  if (numericChar) {
    passwordArray = passwordArray.concat(numericChars);
  }

  if (lowerChar) {
    passwordArray = passwordArray.concat(lowerChars);
  }

  if (upperChar) {
    passwordArray = passwordArray.concat(upperChars);
  }
  // Generating the actual password and storing it as a string in the variable passwordResult by selecting random characters from passwordArray
  let passwordResult = '';
  // Using the math library to access random index in concatenated array and looping for as many times as user specified as their length of password in above prompt
  for (var i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * passwordArray.length);
    passwordResult += passwordArray[randomIndex];
  }


  return passwordResult;

};
  
  // Selects an element based on CSS selector - in this case the button with the id: generate
var generateBtn = document.querySelector("#generate");
  // Starts the program by running the newPassword function when the button is clicked, allowing user to go through the prompts again. 
  function writePassword() {
    newPassword();
  }

generateBtn.addEventListener("click", writePassword);