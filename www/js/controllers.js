var app = angular.module('netyatra.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  
})



// /**
//  * 
//  * Home Controller
//  * 
//  */

//   .controller('homeCtrl', function(showLoading,httpRequest,alertService,stopLoading,$state) {
  
//    var _self = this;

//    // handle event
//    showLoading.show();
//      httpRequest.httpFunc().then(function(r){
//        console.log('data is resolved',r);
//        _self.data = r.data.posts;
//       //  console.log('Data',_self.data);
//        stopLoading.hide();
//      },function(e){
//        stopLoading.hide();
//        alertService.showAlert('Error!', "Make sure you are connected to internet")
//       //  console.log('data is rejected',e);
//      })
   
     
     
//      _self.selectCall = function(d) {
//       //  console.log('selected',d);
     
//        if(d.id == d.id){
//       _self.img = d.attachments[0].url;
//      _self.title = d.title;
//      _self.sendData = d;
//            console.log('seleted calls',_self.img,_self.title);
//          _self.selectedcall = 'calling to seleted ' + d;
//        }
    
     
//      }
//      _self.deselect = function(d){
//     //    if(d.id == d.id){
//     //   _self.img = d.attachments[0].url;
//     //  _self.title = d.title;
//     //  _self.sendData = d;
//     //    console.log('deselect calls',_self.img,_self.title);
//     //  }
       

//      }
//      _self.gotopostDetail = function(data){
//        var jsonString = JSON.stringify(data);
      
//        $state.go('menu.postDetail',{postID:jsonString});
//         // console.log('getting data',data);
//      }
    
// })


// /**
//  * 
//  * categoryCtrl
//  * 
//  */

//     .controller('categoryCtrl',function($stateParams,showLoading,httpRequest,alertService,stopLoading,$state){
//       var _self = this;
    
//       showLoading.show();
//      httpRequest.httpFunc().then(function(r){
//        console.log('data is resolved',r);
//        _self.data = r.data.posts;
//        console.log('Data',_self.data);
//        stopLoading.hide();
//      },function(e){
//        stopLoading.hide();
//        alertService.showAlert('Error!', "Make sure you are connected to internet")
//        console.log('data is rejected',e);
//      })
     
//      _self.showCategoryDetail = function(d){
//        var jsonString = JSON.stringify(d);
//       //  var c =jsonString.replace(/[^/\%22]+$/,"")
      
//        $state.go('menu.categoryDetail',{category:jsonString})
//   .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

//     // With the new view caching in Ionic, Controllers are only called
//     // when they are recreated or on app start, instead of every page change.
//     // To listen for when this page is active (for example, to refresh data),
//     // listen for the $ionicView.enter event:
//     //$scope.$on('$ionicView.enter', function(e) {
//     //});


//   })



  /**
   *
   * Home Controller
   *
   */


  .controller('homeCtrl', function ($timeout, showLoading, httpRequest, alertService, stopLoading, $state) {

    var _self = this;
    // handle event
    showLoading.show();
    httpRequest.httpFunc().then(function (r) {
      console.log('data is resolved', r);
      _self.data = r.data.posts;
      console.log('Data', _self.data);
      stopLoading.hide();
    }, function (e) {
      stopLoading.hide();
      alertService.showAlert('Error!', "Make sure you are connected to internet")
      console.log('data is rejected', e);
    });


    _self.selectCall = function (d) {
      //  console.log('selected',d);

      if (d.id == d.id) {
        _self.img = d.attachments[0].url;
        _self.title = d.title;
        _self.sendData = d;
        console.log('seleted calls', _self.img, _self.title);
        _self.selectedcall = 'calling to seleted ' + d;
      }


    }
    _self.deselect = function (d) {
      //    if(d.id == d.id){
      //   _self.img = d.attachments[0].url;
      //  _self.title = d.title;
      //  _self.sendData = d;
      //    console.log('deselect calls',_self.img,_self.title);
      //  }


    }
    _self.gotopostDetail = function (data) {
      var jsonString = JSON.stringify(data);

      $state.go('menu.postDetail', {postID: jsonString});
      // console.log('getting data', data);
    }

  })


  /**
   *
   * categoryCtrl
   *
   */

  .controller('categoryCtrl', function ($stateParams, showLoading, httpRequest, alertService, stopLoading, $state) {
    var _self = this;

    showLoading.show();
    httpRequest.httpFunc().then(function (r) {
      console.log('data is resolved', r);
      _self.data = r.data.posts;
      console.log('Data', _self.data);
      stopLoading.hide();
    }, function (e) {
      stopLoading.hide();
      alertService.showAlert('Error!', "Make sure you are connected to internet");
      console.log('data is rejected', e);
    });

    _self.showCategoryDetail = function (d) {
      var jsonString = JSON.stringify(d);
      var c = jsonString.replace(/[^/\%22]+$/, "");

      $state.go('menu.categoryDetail', {category: jsonString});
      //  console.log('detail',c);
    };

    _self.myArray = [];

    _self.checkStatus = function (index1, value, index2) {
      console.log(index1);
      console.log(index2);

        //var arr = _self.data[index1].categories;
          if (_self.myArray.indexOf(value) == -1) {
            _self.myArray.push(value);
            console.log("first");
            _self.data[index1].categories[index2].status = true;
            return true;
          } else {
            console.log("second");
            _self.data[index1].categories[index2].status = false;
            return true;
          }
      }
      // arr = _self.data[index1].categories;

      //for (var i = 0; i < arr.length; i++) {
        //if (_self.myArray.indexOf(value) != -1) {
//_self.data[index1-1].categories[index2].status = false;
  //        return true;
    //      break;
      //  }
      //}
      //_self.data[index1-1].categories[index2].status = true;
        //_self.myArray.push(value);
      //return true;

      /*  if(arr.indexOf(value)==-1){
       return true;
       }else{
       return false;
       }*/
    //};
    
})




  /**
   *
   *  Category Detail Ctrl
   *
   */

  .controller('categoryDetailCtrl', function ($stateParams, $state) {

    var _self = this;
    var params = $stateParams.category;
    var jsonString = JSON.parse(params)
    _self.data = jsonString;
    console.log('detail ID', jsonString);

    _self.gotoCategoryDetail = function (d) {
      var jsonString = JSON.stringify(d)
      $state.go('menu.postDetail',{postID:jsonString});
      console.log('detial deta',d);
    }  
    
    
  })  
    
    

/**
 * 
 * Post Detail Controller
 * 
 */
   
   .controller('postDetailCtrl',function($scope,$stateParams,$rootScope,StorageService,alertService){
     var _self = this;
      var params = $stateParams.postID;
      var jsonParse = JSON.parse(params);
      
      // Enter Page is loaded this events will works
      
        $scope.$on("$ionicView.beforeEnter", function(event, data){
          // handle event
      //  console.log("State Params: ", data.stateParams);
         var getSpecific = StorageService.getAll();
          for(var i = 0; i < getSpecific.length; i++){
              var jsonID = jsonParse.id;
              var speci = getSpecific[i].id;
                if(jsonID == speci){
                _self.bookmarked = true;

                  //  console.log('sucess mil gya',jsonParse.id); 
          }
           else{
                  //  console.log('nhn mila');
                   _self.bookmarked = false;
                }
        }
        });
     
     
     
      _self.content = jsonParse.content;
      _self.fullDetail = jsonParse;
     
     _self.bookmark = function(d){
       
       StorageService.add(d).then(function(s){
         
        _self.bookmarked = true;
         alertService.showAlert('Success !','successfully Bookmarked');
       },function(e){
         alertService.showAlert('Error !','Error getting Bookmarked')
       });
       
       var getting = StorageService.getAll();
      
       
       
       console.log('storage Service',getting);
       
      //  var getItem = window.localStorage.getItem('item');
      //  if(getItem){
      //    var parse = JSON.parse(getItem);
      //    parse.push(d);
      //  var con = JSON.stringify(parse);
      //  window.localStorage.setItem('item',con);
      //    console.log('arr',parse);
      //  }
      //  else{
      //  item.push(d);
      //  var con = JSON.stringify(item);
      //  console.log('json',item);
      //  window.localStorage.setItem('item',con);
      //  }

     }
     
     _self.remove = function(d){
       _self.bookmarked = false;
        StorageService.remove(d).then(function(s) {
          alertService.showAlert('Success !','SuccessFully Remove Bookmarked')
        },function(e) {
          alertService.showAlert('Error !','Error in removing');
        });  
        console.log('storage Remove',StorageService.getAll());
     }
 })
 
 
/**
 * 
 * bookmarkCtrl
 * 
 */

 .controller('bookmarkCtrl', function($stateParams,StorageService,$state) {
       
       var _self = this;
       
        var getSpecific = StorageService.getAll();

       _self.data = getSpecific;
       
       _self.gotopostDetail = function(data){
         
         var jsonString = JSON.stringify(data);
         $state.go('menu.postDetail', {postID: jsonString});
         console.log('getting data', data);
       }
       
       console.log('bookmark',getSpecific);
  
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


  
  .controller('shareCtrl', function ($scope, $stateParams) {
  })

  /**
   *
   * Rate Controller
   *
   */

  .controller('rateCtrl', function ($scope, $stateParams) {
  })

  /**
   *
   About Controller

   */


  .controller('aboutCtrl', function ($scope, $stateParams) {
  })

  /**
   *
   Others Controller

   */

.controller('othersCtrl', function ($scope, $stateParams) {
    
  })
