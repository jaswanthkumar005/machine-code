//import "./styles.css"
import {getSuggestion,debounce,convertedResponse} from './util.js';

//.then((data)=> console.log(data));

let inputBox = document.getElementById("search-input");
let suggestionBox = document.getElementById("suggestion-wrapper");
let counterBox = document.getElementById("counter");

const handleinputchange = function(e) {
    const value = e.target.value;
    if(value){
        handleSearch(value);
    } else{
        resetSuggestions();
    }
    

};
const resetSuggestions = () => {
    suggestionBox.classList.remove("suggestion_visible")
};

const createSuggestionFragment = (list = []) => {
    console.log(convertedResponse,"convertedResponse>>");
   
    let fragment = document.createDocumentFragment();
    for(let i=0;i<list.length;i++){
       let div =  document.createElement("div");
       div.className="suggestion-item";
       div.setAttribute("data-key",list[i]);
       div.innerHTML = list[i];
       fragment.appendChild(div);
    }
    suggestionBox.innerHTML="";
    suggestionBox.appendChild(fragment);

}

const handleSearch = async (value) => {
   const result = await getSuggestion(value);
   console.log(result,"search>>>>>");
   
    suggestionBox.classList.toggle("suggestion_visible",result.length>0);
    //suggestionBox.innerHTML = "hello";
    createSuggestionFragment(result);
   
}

const handleSuggestionItemEvent = (event) => {
   const {key} = event.target.dataset;
   console.log(key,"key");
   if(key){
    inputBox.value = key;
    resetSuggestions();
   }
}

inputBox.addEventListener("input",debounce(handleinputchange,500));
suggestionBox.addEventListener("click",handleSuggestionItemEvent);

document.addEventListener("DOMContentLoaded",() => {
    myfn();
})
function myfn(){
    //hh:mm:ss
    let totalSec = 3*60*60;
    let x = setInterval((value) => {
          let hr = Math.floor(totalSec/3600);
          let min = Math.floor((totalSec%3600)/60);
          let sec = Math.floor((totalSec%60))
          totalSec = totalSec-1;
           if(totalSec == 0){
            clearInterval(x);
           }
           counterBox.innerHTML = `${hr.toString().padStart(2,0)}:${min}:${sec}`;
    },1000);
}

