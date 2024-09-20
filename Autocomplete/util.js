import {Fruits,searchQuery} from './data.js';
console.log(Fruits,"FRY0");
let abortControllerInstance;
export let convertedResponse;
export const getSuggestion =  (keyword) => {
    
   let result = Fruits.filter((value) => {
       return value.substring(0,keyword.length).toLowerCase() == keyword.toLowerCase();
   });
   
   getApi();
   return  new Promise((resolve,reject) => {
      setTimeout(()=> {
       
        resolve(result);
      },500)
   })
}
//37.2
export const debounce = (fn,delay=100) => {
    let timeOut;

    return (...args) => {
        let self = this;
      if(timeOut){
      clearTimeout(timeOut);
      }

       timeOut= setTimeout(() => {
          fn.apply(self,args);
          timeOut=null;
        },delay)

    }
}


async function getApi() {
    if(abortControllerInstance){
        abortControllerInstance.abort();
    }

    abortControllerInstance = new AbortController();
    let rawResponse = await fetch("test.json",{signal:abortControllerInstance.signal});
    convertedResponse = await rawResponse.json();
    console.log(convertedResponse,"convertedResponse util");
}


//getSuggestion("M")