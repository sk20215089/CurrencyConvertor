// const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies/usd.json"
const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies"
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".To select");
const msg=document.querySelector(".msg");
for(let select of dropdowns){
    for(currcode in countrylist){
        let newele=document.createElement("option");
        newele.innerText=currcode;
        newele.value=currcode;
        if(select.name==="from"&&currcode==="USD"){
            newele.selected="selected";
        }
        if(select.name==="to"&&currcode==="INR"){
            newele.selected="selected";
        }
        select.append(newele);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateval=async ()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    const url=`${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    console.log(rate);
    let finalamt=amtval*rate;
    msg.innerText=`${amtval}${fromcurr.value}=${finalamt}${tocurr.value}`;
}
const updateflag=(element)=>{
    let currcode=element.value;
    console.log(currcode);
    let countrycode=countrylist[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let par=element.parentElement.querySelector("img");
    par.src=newsrc;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateval();
})
window.addEventListener("load",()=>{
    updateval();
})
