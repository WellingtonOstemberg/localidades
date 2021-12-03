// definindo variáveis
const stateSelect = document.getElementById("stateSelect");
const citySelect = document.getElementById("citySelect");
const optionState = document.getElementById("optionState");
const optionCity = document.getElementById("optionCity");

const statesList = () => {
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((response) => response.json())
    .then((states) => {
      states.map((state) => {
        let option = document.createElement("option");
        option.setAttribute("value", state.id);
        option.innerHTML = state.nome;
        stateSelect.appendChild(option);
      });
    });
};
statesList();

const citiesList = (uf) => {
  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`
  )
    .then((response) => response.json())
    .then((cities) => {
      citySelect.innerHTML = "";
      cities.map((city) => {
        let option = document.createElement("option");
        option.setAttribute("value", city.id);
        option.innerHTML = city.nome;
        citySelect.removeAttribute("disabled");
        citySelect.appendChild(option);
      });
    });
};

stateSelect.addEventListener("change", (e) => {
  if (!optionState.classList.contains("d-none"))
    optionState.classList.add("d-none");
  citiesList(e.target.value);
});
