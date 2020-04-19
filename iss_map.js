var mymap = L.map('mapid').setView([0, 0], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const myIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [100, 64],
    iconAnchor: [50, 32],
});
const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544/'
async function getISS(){
    const reponse = await fetch(api_url);
    const data = await reponse.json();
    const {latitude, longitude} = data
    marker.setLatLng([latitude, longitude]);
    
    const zoom = mymap.getZoom();
    mymap.setView([latitude, longitude], zoom);
    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
}

getISS();

setInterval(getISS, 1000);

// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
(function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#'+burger.dataset.target);
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();