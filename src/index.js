let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 18,
  });
  getLocation();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  console.log(lat ,lng);
  var latlng = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: "You are here!",
  });
  map.setCenter(latlng);
}
