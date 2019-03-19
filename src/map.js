/**
 *
 *  @author Marcus Jackson, <marcusj98@gmail.com>
*/
module.exports = function(ngModule_Map) {
  ngModule_Map.controller('mainCtrl', function($scope) {});
  ngModule_Map.directive('mapController', ['$compile', '$http', function($compile, $http) {
    function mapLink(scope, element, attributes) {
      var map = null,
        stops = [],
        waypoints = [],
        origin = null,
        destination = null,
        allWaypoints = null,
        options = {},
        latitude = null,
        longitude = null,
        bounds = null,
        infoWindow = new google.maps.InfoWindow(),
        geocoder = new google.maps.Geocoder(), // GMAPS GEOCODER
        service = new google.maps.DistanceMatrixService(), // Distance Matrix
        directionsDisplay = new google.maps.DirectionsRenderer(), // GMAPS DIRECTIONS DISPLAY
        directionsService = new google.maps.DirectionsService(); // GMAPS DIRECTIONS SERVICE

      var request = {
        origin: "",
        destination: "",
        optimizeWaypoints: "",
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };

      var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180)
      );
      var marker = new google.maps.Marker({});
      var markers = [];

      // Get the bounds of the polyline
      google.maps.Polyline.prototype.getBounds = function(startBounds) {
        if (startBounds) {
          bounds = startBounds;
        } else {
          bounds = new google.maps.LatLngBounds();
        }
        this.getPath().forEach(function(item, index) {
          bounds.extend(new google.maps.LatLng(item.lat(), item.lng()));
        });
        return bounds;
      };

      $http({
        method: "GET",
        cache: true,
        url: 'json/itinerary.json'
      }).then(function success(res) {
        scope.stops = angular.fromJson(res.data.stop_c);
        angular.forEach(scope.stops, function(value, key) {
          marker = new google.maps.Marker({
            title: value.location.description,
            position: null,
            address: value.location.address_c,
            city: value.location.address_city_c,
            state: value.location.address_city_c,
            zipcode: value.location.postalcode_c,
            setLabel: null,
            lat: "",
            lng: "",
            map: map,
            animation: google.maps.Animation.DROP
          });
          markers.push(marker);
        });
        if (markers.length > 1) {
          angular.forEach(markers, function(marker_values, marker_key) {
            waypoints.push({
              location: marker_values.title,
              stopover: true
            });
          });



          if (waypoints.length > 2) {
            for (var i = 0; i < waypoints.length; i++) {
              stops.push(waypoints[i]);
            }

            // Get Origin and Destination and Waypoints
            origin = stops.shift(),
            destination = stops.pop(),
            allWaypoints = stops;

            request = {
              origin: origin.location,
              destination: destination.location,
              waypoints: allWaypoints,
              optimizeWaypoints: false,
              unitSystem: google.maps.UnitSystem.IMPERIAL,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            watchWaypoints(request);

          } else if (waypoints.length === 2) {

            angular.forEach(markers, function(marker_values, marker_key) {
              waypoints.push({
                location: marker_values.title,
                stopover: false
              });
            });

            // Get Origin and Destination
            origin = waypoints[0].location,
            destination = waypoints[1].location;

            request = {
              origin: origin,
              destination: destination,
              optimizeWaypoints: false,
              unitSystem: google.maps.UnitSystem.IMPERIAL,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            watchWaypoints(request);
          }

        } else {

          // If more than one location is added
          angular.forEach(markers, function(marker_values, marker_key) {
            waypoints.push({
              location: marker_values.title,
              stopover: false
            });
          });
          request = { // Just one point of origin (eg. A)
            origin: waypoints[0].location,
            destination: false,
            optimizeWaypoints: false
          };
          watchWaypoint(request);
        }
      }, function error(err) {
        console.log(err);
      });

      function initialize() {
        // GMAP options
        options = {
          center: new google.maps.LatLng(37.09024, -100.712891),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          panControl: false,
          gestureHandling: 'cooperative',
          zoomControl: false,
          scaleControl: false,
          disableDefaultUI: true,
          scaleControl: false
        };
        map = new google.maps.Map(document.getElementById("map"), options);
      }

      function watchWaypoint(stop) {
        geocoder.geocode({
          'address': stop.origin
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            clearMarkers(stop);
            // In this case it creates a marker, but you can get the lat and lng from the location.LatLng
            map.setCenter(results[0].geometry.location);
            var pos = {
              lng: results[0].geometry.location.lng(),
              lat: results[0].geometry.location.lat()
            };

            marker.setPosition(results[0].geometry.location);
            marker.setVisible(true);
            map.fitBounds(results[0].geometry.viewport);
          } else {
            clearMarkers(stop);
          }
          directionsDisplay.setMap(null);
        });
      }

      function watchWaypoints(stop) {
        clearMarkers(stop);

        directionsService.route(stop, function(resp, stat) {
          switch (stat) {
            case 'NOT_FOUND':
              clearMarkers(stop);
              break;
            case 'UNKNOWN_ERROR':
              clearMarkers(stop);
              break;
            case 'OK':
            directionsDisplay.setMap(null);

            directionsDisplay = new google.maps.DirectionsRenderer({
              preserveViewport: false,
              suppressMarkers: false,
              map: map
            });
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(resp);
            break;
          }
        });
      }

      function clearMarkers(movements) {
        for (var i = 0; i < movements.length; i++) {
          movements[i].setMap(null);
        }
      }

      initialize();
    };

    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      template: '<div></div>',
      link: mapLink,
      controller: function($scope, $element) {}
    };
  }]);
};
