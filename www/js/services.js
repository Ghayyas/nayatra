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
      //  console.log("The loading indicator is now displayed");
    });
  }; 
  
  // return show(); 
});

//hide loading
netyatraService.service('stopLoading',function($ionicLoading){
     this.hide = function(){
    $ionicLoading.hide().then(function(){
      //  console.log("The loading indicator is now hidden");
    });
  };
  // return hide();
});


/**
 * 
 * Http Request to get Data From Server
 * 
 */
  netyatraService.service('httpRequest',function($http,$q){
 
   var deffered = $q.defer();
   
   this.httpFunc = function() { 
     $http.get('http://netyatra.in/api/get_recent_posts/').then(function(resolved){
    // console.log('d',resolved);
    //  var postData = d.data.posts;
     deffered.resolve(resolved);
    //  $scope.hide();
    // var noHTML =  data.replace(/(<([^>]+)>)/ig,"");
    // var image = data.attachments[0].url;
    // var name  = data.author.name;
    // var content = data.content;
    // var contentParse = content.replace(/(<([^>]+)>)/ig,"");
    // var date  = data.modified;
    // console.log('date', date);
    // console.log('getting post',d.data.posts);
  },function(rejected){
    // $scope.hide();
    // $scope.showAlert();
    deffered.reject(rejected);
    // console.log('e',rejected);
  })
  
   return deffered.promise;
 }
   
});


/**
 * 
 * Alert Service
 * 
 */

netyatraService.service('alertService',function($ionicPopup) {
   this.showAlert = function(title,template) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: template//'Make sure you have working internet connection'
   });

   alertPopup.then(function(res) {
     return true;
    //  console.log('Thank you for not eating my deli.cious ice cream cone');
   });
 };
//  return showAlert(title,template);
});
 
