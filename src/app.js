/**
 *
 *  @author Marcus Jackson, <marcusj98@gmail.com>
*/
module.exports = function(ngModule) {
  ngModule.controller('mainCtrl', function($scope) {});
  ngModule.directive('appController', ['$compile', '$http', function($compile, $http) {
    function link(scope, element, attributes) {
      $http({
        method: "GET",
        cache: false,
        url: 'json/itinerary.json'
      }).then(function success(res) {
        scope.lead = {
          order: res.data.name,
          account_name: res.data.account_name,
          email: res.data.email,
          firstname: res.data.first_name,
          lastname: res.data.last_name,
          office_phone: res.data.primary_contacts_office_phone,
          cell_phone: res.data.primary_contacts_cell_phone,
          organization: res.data.organization,
          passengers: res.data.passengers,
        };
      }, function error(err) {
        console.log(err);
      });
    };

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: true,
      link: link,
      templateUrl: 'template/account.html'
    };
  }])
};
