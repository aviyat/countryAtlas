export default class CountryClass {
    constructor(_parent, _item,_fullName, _createCountryByCode) {
        this.parent = _parent;
        this.name = _item.name.common;
        this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;;
        this.capitol = _item.capital;
        this.imgFlag = _item.flags.png;
        this.alt = _item.flags.alt;
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
        this.borders = _item.borders;
        // this.countryCode = _item.cca3;
        this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
        this.fullName = _fullName;
        this.createCountryByCode = _createCountryByCode;

    }
    render() {
        const div = document.createElement("div");
        div.className = "d-flex my-3 col-sm-11 col-md-6 col-lg-4 prevCard";
        document.querySelector(this.parent).append(div);
        let parent = document.querySelector(this.parent)
        parent.className = "row justify-content-around"
        div.innerHTML = `
        <div class="card " data-aos="fade-up" id="id_card">
        <img src=${this.imgFlag} class="card-img-top firstimg" alt=${this.alt}>
        <div class="card-body">
          <h2 class="card-text text-center title">${this.name}</h2>
        </div>
      </div>`






        const myCard = div.querySelector("#id_card")
        myCard.addEventListener("click", () => {
            parent.innerHTML = ""
            parent.className = "row m-0"
            document.querySelector(this.parent).append(div);

            div.innerHTML = `
        <div class="d-flex" id="allDetails">
        <div class="box col-sm-12 col-md-6 ">
            <div class="card myText">
                <div class="card-body" data-aos="zoom-in-down">
                    <h5 class="card-title titleCard">${this.name}</h5>
                    <div class="card-text txtCard">
                        <p><strong>pop:</strong>${this.pop}</p>
                        <p><strong>leng:</strong>${this.languages}</p>
                        <p><strong>capitol:</strong>${this.capitol}</p>
                        <p ><strong>state with borders:</strong><br>
                        <p id="id_contriesBorder"></p></p>
                    </div>
                </div>
                <img src=${this.imgFlag} data-aos="zoom-in-right" class="card-img-bottom" alt=${this.alt}>
            </div>
        </div>
        <div class="box col-sm-12 col-md-6 ">
            <div class="card myMap" data-aos="zoom-in-up">
                <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=iw&z=7&amp;output=embed">
                </iframe>

            </div>
        </div>
    </div>
   `


            if (this.borders) {
                this.borders.forEach(async(item) => {        
                   let a= document.createElement("a")
                //    console.log(this.fullName(item));
                   let nameCountry=await this.fullName(item)
                   a.innerText=`${nameCountry}, `
                    document.querySelector("#id_contriesBorder").append(a)
                    a.addEventListener("click", () => {
                        this.createCountryByCode(item);
                    });
                })
            }



        })
    }
}




