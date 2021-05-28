/*const login = () => {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (username === "user" && password === "pass") {
    // call the navigator to move to the new page
    const navigator = document.querySelector("#navigator");
    navigator.resetToPage("home");
  } else {
    ons.notification.alert("Wrong username/password combination");
  }
};*/

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
    center: { lat: 59.3498092, lng: 18.0684758 },
    zoom: 15,
    mapTypeId: "satellite",
    disableDefaultUI: true,
  });
  //document.getElementById("map").style.display = "none";
  map.setTilt(45);
  initZoomControl(map);
  initPanControl(map);
  getGeoLocation(map);
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
