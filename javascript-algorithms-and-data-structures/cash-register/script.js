let price = 19.5;
let cid = [
["PENNY", 0.50],
["NICKEL", 0.50],
["DIME", 1.00],
["QUARTER", 1.50],
["ONE", 90.00],
["FIVE", 55.00],
["TEN", 20.00],
["TWENTY", 60.00],
["ONE HUNDRED", 100.00]
]
const currencyUnits = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];

const priceEl = document.getElementById("price")
const inputEl = document.getElementById("cash")
const purchaseBtn = document.getElementById("purchase-btn")
const changeDueEl = document.getElementById("change-due")

priceEl.innerText = `Price: ${price}`

const getCashInDrawer = cid => cid.reduce((acc, item) => acc + item[1], 0)
const cashRegister = cash => {
  let changeDue = Number((cash - price).toFixed(2))
  const cashInDrawer = Number(getCashInDrawer(cid).toFixed(2))
  console.log(changeDue, cashInDrawer)
  if (cashInDrawer < changeDue) {
    return "Status: INSUFFICIENT_FUNDS"
  }
  let flag = false
  if (cashInDrawer === changeDue) {
    flag = true
  }

  const changeArray = []
  for (let i = cid.length - 1; i >= 0; i --) {
    const currencyUnit = currencyUnits[i][1]
    const currencyName = cid[i][0]
    let currencyTotal = cid[i][1]
    let cointToGive = 0
    while (changeDue >= currencyUnit && currencyTotal > 0) {
      changeDue = Number((changeDue - currencyUnit).toFixed(2))
      currencyTotal -= currencyUnit
      cointToGive ++
    }
    if (cointToGive > 0) {
      changeArray.unshift([currencyName, cointToGive * currencyUnit])
    }
  }

  if (changeDue > 0) {
    return "Status: INSUFFICIENT_FUNDS"
  } else if (flag) {
    return `Status: CLOSED ${changeArray.reverse().map(el => `${el[0]}: $${el[1]}`).join(" ")}`
  } else {
    return `Status: OPEN ${changeArray.map(el => `${el[0]}: $${el[1]}`).join(" ")}`
  }
}

purchaseBtn.addEventListener('click', () => {
  const cash = Number(inputEl.value)
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item")
    return 
  } 
  if (cash === price) {
    changeDueEl.innerText = "No change due - customer paid with exact cash"
    return
  }
  changeDueEl.innerText = cashRegister(cash)
})