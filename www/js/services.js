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
    console.log('service is ',c);
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