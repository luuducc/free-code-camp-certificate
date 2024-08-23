const convertBtn = document.getElementById("convert-btn")
const inputNumber = document.getElementById("number")
const outputDiv = document.getElementById("output")

const validInput = inputValue => {
  if (!inputValue) {
    outputDiv.innerText = "Please enter a valid number"
    return false;
  }
  if (parseInt(inputValue) <= 0) {
    outputDiv.innerText = "Please enter a number greater than or equal to 1"
    return false;
  }
  if (parseInt(inputValue) > 3999) {
    outputDiv.innerText = "Please enter a number less than or equal to 3999"
    return false;
  }
  return true;
}
const romanRecursive = input => {
  if (input <= 0) return ""
  if (input >= 1000) return "M" + romanRecursive(input - 1000)
  if (input >= 900) return "CM" + romanRecursive(input - 900)
  if (input >= 500) return "D" + romanRecursive(input - 500)
  if (input >= 400) return "CD" + romanRecursive(input - 400)
  if (input >= 100) return "C" + romanRecursive(input - 100)
  if (input >= 90) return "XC" + romanRecursive(input - 90)
  if (input >= 50) return "L" + romanRecursive(input - 50)
  if (input >= 40) return "XL" + romanRecursive(input - 40)
  if (input >= 10) return "X" + romanRecursive(input - 10)
  if (input >= 9) return "IX" + romanRecursive(input - 9)
  if (input >= 5) return "V" + romanRecursive(input - 5)
  if (input >= 4) return "IV" + romanRecursive(input - 4)
  if (input >= 1) return  "I" + romanRecursive(input - 1)
}
const convertToRoman = input => {
  let output = ""
  while (input > 0) {
    if (input >= 1000) {
      output += "M"
      input -= 1000;
      continue;
    }
    if (input >= 900) {
      output += "CM"
      input -= 900;
      continue;
    }
    if (input >= 500) {
      output += "D"
      input -= 500;
      continue;
    }
    if (input >= 400) {
      output += "CD"
      input -= 400;
      continue;
    }
    if (input >= 100) {
      output += "C"
      input -= 100;
      continue;
    }
    if (input >= 90) {
      output += "XC"
      input -= 90;
      continue;
    }
    if (input >= 50) {
      output += "L"
      input -= 50;
      continue;
    }
    if (input >= 40) {
      output += "XL"
      input -= 40;
      continue;
    }
    if (input >= 10) {
      output += "X"
      input -= 10;
      continue;
    }
    if (input >= 9) {
      output += "IX"
      input -= 9;
      continue;
    }
    if (input >= 5) {
      output += "V"
      input -= 5;
      continue;
    }
    if (input >= 4) {
      output += "IV"
      input -= 4;
      continue;
    }
    if (input >= 1) {
      output += "I"
      input -= 1
      continue;
    }
  }
  return output
}

inputNumber.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    outputDiv.innerText = ""
    if (validInput(inputNumber.value)) {
      outputDiv.innerText = romanRecursive(inputNumber.value)
    }
  }
})
convertBtn.addEventListener('click', () => {
  outputDiv.innerText = ""
  if (validInput(inputNumber.value)) {
    outputDiv.innerText = convertToRoman(inputNumber.value)
  }
})