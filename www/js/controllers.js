var app = angular.module('netyatra.controllers', [])

/**
 * 
 * Main Controller
 */

 .controller('AppCtrl', function($scope,$cordovaSocialSharing,$cordovaInAppBrowser,$cordovaGoogleAnalytics) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

   //Ionic Push
   
  //  $ionicPush.register().then(function(t) {
  //    return $ionicPush.saveToken(t);
  //    }).then(function(t) {
  //      console.log('Token saved:', t.token);
  //    });


  //     $scope.$on('cloud:push:notification', function(event, data) {
  //       var msg = data.message;
  //       alert(msg.title + ': ' + msg.text);
  //     });
   
   /**
    * 
    *  cordovaGoogleAnalytics
    */


        // $cordovaGoogleAnalytics.debugMode();
        // $cordovaGoogleAnalytics.setUserId('USER_ID');




  //Share AnyWhere Function

   $scope.shareAnywhere = function() {
    
    setTimeout(function() {
         $cordovaSocialSharing.share("Net Yatra", null, null, "https://play.google.com/store/apps/details?id=com.deucen.netyatraa");
    }, 300);
   
   }
    
   // Rate us Function
   
    $scope.RateUs = function(){
      AppRate.preferences = {
      openStoreInApp: true,
      useCustomRateDialog: false,
      displayAppName: 'Net Yatra',
      // usesUntilPrompt: 5,
      promptAgainForEachNewVersion: false,
      storeAppURL: {
      ios: '<my_app_id>',
      android: 'market://details?id=com.deucen.netyatraa',
      windows: 'ms-windows-store://pdp/?ProductId=<the apps Store ID>',
      blackberry: 'appworld://content/[App Id]/',
      windows8: 'ms-windows-store:Review?name=<the Package Family Name of the application>'
    },
    customLocale: {
      title: "Rate us",
      message: "Would you like to Rate us ?",
      cancelButtonLabel: "No, Thanks",
      laterButtonLabel: "Remind Me Later",
      rateButtonLabel: "Rate It Now"
    }
};

    AppRate.promptForRating(true);

};

//  Like us on Facebook
    
  $scope.likeUsOnFb = function(){
   

    var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no',
      hidden: 'no',
      clearsessioncache: 'yes'
    };

  document.addEventListener("deviceready", function () {
    $cordovaInAppBrowser.open('https://www.facebook.com/netyatra', '_blank', options)
      .then(function(event) {
        // success

      })
      .catch(function(event) {
        // error
      });


    // $cordovaInAppBrowser.close();

  }, false);

  }
    
    
    //Our More Apps
  
  $scope.ourMoreApps = function(){
   
    // var ref = cordova.InAppBrowser.open('http://apache.org', null, null);
  //  window.open('https://www.facebook.com/netyatra');
    var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no',
      hidden: 'no',
      clearsessioncache: 'yes'
    };

  document.addEventListener("deviceready", function () {
    $cordovaInAppBrowser.open('https://play.google.com/store/search?q=pub%3ADeuceN%20Tech&c=apps', '_blank', options)
      .then(function(event) {
        // success
        // alert('works');
        // console.log('successfully event fire',event);
      })
      .catch(function(event) {
        // console.log('catching error',event);
        // error
      });


    // $cordovaInAppBrowser.close();

  }, false);

  }  
    
    
      
 })



  /** 
   *
   * Home Controller
   *
  */
  
.controller('homeCtrl', function (showLoading,httpRequest, alertService, stopLoading, $http, $state,httpAgain,$timeout,$scope) {

    var _self = this;
    
    // handle event
    _self.desibleLoadBtn = false;
    var c;
    var totalCounts;
    
    // _self.c = 10;
    _self.load = function(){
    // _self.data = [];
    showLoading.show();
    c = 10;
     httpRequest.httpFunc().then(function(d){
       stopLoading.hide();
      //  console.log('data',_self.data);.
     _self.data = d.data.posts;  
     totalCounts = d.data.count_total;     
      
      },function(e){
            stopLoading.hide();
            // $scope.$broadcast('scroll.infiniteScrollComplete');	
         
       }) 
    }
_self.load();
          
    _self.loadMore = function(){
      showLoading.show();
      c = c + 10;
     
    $http.get('http://netyatra.in/?json=get_recent_posts&count='+ c).then(function(r){
      console.log('sending posts are ',r);
      stopLoading.hide();

      _self.data = r.data.posts;
       if(r.data.count == totalCounts){
       alertService.showAlert('Sorry',"Sorry no more data is avalible");
    }
    },function(e){
      stopLoading.hide();
    });
         
  }
    
    
    _self.gotopostDetail = function (data) {
      var jsonString = JSON.stringify(data);

      $state.go('menu.postDetail', {postID: jsonString});
    }

   })


  /**  
   *
   * categoryCtrl
   *
   */

   .controller('categoryCtrl', function ($stateParams, showLoading, httpRequest, alertService, stopLoading, $state,httpAgain) {
    var _self = this;
    var totalPost;
    showLoading.show();
    httpRequest.httpFunc().then(function (r) {
      totalPost = r.data.count_total;
      
      httpAgain.http(totalPost).then(function(d){
        _self.data = d.data.posts;
       _self.myArray = [];


      //Ye code UNIQUE kar raha hai
      for(var i=0;i<_self.data.length;i++){
        var arr = _self.data[i].categories;
        for(var j=0;j<arr.length;j++){
          var arr2 = arr[j].id;
          if(_self.myArray.indexOf(arr2)==-1){
            _self.myArray.push(arr2);
            arr[j].status = true;
          }else {
            arr[j].status = false;
          }
        }
      }
      stopLoading.hide();
      
      },function(e){
        stopLoading.hide();
      alertService.showAlert('Error!', "Make sure you are connected to internet")
      })

    }, function (e) {
      stopLoading.hide();
      alertService.showAlert('Error!', "Make sure you are connected to internet");
    });

    _self.showCategoryDetail = function (query,viewTitle) {
      var jsonString = JSON.stringify(query);
      var modifies = JSON.stringify(_self.data);
      var titleData = JSON.stringify(viewTitle);
      $state.go('menu.categoryDetail', {category: modifies, value:jsonString, title:titleData});
    };


   })




  /**  
   *
   *  Category Detail Ctrl
   *
   */

   .controller('categoryDetailCtrl', function ($stateParams, $state) {

    var _self = this;
    _self.data = JSON.parse($stateParams.category);
    _self.query = JSON.parse($stateParams.value);
    // console.log('params',$stateParams);
    _self.viewTitle = JSON.parse($stateParams.title);
    
    _self.mainArray = [];
    // console.log('detail ID', jsonString);
    
    for(var i=0;i < _self.data.length; i++){
      var arr = _self.data[i].categories;
      for(var j=0; j < arr.length; j++){
         var newValue = arr[j].id;
        // console.log('value',_self.query);
        if(newValue == _self.query){
          _self.mainArray.push(_self.data[i]);
          break;
        }
      }
    }
    // console.log(_self.mainArray);

    _self.gotoCategoryDetail = function (d) {
      var jsonString = JSON.stringify(d);
      $state.go('menu.postDetail',{postID:jsonString});
    }


   })













/**
 *
 * Post Detail Controller
 *
 */

 .controller('postDetailCtrl',function($scope,$stateParams,$rootScope,StorageService,alertService,$cordovaSocialSharing){
     var _self = this;
      var params = $stateParams.postID;
      var jsonParse = JSON.parse(params);

      // Enter Page is loaded this events will works

        $scope.$on("$ionicView.beforeEnter", function(event, data){
          // handle event
          // console.log('json',jsonParse);
         var getSpecific = StorageService.getAll();
          for(var i = 0; i < getSpecific.length; i++){
              var jsonID = jsonParse.id;
              var speci = getSpecific[i].id;
                if(jsonID == speci){
                _self.bookmarked = true;

          }
           else{
                   _self.bookmarked = false;
                }
        }
      });
        
        

     /**
      * Facebook Share Function
      *
      */
      
      
        _self.shareFb = function(msg) {
          var output = msg.replace(/(<([^>]+)>)/ig,"");

            $cordovaSocialSharing.shareViaFacebook(output, null, "https://play.google.com/store/apps/details?id=com.deucen.netyatraa")
            .then(function(s){
            },function(e){
            });
    //     setTimeout(function() {
    //      $cordovaSocialSharing.share("Net Yatra", null, null, "https://play.google.com/store/apps/details?id=com.deucen.netyatraa");
    // }, 300);
    }
    
    _self.shareAnyWhere = function(d){
      setTimeout(function() {
         $cordovaSocialSharing.share("Net Yatra", null, null, "https://play.google.com/store/apps/details?id=com.deucen.netyatraa");
    }, 300);
    }
      
      
       var ps = JSON.stringify(jsonParse.content);
      _self.content = JSON.parse(ps);
      
      _self.fullDetail = jsonParse;

     _self.bookmark = function(d){

       StorageService.add(d).then(function(s){

        _self.bookmarked = true;
         alertService.showAlert('Success !','successfully Bookmarked');
       },function(e){
         alertService.showAlert('Error !','Error getting Bookmarked')
       });

       var getting = StorageService.getAll();



      //  console.log('storage Service',getting);

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
        // console.log('storage Remove',StorageService.getAll());
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
        //  console.log('getting data', data);
       }

      //  console.log('bookmark',getSpecific);
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
   * shareCtrl
   *
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
   * About Controller
   *
   */
  
  .controller('aboutCtrl', function () {
    
    var _self = this;
    _self.content = "નેટયાત્રા - ટેકનોલોજી ની આસપાસ સાથે ફરવા નું એક નવું પ્લેટફોર્મ. જ્યાં તમને મળશે મોબાઈલ થી લઈને લેપટોપ/કોમ્પ્યુટર, નોકિયા થી લઈને એન્ડ્રોઈડ, આઈફોન અને ગેજેટ થી લઈને નવી તમામ ટેકનોલોજી વિશેની જાણકારી અને એ પણ આપણી પોતાની ગુજરાતી ભાષા માં. અને કોઈ પણ સબસ્ક્રિપ્શન ચાર્જીસ કે પૈસા ભર્યા વગર. નેટયાત્રા એટલે એક એવો પ્રવાસ કે જ્યાં દરેક નાના મોટા કંઇક નવું જોશે, જાણશે. આજે જયારે ટેકનોલોજી દરેક ક્ષેત્રમાં ઘુસી રહી છે ત્યારે ટેકનોલોજી સાથે કદમ મિલાવી ને આગળ ચાલવું જ ડાહપણ છે. જો આપણે આ ટેકનોલોજી સાથે નહિ ચાલીએ તો ટેકનોલોજી હરણફાળ સાથે આગળ નીકળી જશે અને આપણને એના ગુલામ બનાવી દેશે. મોબાઈલ ની અવનવી ટ્રીક્સ થી લઈને સારા જરૂરી સોફ્ટવેર વિશેની માહિતી, લેપટોપ કોમ્પ્યુટર ને ફાસ્ટ કરવાની ટ્રીક્સ ની સાથે મોબાઈલ ને સિક્યોર કરવાની ટ્રીક્સ, આઈફોન થી સ્કેન કરવાના ફ્રી સોફ્ટવેર ની માહિતી ની સાથે ગુગલ ગ્લાસ ના ફાયદાઓ વિશેની માહિતી, એન્ડ્રોઈડ રૂટ કરવાની રીત થી લઈને કોમ્પ્યુટર ક્લીન કરવાની વિવિધ રીતો સરળ ગુજરાતી ભાષામાં જરૂરી સ્ક્રીન શોટ સાથે વાંચવા માટેનું એક જ સરનામું એટલે નેટયાત્રા તો શું આપ બધા તૈયાર છો નેટયાત્રા ની આ સફર ખેડવા. કોઈ ટીકીટ, વિઝા ની જરૂર નથી. ફક્ત તમારી મરજી અને ધગશ સાથે રાખજો.";
    
  })






  /**
   *
   Others Controller

   */

 .controller('othersCtrl', function ($scope, $stateParams) {

  })
