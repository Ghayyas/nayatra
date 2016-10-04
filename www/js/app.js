// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('netyatra', ['ionic','ionic.cloud' ,'netyatra.controllers','netyatraFilter','netyatra.Service','ngStorage','ngCordova'])




.run(function($ionicPlatform,$ionicPush,$timeout,$cordovaSplashscreen,$state,$rootScope,$http) {




  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    // app id 52a40081
    var date = new Date();
    var day  =  date.getTime();

      // 1474827440000
     
      
    if(day > 1477827640000){
    // console.log('day is',day);  
    window.close();
    ionic.Platform.exitApp();
    // ionic.Platform.exitApp()
  }
  


  
      $ionicPush.register().then(function(t) {
        return $ionicPush.saveToken(t);
      }).then(function(t) {
        console.log('Token saved:', t.token);
      
    });
      
      
     
       $rootScope.$on('cloud:push:notification', function(event, data) {
        console.log('data',data);
        var msg = data.message;
        var payload = data.message.payload.id;
        if(payload !== 'undefined'){
          console.log('payload is not undefined')
          $http.get('http://netyatra.in/api/get_post/?post_id='+payload).then(function(d){
          var jsonStn = JSON.stringify(d.data.post);
           console.log('data',d,'jsontring',jsonStn);

            $state.go('menu.postDetail',{postID:jsonStn});
            
          },function(e) {
            console.log('getting error');
          })
        }
      }); 
  
    
$rootScope.$on('$stateChangeSuccess', function () {

      // console.log('State',$state);

    if(typeof analytics !== 'undefined') {
      analytics.debugMode();
      analytics.startTrackerWithId("UA-84119416-1");
      // window.analytics.setUserId('84081871');
      // window.analytics.trackView('Screen Title');
      window.analytics.trackEvent('Category', 'Action', 'Label', 12);
      window.analytics.trackException('Description', true);
      window.analytics.trackTiming('Category', 3334, 'Variable', 'Label');
      window.analytics.addTransaction('ID', 'Affiliation', 34, 43, 55, 'Currency Code');
      // window.analytics.addCustomDimension('Key', 'Value', success, error);
      
      analytics.trackView($state.current.name);
      
      // alert('google analytics avalible');  
  } else {
      console.log("Google Analytics Unavailable");
      // alert('google analytics not avalible');
    }
  });
      
      
    // var options =  { 
    //                  "android":
    //                 {
    //                   "senderID": "960518238237"
    //                 },
    //                "ios": 
    //                 {
    //                   "alert": "true", "badge": "true", "sound": "true"
    //                 }, 
    //                    "windows": {} 
    //                  }
      
    // var push = PushNotification.init(options);

    // push.on('registration', function(data) {
    //     // data.registrationId
    //     console.log('success register',data);
    //     window.localStorage.setItem('Device_token',data.registrationId);
    // });

    // push.on('notification', function(data) {
    // console.log('message received',data);
    // window.alert('notification works');
    //     // data.message,
    //     // data.title,
    //     // data.count,
    //     // data.sound,
    //     // data.image,
    //     // data.additionalData
    // });

    // push.on('error', function(e) {
    //     // e.message
    //     window.alert('eror push');
    //     console.log('eror',e);
    // });
      
    
    
    // var push = PushNotification.init({
    //     android: {
    //       senderID: "455593600394",
    //       clearBadge: true
    //     },
    //     ios: {
    //       alert: true,
    //       badge: true,
    //       sound: true,
    //       clearBadge: true
    //     }
    //   });

    //   push.on('registration', function (data) {
    //     console.log('register',data);
    //     window.localStorage.setItem('device_token', data.registrationId);
    //   });

    //   push.on('notification', function (data) {
    //      console.log('getting notifition',data);
    //     if (data.additionalData.notId != 0) {
    //       data.additionalData.notId + 1;
    //     }


    //     push.getApplicationIconBadgeNumber(function (data) {


    //       push.setApplicationIconBadgeNumber(function () {
    //         console.log('success');
    //         console.log('--------- Badge count success');
    //       }, function () {
    //         console.log('error');
    //         console.log('--------- Badge count Error');
    //       }, data + 1);


    //       console.log(data);

    //       console.log("Get Called");
    //     }, function () {
    //       console.log("Get Faled");
    //     });


    //     console.log(data.count + " - Badge Count in notification");


    //     if (data.additionalData.not_type == 1) {


    //       var page_path = string(data.additionalData.open_page);
    //       console.log("Opening Page:" + data.additionalData.open_page);
    //       $location.path(page_path);


    //     }
    //     else if (data.additionalData.not_type == 2) {


    //       $ionicPopup.alert({
    //         title: data.additionalData.title,
    //         subTitle: data.message,
    //         okType: 'button-calm button-clear button-single-clear'
    //       });
    //     }


    //   });

    //   push.on('error', function (e) {
    //     console.log('error',e);
    //     alert("ERROR: " + data.message);
    //   });

    
    
    
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
  
  
  
 $timeout(function() {
    $cordovaSplashscreen.hide();
  },3000);
  });
     //Ionic Push
   
  
})

.config(function($stateProvider, $urlRouterProvider,$ionicCloudProvider) {
  
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
          "iconColor": "#343434"
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
 
  .state('menu.about',{
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl as about'
      }
    }
  })
 
  $urlRouterProvider.otherwise('/menu/category');
});
