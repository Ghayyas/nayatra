angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,$http,$ionicLoading) {
   $scope.show = function() {
    $ionicLoading.show({
      template: 'Please wait...'
    }).then(function(){
      //  console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
      //  console.log("The loading indicator is now hidden");
    });
  };
  $scope.show();
  $http.get('http://netyatra.in/api/get_recent_posts/').then(function(d){
    console.log('d',d);
     $scope.data = d.data.posts;
     $scope.hide();
    // var noHTML =  data.replace(/(<([^>]+)>)/ig,"");
    // var image = data.attachments[0].url;
    // var name  = data.author.name;
    // var content = data.content;
    // var contentParse = content.replace(/(<([^>]+)>)/ig,"");
    // var date  = data.modified;
    // console.log('date', date);
    // console.log('getting post',d.data.posts);
  },function(e){
    console.log('e',e);
  })
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.filter('contentParse',function(){
  
  return function(input){
    var output = input.replace(/(<([^>]+)>)/ig,"");
    return output;
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
