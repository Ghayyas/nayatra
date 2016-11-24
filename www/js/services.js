/**
 * 
 * Loading service
 * 
 */

  //show loading
var netyatraService = angular.module('netyatra.Service',[]);
netyatraService.service('showLoading',function($ionicLoading) {
  this.show = function() {
    $ionicLoading.show({
      template: 'Please wait...'
    }).then(function(){
    });
  }; 
  
});

//hide loading
netyatraService.service('stopLoading',function($ionicLoading){
     this.hide = function(){
    $ionicLoading.hide().then(function(){
    });
  };
});


/**
 * 
 * Http Request to get Data From Server
 * 
 */
  netyatraService.service('httpRequest',function($http,$q){
 
   var deffered = $q.defer();
  //  var q = 1;
  
   this.httpFunc = function() { 
     $http.get('http://netyatra.in/?json=get_recent_posts&count=').then(function(resolved){
      // console.log('resolved'); 
       deffered.resolve(resolved);
  },function(rejected){
    
    deffered.reject(rejected);
  })
  
   return deffered.promise;
 }
   
});


/**
 * 
 * Http again call Service
 * 
 */

netyatraService.service('httpAgain',function($http,$q){
  var defer = $q.defer();
  this.http = function(c){
    $http.get('http://netyatra.in/?json=get_recent_posts&count='+ c).then(function(r){
      // console.log('sending posts are ',r);
      defer.resolve(r);
    },function(e){
      defer.reject(e);
    });
    
    return defer.promise;
  }
})



/**
 * 
 * Alert Service
 * 
 */

netyatraService.service('alertService',function($ionicPopup) {
   this.showAlert = function(title,template) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: template
   });

   alertPopup.then(function(res) {
     return true;
   });
 };
});


/**
 * 
 * Local storage Service
 * 
 */
 
netyatraService.factory ('StorageService', function ($localStorage,$q) {
 var deffered = $q.defer();
 $localStorage = $localStorage.$default({
    item: []
  });
  

var _getAll = function () {
  
  return $localStorage.item;
 
};

var _add = function (d) {
 
  var success = $localStorage.item.push(d);
  if(success){
    deffered.resolve(true)
    
  }
  else{
    deffered.reject(true);
  }
  return deffered.promise;
}
var _remove = function (d) {
 
  var success = $localStorage.item.splice($localStorage.item.indexOf(d), 1);
  if(success){
    deffered.resolve(true);
  }
  else{
    deffered.reject(true)
  }
  return deffered.promise;
}
return {
    getAll: _getAll,
    add: _add,
    remove: _remove
  };
})

/**
 * 
 * Ad Banner
 * 
 */

netyatraService.service('bannerAd',function(){
     var admobid = {};
  if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
    admobid = {
      banner: 'ca-app-pub-7631554899487555/1555263029', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-7631554899487555/9166354221'
    };
  } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
    admobid = {
      banner: 'ca-app-pub-7631554899487555/1555263029', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-7631554899487555/9166354221'
    };
  } else { // for windows phone
    admobid = {
      banner: 'ca-app-pub-7631554899487555/1555263029', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-7631554899487555/9166354221'
    };
  }
  
  this.banner = function(){
  
    if(AdMob) AdMob.createBanner({
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    autoShow: true });
}

this.hideBanner = function(){
  if(AdMob) AdMob.removeBanner();
}
  
  this.showInter = function(){
      // preppare and load ad resource in background, e.g. at begining of game level
   if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:true} );

  // show the interstitial later, e.g. at end of game level
  if(AdMob) AdMob.showInterstitial();
  }
})


netyatraService.service('fbLikeService',function($q,$window){
      var deffer = $q.defer();
       this.openWindow = function(){ 
        var d = $window.open('fb://page/1519563958349711', '_system');
        if(d){
          deffer.resolve(true);
        }
        else{
          deffer.reject(true);
        }
      
      return deffer.promise;
   }
})