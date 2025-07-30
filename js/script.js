let body = document.body
let dayNight = document.querySelector(".dayNight")

dayNight.onclick = function () {
  body.classList.toggle("night")
}

let typingEffect = new Typed("#text", {
  strings: ["Waleed", "a Developer", "a Coder", "a Lead"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 2500,
})

function fillUpPortfolio(portfolio) {
  console.log("portfolio", portfolio)
}

async function fetchPortfolio() {
  const response = await fetch("js/projects.json")
  const portfolio = await response.json()
  return portfolio
}

window.addEventListener("DOMContentLoaded", function (e) {
  fetchPortfolio()
    .then((json) => {
      fillUpPortfolio(json)
    })
    .catch(error => {
      console.error('Error fetching portfolio. Please check if "js/projects.json" exists and is accessible. Detailed error:', error);
    })
})
