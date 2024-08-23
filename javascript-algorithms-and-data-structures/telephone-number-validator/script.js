const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");

const validatePhonenumber = value => {
  const regex = /^((1\s)|1)?(?:\(\d{3}\)|\d{3})[\s\-]?(?:\d{3})[\s\-]?(?:\d{4})$/;
  const matchs = value.match(regex)
  if (!matchs) return false
  console.log(matchs)
  if (!matchs[1] && value[0] === 2) {
    return false
  }
  return regex.test(value);
}

checkBtn.addEventListener('click', () => {
  const {value} = userInput;
  if (!value) {
    return alert("Please provide a phone number")
  } 
  if (validatePhonenumber(value)) {
    result.innerText = `Valid US number: ${value}`
  } else {
    result.innerText = `Invalid US number: ${value}`
  }
})

clearBtn.addEventListener('click', () => {
  userInput.value = ""
  result.innerText = ""
})