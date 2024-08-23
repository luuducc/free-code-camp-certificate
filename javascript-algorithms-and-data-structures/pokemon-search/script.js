const input = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")

const nameEl = document.getElementById("pokemon-name")
const idEl = document.getElementById("pokemon-id")
const weightEl = document.getElementById("weight")
const heightEl = document.getElementById("height")
const typesEl = document.getElementById("types")
const hpEl = document.getElementById("hp")
const attackEl = document.getElementById("attack")
const defenseEl = document.getElementById("defense")
const specialAttackEl = document.getElementById("special-attack")
const specialDefenseEl = document.getElementById("special-defense")
const speedEl = document.getElementById("speed")
const imageDiv = document.getElementById("image")

const baseUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"

searchBtn.addEventListener('click', async () => {
  try {
    const res = await fetch(baseUrl + input.value.toLowerCase())
    const data = await res.json()
    const {
      name, id, weight, height, types,
      sprites: { front_default },
      stats: [
        {"base_stat": hp}, 
        {"base_stat": attack}, 
        {"base_stat": defense}, 
        {"base_stat": specialAttack}, 
        {"base_stat": specialDefense}, 
        {"base_stat": speed}
      ]
    } = data
    nameEl.innerText = `${name.toUpperCase()}`;
    idEl.innerText = id;
    weightEl.innerText = `Weight: ${weight}`;
    heightEl.innerText = `Height: ${height}`;
    hpEl.innerText = hp;
    attackEl.innerText = attack;
    defenseEl.innerText = defense;
    specialAttackEl.innerText = specialAttack;
    specialDefenseEl.innerText = specialDefense;
    speedEl.innerText = speed;
    typesEl.innerHTML = ""
    types.forEach(item => {
      typesEl.innerHTML += `
        <div>${item.type.name.toUpperCase()}</div>
      `
    })
    imageDiv.innerHTML = `
      <img src="${front_default}" id="sprite">
    `
  } catch (err) {
    alert("Pokémon not found")
    console.log(err)
    return
  }
})