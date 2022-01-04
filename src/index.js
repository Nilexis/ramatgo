let map;
const ACTIVITY_RADIUS = 20;
let currLoc;
let currLocMarker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.0707809, lng: 34.8236409 },
    zoom: 18,
  });
  getLocation();
  setTimeout(() => {
    updatePosition({ lat: +tourLocations[2].lat, lng: +tourLocations[2].lng });
  }, 20000);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    // navigator.geolocation.watchPosition(updateGeoPosition);
  }
}

function updateGeoPosition(geoPos) {
  updatePosition({ lat: +geoPos.coords.latitude, lng: +geoPos.coords.longitude });
}

function updatePosition(position) {
  console.log(currLoc);
  if (!currLoc || currLoc.lat !== position.lat || currLoc.lng !== position.lng) {
    currLoc = {
      lat: position.lat,
      lng: position.lng
    };

    if (currLocMarker) {
      currLocMarker.setMap(null);
    }

    currLocMarker = new google.maps.Marker({
      position: currLoc, map: map,
      icon: {
        url: './misc/my-location-icon.jpg',
        scaledSize: new google.maps.Size(50, 50)
      }
    });

    currLocMarker.setMap(map);

    checkProximity();
  }
}

function checkProximity() {
  tourLocations.forEach(location => {
    if (haversineDistance(currLoc, location) <= ACTIVITY_RADIUS) {
      displayPopup(location);
    }
  });
}

function haversineDistance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  return 1000 * d;
}

function showPosition(position) {
  // currLoc = { lat: +position.coords.latitude, lng: +position.coords.longitude };
  updateGeoPosition(position);
  map.setCenter(currLoc);

  tourLocations.forEach(location => {
    const mk = new google.maps.Marker({ position: location, map: map });
    const cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.2,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.1,
      map,
      center: location,
      radius: ACTIVITY_RADIUS,
    });
  });
}

function displayPopup(location) {
  $("#locationModalDescription").html(location.description);
  $("#locationModalLabel").html(location.name);
  $("#locationModalActivity").attr("href", location.activity);
  $("#locationModal").modal();
}

