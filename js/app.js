import CountryClass from "./countryClass.js"
import {declareEvents,createCountryByCode, fullName} from "./events.js"

 let countries_ar = [];
 let countries_home_ar= ["israel",
 "united states",
 "france",
 "united kingdom",
 "thailand",
];

const init = () => {
  doApi();
}

const doApi =async () => {
  let url = `https://restcountries.com/v3.1/all  `;
  let resp=await fetch(url)
  let data=await resp.json()
  // fetch(url)
  // .then(resp => resp.json())
  // .then(data => {
    console.log(data);
    countries_ar=data;
    // homeCountries(countries_ar)
    declareEvents( countries_ar,homeCountries);
    homeCountries(countries_ar)


  // })
}

const homeCountries=(_all)=>{
    document.querySelector("#id_row").innerHTML = "";
let new_ar=_all.filter((item)=>
countries_home_ar.includes(item.name.common.toLowerCase()));
console.log(new_ar);
new_ar.map((item)=>{
    let country=new CountryClass("#id_row",item,fullName,createCountryByCode)
    country.render()
})
}



init();

