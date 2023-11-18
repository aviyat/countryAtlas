import CountryClass from "./countryClass.js"

export const declareEvents = (_ar, homeCountries) => {
    const id_home = document.querySelector("#id_home")
    const id_Israel = document.querySelector("#id_Israel")
    const id_USA = document.querySelector("#id_USA")
    const id_UK = document.querySelector("#id_UK")
    const id_France = document.querySelector("#id_France")
    const id_Thailand = document.querySelector("#id_Thailand")
    const id_input = document.querySelector("#id_input")
    const id_search = document.querySelector("#id_search")
    const id_row = document.querySelector("#id_row")


    id_home.addEventListener("click", () => {
        homeCountries(_ar);

    })
    id_Israel.addEventListener("click", () => {
        createCountryByCode("isr")
    })
    id_USA.addEventListener("click", () => {
        createCountryByCode("usa")
    })
    id_UK.addEventListener("click", () => {
        createCountryByCode("gbr")
    })
    id_France.addEventListener("click", () => {
        createCountryByCode("fra")
    })
    id_Thailand.addEventListener("click", () => {
        createCountryByCode("tha")
    })

    id_search.addEventListener("click", () => {
        createCountryByName(id_input.value)
    })

    const createCountryByName =async (_val) => {
console.log(_val);
        id_row.innerHTML = "";
        let url = `https://restcountries.com/v3.1/name/${_val}`
        let resp=await fetch(url)
        let data=await resp.json()
        // fetch(url)
        //     .then(resp => resp.json())
        //     .then(data => {
                let _arr = data;
                if (_arr.length > 0) {
                    _arr.forEach((item) => {
                        let country = new CountryClass("#id_row", item, fullName, createCountryByCode)
                        country.render()
                    });
                } else {
                    document.querySelector("#id_row").innerHTML = `<h2>Country ${_val} is  not found, try again </h2>`;
                }

            // })
    }





}
export const createCountryByCode = async(_code) => {
    id_row.innerHTML = "";
    let url = `https://restcountries.com/v3.1/alpha/${_code}`
    let resp=await fetch(url)
    let data=await resp.json()
    // fetch(url)
    //     .then(resp => resp.json())
    //     .then(data => {
            // let fullName=data[0].name.common;
            let _arr = data;

            if (_arr.length > 0) {
                _arr.forEach((item) => {
                    let country = new CountryClass("#id_row", item, fullName, createCountryByCode)
                    country.render()
                });
            } else {
                document.querySelector("#id_row").innerHTML = `<h2>Country ${_code} is  not found, try again </h2>`;
            }

        // })

}
export const fullName = async (_code) => {
    let url = `https://restcountries.com/v3.1/alpha/${_code}`
    let resp = await fetch(url)
    let data = await resp.json()
    let fullName = data[0].name.common;
    return fullName;

}



