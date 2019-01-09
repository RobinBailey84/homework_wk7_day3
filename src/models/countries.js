const PubSub = require('../helpers/pub_sub.js');

const Countries = function(){
  this.countries = [];
}

Countries.prototype.bindEvents = function(){
  PubSub.subscribe('SelectView:country-selected', (event) => {
    const selectedIndex = event.detail;
    const country = this.findCountry(selectedIndex)

    PubSub.publish('Countries:country-selected', country)
  })
}

Countries.prototype.getData = function(){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    if (xhr.status !== 200){
      return;
    }
    const jsonString = xhr.responseText;
    const data = JSON.parse(jsonString);
    this.countries = data;
    PubSub.publish('Countries:all-countries', this.countries)
  });

  xhr.open('GET', 'https://restcountries.eu/rest/v2/all')
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.send();
}

Countries.prototype.findCountry = function(index) {
  return this.countries[index];
}

module.exports = Countries;
