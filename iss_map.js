var mymap = L.map('mapid').setView([0, 0], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const myIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
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

setInterval(getISS, 1100);