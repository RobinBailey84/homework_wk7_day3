const PubSub = require('../helpers/pub_sub.js');

const CountryView = function(){

}

CountryView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:country-selected', (event) => {
    const country = event.detail;
    // console.log(event.detail);
    this.render(country)
  });
}

CountryView.prototype.render = function(country){
  const container = document.querySelector('#country');
  container.innerHTML = '';

  const name = document.createElement('p');
  name.textContent = `Country: ${country.name}`;

  const region = document.createElement('p');
  region.textContent = `Region: ${country.region}`;

  const img = document.createElement('img');
  img.classList.add('small-image');
  img.src = country.flag;

  const listTitle = document.createElement('h2');
  listTitle.textContent = 'Languages:';

  const list = document.createElement('p');
  country.languages.forEach((language) => {
    const listItem = document.createElement('li')
    listItem.textContent = language.name;
    console.log(language);
    list.appendChild(listItem);
  })

  container.appendChild(name);
  container.appendChild(region);
  container.appendChild(img);
  container.appendChild(listTitle);
  container.appendChild(list);
}

CountryView


module.exports = CountryView;
