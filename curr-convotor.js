let CURL =  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".exchange");


for (let select of dropdowns){
    for (currcode in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerHTML = currcode;
        newOptions.value = currcode;
        if(select.name === "from" && currcode === "USD" ){
            newOptions.selected = "selected"
        }
        else if(select.name === "to" && currcode === "INR" ){
            newOptions.selected = "selected"
        }
        select.append(newOptions);
    }
    select.addEventListener("change",(evt) => {
        flag(evt.target);
    })
}
const flag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`
    let img = element.parentElement.querySelector("img");
    img.src= newsrc;
}
const updateExchange = async() => {
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    if (amt.value === "" || amt.value < 1){
        amt = 1;
        amount.value = "1";    
    }
    const URL = `${CURL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    let finalamt = amt * rate;
    msg.innerText = `${amt} ${fromcurr.value} = ${finalamt} ${tocurr.value}`

}
btn.addEventListener("click" , (evt) => {
    evt.preventDefault();
    updateExchange();

});
window.addEventListener("load", () => {
    updateExchange();
    
  });