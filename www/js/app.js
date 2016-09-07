// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('netyatra', ['ionic', 'netyatra.controllers','netyatraFilter','netyatra.Service','ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('menu.home',{
   url:'/home',
   views:{
     'menuContent':{
       templateUrl: 'templates/home.html',
       controller: 'homeCtrl as home'
     }
   }
  })
  .state('menu.category',{
   url:'/category',
   views:{
     'menuContent':{
       templateUrl: 'templates/categories.html',
       controller: 'categoryCtrl as category'
     }
   }
  })
  .state('menu.categoryDetail',{
   url:'/detail/:category',
   views:{
     'menuContent':{
       templateUrl: 'templates/categoryDetail.html',
       controller: 'categoryDetailCtrl as categoryDetail'
     }
   }
  })
  .state('menu.postDetail',{
   url:'/postDetail/:postID',
   views:{
     'menuContent':{
       templateUrl: 'templates/postDetail.html',
       controller: 'postDetailCtrl as postDetail'
     }
   }
  })
  .state('menu.bookmark',{
    url: '/bookmark',
    views: {
      'menuContent':{
        templateUrl: 'templates/bookmark.html',
        controller: 'bookmarkCtrl as bookmark'
      }
    }
  })
  .state('menu.like',{
    url: '/like',
    views: {
      'menuContent':{
        templateUrl: 'templates/like.html',
        controller: 'likeCtrl as like'
      }
    }
  })
  .state('menu.share',{
    url: '/share',
    views: {
      'menuContent':{
        templateUrl: 'templates/share.html',
        controller: 'shareCtrl as share'
      }
    }
  })
  .state('menu.rate',{
    url: '/rate',
    views: {
      'menuContent': {
        templateUrl: 'templates/rate.html',
        controller: 'rateCtrl as rate'
      }
    }
  })
  .state('menu.about',{
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl as about'
      }
    }
  })
  .state('menu.othersApp',{
    url: '/others',
    views:{
      'menuContent':{
        templateUrl: 'templates/others.html',
        controller: 'othersCtrl as others'
      }
    }
  })
  // .state('menu.search', {
  //   url: '/search',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/search.html'
  //     }
  //   }
  // })

  // .state('menu.browse', {
  //     url: '/browse',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/browse.html'
  //       }
  //     }
  //   })
  //   .state('menu.playlists', {
  //     url: '/playlists',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/playlists.html',
  //         controller: 'PlaylistsCtrl'
  //       }
  //     }
  //   })

  // .state('menu.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/home');
});
