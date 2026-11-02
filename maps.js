/*=========================================================
ANN'S BAKERY - MAPS.jS 
Interactive maps using Leaflet + OpenStreetMap (free, no API key)
==========================================================*/

doccument.addEventListener("DOMContentLoaded", function (){

    //Coordinates (approximate for Springs, Gauteng)
    const mainLocation = [-26.2400, 28.4200]; // Ann's house
    const communityLocation = [-26.2450, 28.4250]; // Community Centre

    //--------- MAP : Main Pickup Location ----------
    const mapMainE1 = document.getElementById('mapMain');
    if (mapMainE1) {
        const mapMain = L.map('mapMain').setView(mainLocation,15);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(mapMain);

        L.marker(mainLocation)
        .addTo(mapMain)
        .bindPopup('<strong>Ann\'s Bakery - Main Pickup </strong><br> 6575 Majola Street, New Payneville, Springs')
        .openPopup();
    }

    //--------------------- MAP : Community Centre ----------------------

    const mapCommunityE1 = document.getElementById('mapCommunity');
    if (mapCommunityE1) {
        const mapCommunity = L.map('mapCommunity').setView(communityLocation, 15);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: '&copy; <a href="https://www.openstreet.org/copyright">OpenStretMap</a> contribution',
            maxZoom: 19
        }).addTo(mapCommunity);
        
        L.marker(communityLocation)
        .addTo(mapCommunity)
        .bindPopup('<strong>New Paynville Community Centre</strong><br>1245 Community Road, Spring<br><em> Backup pickup point - confirm with Ann first.</em>')
        .openPopup()
    }
});