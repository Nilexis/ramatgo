let map;

const ACTIVITY_RADIUS = 20;
const tourLocations = [
  {
    id: 1,
    name: "גולן אדום",
    description: "תיאור כללי של המשחק או הפעילות שצריך לבצע לפני הצפיה במקום",
    activity: "https://www.google.com",
    thumbnail: "",
    lat: 32.0707809,
    lng: 34.8236409
  }
];

let currLoc;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.0707809, lng: 34.8236409 },
    zoom: 18,
  });
  getLocation();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
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
  //currLoc = { lat: +position.coords.latitude, lng: +position.coords.longitude };
  currLoc = {
    lat: 32.0707809,
    lng: 34.8286409
  };
  console.log(currLoc);

  map.setCenter(currLoc);

  const currLocMarker = new google.maps.Marker({
    position: currLoc, map: map,
    icon: {
      url: './misc/my-location-icon.jpg',
      scaledSize: new google.maps.Size(50, 50)
    }
  });

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

  console.log(haversineDistance(currLoc, tourPos));
}

function displayPopup(position) {
  $("#locationModalDescription").html(position.description);
  $("#locationModalLabel").html(position.name);
  $("#locationModalActivity").attr("href", position.activity);
  $("#locationModal").modal();
}

function toggleIframeMap() {
  $("#map").css("display") == 'none' ? $("#map").css("display", "block") : $("#map").css("display", "none");
  $("#activityIframe").css("display") == 'none' ? $("#activityIframe").css("display", "block") : $("#activityIframe").css("display", "none");
}