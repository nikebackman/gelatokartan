let map;

function initZoomControl(map) {
  document.querySelector(".zoom-control-in").onclick = function () {
    map.setZoom(map.getZoom() + 1);
  };
  document.querySelector(".zoom-control-out").onclick = function () {
    map.setZoom(map.getZoom() - 1);
  };
}

function initPanControl(map) {
  document.querySelector(".pan-control-north").onclick = function () {
    map.panBy(0, -100);
  };
  document.querySelector(".pan-control-east").onclick = function () {
    map.panBy(100, 0);
  };
  document.querySelector(".pan-control-south").onclick = function () {
    map.panBy(0, 100);
  };
  document.querySelector(".pan-control-west").onclick = function () {
    map.panBy(-100, 0);
  };
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 59.334591, lng: 18.06324 },
    zoom: 12,
    mapTypeId: "satellite",
    disableDefaultUI: true,
  });
  //document.getElementById("map").style.display = "none";
  map.setTilt(45);
  initZoomControl(map);
  initPanControl(map);
  getGeoLocation(map);
  setLocation(map);
}

function setLocation(map) {
  document.querySelector(".mjuk").onclick = function () {
    var pos = { lat: 59.348772227699676, lng: 18.048251515633595 };
    console.log("clicking this button");
    map.setCenter(pos);
    map.setZoom(15);
  };
  document.querySelector(".sno").onclick = function () {
    var pos = { lat: 59.34078476966632, lng: 18.04184730367087 };
    console.log("clicking this button");
    map.setCenter(pos);
    map.setZoom(15);
  };
  document.querySelector(".scarfo").onclick = function () {
    var pos = { lat: 59.324061664982736, lng: 17.95653392404551 };
    console.log("clicking this button");
    map.setCenter(pos);
    map.setZoom(15);
  };
}

function getGeoLocation(map) {
  document.querySelector(".buttonHere").onclick = function () {
    hereWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          hereWindow.setPosition(pos);
          hereWindow.setContent("Min plats");
          hereWindow.open(map);
          map.setCenter(pos);
        },
        function () {
          handleLocationError(true, hereWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, hereWindow, map.getCenter());
    }
  };
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
