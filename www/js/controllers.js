var app = angular.module('netyatra.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  
})



/**
 * 
 * Home Controller
 * 
 */


.controller('homeCtrl', function(showLoading,httpRequest,alertService,stopLoading,$state) {
  
   var _self = this;
   
     showLoading.show();
     httpRequest.httpFunc().then(function(r){
       console.log('data is resolved',r);
       _self.data = r.data.posts;
       stopLoading.hide();
     },function(e){
       stopLoading.hide();
       alertService.showAlert('Error!', "Make sure you are connected to internet")
       console.log('data is rejected',e);
     })
     
     _self.gotopostDetail = function(data){
       var jsonString = JSON.stringify(data);
      
       $state.go('menu.postDetail',{postID:jsonString});
        console.log('getting data',data);
     }
    
})



/**
 * 
 * Post Detail Controller
 * 
 */
   
   .controller('postDetailCtrl',function($stateParams){
     var _self = this;
     var params = $stateParams.postID;
     console.log('postID',params);
   })



/**
 * 
 * bookmarkCtrl
 * 
 */


.controller('bookmarkCtrl', function($scope, $stateParams) {
})


/**
 * 
 * likeCtrl
 * 
 */


.controller('likeCtrl', function($scope, $stateParams) {
})

 /**
  * 
   shareCtrl
  */
  


.controller('shareCtrl', function($scope, $stateParams) {
})

/**
 * 
 * Rate Controller
 * 
 */

.controller('rateCtrl', function($scope, $stateParams) {
})

   /**
    * 
      About Controller
    
    */


.controller('aboutCtrl', function($scope, $stateParams) {
})





   /**
    * 
       Others Controller
     
    */



.controller('othersCtrl', function($scope, $stateParams) {
})
