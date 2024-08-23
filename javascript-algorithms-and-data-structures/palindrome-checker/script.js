const checkButton = document.getElementById("check-btn");
const textInput = document.getElementById("text-input")
const resultElement = document.getElementById("result")

const checkValue = () => {
  const { value: textValue } = textInput
  if (!textValue) {
    alert("Please input a value")
  }
  if (checkPalindrome(textValue)) {
    result.innerText = `${textValue} is a palindrome`
  } else {
    result.innerText = `${textValue} is not a palindrome`
  }
}

const checkPalindrome = textValue => {
  if (textValue.length === 1) {
    return true
  }
  const regex = /[_.,\-:/()\s]/g
  const arr = textValue
    .replace(regex, "")
    .toLowerCase()
    .split("")
  console.log(textValue
    .replace(regex))
  const originalArr = [...arr]
  const reverseArr = arr.reverse()
  return compareArray(originalArr, reverseArr)
}

const compareArray = (arr1, arr2) => {
  console.log(arr1, arr2)
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}
checkButton.addEventListener('click', checkValue)
