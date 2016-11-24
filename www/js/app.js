
//Netyatra Application
//By Ghayyas Mubashir
//Date: 24/9/16

angular.module('netyatra', ['ionic', 'ionic.cloud', 'netyatra.controllers', 'netyatraFilter', 'netyatra.Service', 'ngStorage', 'ngCordova'])


  .run(function ($ionicPlatform, $ionicPush, $timeout, $cordovaSplashscreen, $state, $rootScope, $http,$localStorage,httpRequest) {


    $ionicPlatform.ready(function () {
      
      
      
      //Fetch first Time data
      
      $http.get('http://netyatra.in/api/core/get_category_posts/?id=' + 4).then(function (d) {
      
      $localStorage.categoryDetailTitle = d.data.category.title;
      $localStorage.categoryDetailArray = d.data.posts;

    }, function (err) {
    });
      
    httpRequest.httpFunc().then(function (d) {
       
        $localStorage.allPost = d.data.posts;


      }, function (e) {


 })  
      
      
      
      
      
      
      
      $ionicPush.register().then(function (t) {
        return $ionicPush.saveToken(t);
      }).then(function (t) {
      });


      $rootScope.$on('cloud:push:notification', function (event, data) {
        // console.log('data', data);
        var msg = data.message;
        var payload = data.message.payload.id;
        if (payload !== 'undefined') {
          console.log('payload is not undefined')
          $http.get('http://netyatra.in/api/get_post/?post_id=' + payload).then(function (d) {
            var jsonStn = JSON.stringify(d.data.post);
            console.log('data', d, 'jsontring', jsonStn);

            $state.go('menu.postDetail', {postID: jsonStn});

          }, function (e) {
            // console.log('getting error');
          })
        }
      });


      $rootScope.$on('$stateChangeSuccess', function () {


        if (typeof analytics !== 'undefined') {
          analytics.debugMode();
          // analytics.startTrackerWithId("UA-84119416-1");
          analytics.startTrackerWithId("UA-85508947-1");
          window.analytics.trackEvent('Category', 'Action', 'Label', 12);
          window.analytics.trackException('Description', true);
          window.analytics.trackTiming('Category', 3334, 'Variable', 'Label');
          window.analytics.addTransaction('ID', 'Affiliation', 34, 43, 55, 'Currency Code');

          analytics.trackView($state.current.name);
        }
        else {
          // console.log("Google Analytics Unavailable");
        }
      });
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        if (ionic.Platform.isAndroid()) {
          StatusBar.backgroundColorByHexString('#1976D2');
        } else {
          StatusBar.styleLightContent();
        }
      }


      $timeout(function () {
        $cordovaSplashscreen.hide();
      }, 3000);
    });
    //Ionic Push


  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicCloudProvider) {
    $ionicCloudProvider.init({
      "core": {
        "app_id": "52a40081"
      },
      "push": {
        "sender_id": "1011672494804",
        "pluginConfig": {
          "ios": {
            "badge": true,
            "sound": true
          },
          "android": {
            "iconColor": "#f52727"
          }
        }
      }
    });
    $stateProvider
      .state('menu', {
        url: '/menu',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('menu.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl as home'
          }
        }
      })
      .state('menu.category', {
        url: '/category',
        views: {
          'menuContent': {
            templateUrl: 'templates/categories.html',
            controller: 'categoryCtrl as category'
          }
        }
      })
      .state('menu.categoryDetail', {
        url: '/detail/:category',
        views: {
          'menuContent': {
            templateUrl: 'templates/categoryDetail.html',
            controller: 'categoryDetailCtrl as categoryDetail'
          }
        }
      })
      .state('menu.postDetail', {
        url: '/postDetail/:postID',
        views: {
          'menuContent': {
            templateUrl: 'templates/postDetail.html',
            controller: 'postDetailCtrl as postDetail'
          }
        }
      })
      .state('menu.bookmark', {
        url: '/bookmark',
        views: {
          'menuContent': {
            templateUrl: 'templates/bookmark.html',
            controller: 'bookmarkCtrl as bookmark'
          }
        }
      })

      .state('menu.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html',
            controller: 'aboutCtrl as about'
          }
        }
      });

    $urlRouterProvider.otherwise('/menu/category');
  });
