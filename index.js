// Get the select element
const stateEle = document.getElementById("stateSelect");
const substationElement = document.getElementById("subStationSelect");
const totalLightsElement = document.getElementById("total-lights");
const inUseLightsElement = document.getElementById("in-use-lights");
const powerUsageElement = document.getElementById("power-usage");

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // For Choosing State

    var selectedState = "Andhra Pradesh";
    // Populate the options
    data.states.forEach((state) => {
      const optionElement = document.createElement("option");
      optionElement.value = state;
      optionElement.textContent = state;
      stateEle.appendChild(optionElement);
    });
    stateEle.addEventListener("change", function () {
      selectedState = this.value;
      document.querySelector("#selectedState").textContent = selectedState;

      //   for choosing district wise substation
      var selectedSubs = data.data[selectedState];
      // Populate the options

      removeAllChildNodes(substationElement);
      data.data[selectedState].forEach((state) => {
        const optionElement = document.createElement("option");
        optionElement.value = state;
        optionElement.textContent = state;
        substationElement.appendChild(optionElement);
      });
      substationElement.addEventListener("change", function () {
        selectedSubs = this.value;
        document.querySelector("#selecetedSubstation").textContent =
          selectedSubs;
      });
    });

    data.data["Andhra Pradesh"].forEach((state) => {
      const optionElement = document.createElement("option");
      optionElement.value = state;
      optionElement.textContent = state;
      substationElement.appendChild(optionElement);
    });
    substationElement.addEventListener("change", function () {
      selectedSubs = this.value;
      document.querySelector("#selecetedSubstation").textContent = selectedSubs;
      totalLightsElement.innerText =
        "Total Lights Installed : " + getRandomNumber();

      inUseLightsElement.innerText =
        "Total Lights in Use : " +
        getRandomNumber(parseInt(totalLightsElement.innerText.match(/\d+/)[0]));
      powerUsageElement.innerText =
        "Total Power Consumed : " +
       ( parseInt(inUseLightsElement.innerText.match(/\d+/)[0]) * 60)/1000 +" MW";
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

//clear up function
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getRandomNumber(limit) {
  const randomFraction = Math.random();
  var randomNumber;
  if (limit) {
    randomNumber = Math.floor(randomFraction * parseInt(limit));
  } else {
    randomNumber = Math.floor(randomFraction * (10000 - 1000 + 1) + 1000);
  }

  return randomNumber;
}
