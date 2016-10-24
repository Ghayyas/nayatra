var app = angular.module('netyatra.controllers', [])

/**
 * 
 * Main Controller
 */

 .controller('AppCtrl', function($scope,$cordovaSocialSharing,$cordovaInAppBrowser,$cordovaGoogleAnalytics,$timeout) {
  

  //Share AnyWhere Function
    var shareTitle = 'મોબાઈલ, કોમ્પ્યુટર, લેપટોપ ની ફોટા સાથે ની મદદ આપતી અને ઈન્ટરનેટ જગત ની તમામ માહિતી આપતી એક માત્ર ગુજરાતી એપ્લીકેશન એટલે Netયાત્રા. તદન મફત, કોઈ પણ ચાર્જ વગર આજે જ ડાઉનલોડ કરો';
   $scope.shareAnywhere = function() {
    
    $timeout(function() {
         $cordovaSocialSharing.share(shareTitle, null, null, "http://bit.ly/1WQ5sDG");
    }, 300);
   
   }
    
   // Rate us Function
   
    $scope.RateUs = function(){
      
     var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no',
      hidden: 'no',
      clearsessioncache: 'yes'
    };
    $timeout(function(){
      $cordovaInAppBrowser.open('https://play.google.com/store/apps/details?id=com.deucen.netyatraa', '_blank', options);
    },300)
      
//       AppRate.preferences = {
//       openStoreInApp: true,
//       useCustomRateDialog: false,
//       displayAppName: 'Net Yatra',
//       // usesUntilPrompt: 5,
//       promptAgainForEachNewVersion: false,
//       storeAppURL: {
//       ios: '<my_app_id>',
//       android: 'market://details?id=com.deucen.netyatraa',
//       windows: 'ms-windows-store://pdp/?ProductId=<the apps Store ID>',
//       blackberry: 'appworld://content/[App Id]/',
//       windows8: 'ms-windows-store:Review?name=<the Package Family Name of the application>'
//     },
//     customLocale: {
//       title: "Rate us",
//       message: "Would you like to Rate us ?",
//       cancelButtonLabel: "No, Thanks",
//       laterButtonLabel: "Remind Me Later",
//       rateButtonLabel: "Rate It Now"
//     }
// };

//     AppRate.promptForRating(true);

};

//  Like us on Facebook
    
  $scope.likeUsOnFb = function(){
    // window.open('https://www.facebook.com/netyatra');
    var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no',
      hidden: 'no',
      clearsessioncache: 'yes'
    };
  $timeout(function(){
      $cordovaInAppBrowser.open('https://www.facebook.com/netyatra', '_blank', options);
     },300)

  }
    
    
    //Our More Apps
  
  $scope.ourMoreApps = function(){
    var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no',
      hidden: 'no',
      clearsessioncache: 'yes'
    };
    
    $timeout(function(){
    $cordovaInAppBrowser.open('https://play.google.com/store/search?q=pub%3ADeuceN%20Tech&c=apps', '_blank', options);
  },300)

  }  
    
    
      
 })



  /** 
   *
   * Home Controller
   *
  */
  
.controller('homeCtrl', function (showLoading,httpRequest, alertService, stopLoading, $http, $state,httpAgain,$timeout,$scope,bannerAd) {

    var _self = this;
        
    $scope.$on("$ionicView.beforeEnter", function(event, data){
          console.log('home route works');    
          bannerAd.hideBanner();

     });
    // handle event
    _self.desibleLoadBtn = false;
    var c;
    var totalCounts;
    _self.load = function(){
    showLoading.show();
    c = 10;
     httpRequest.httpFunc().then(function(d){
       stopLoading.hide();
     _self.data = d.data.posts;  
     totalCounts = d.data.count_total;     
      
      },function(e){
            stopLoading.hide();         
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
      alertService.showAlert('Error',"Make Sure you have working Internet Connections");
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

   .controller('categoryCtrl', function ($http,$stateParams,$cordovaLocalNotification, showLoading, httpRequest, alertService, stopLoading, $state,httpAgain,$scope,$rootScope) {
   
    var _self = this;
    
    var totalPost;
    showLoading.show();
    // _self.msg = $rootScope.msg;
    // console.log('rootScope',$rootScope.msg);
    $http.get('http://netyatra.in/api/get_category_index/').then(function(d){
     
       _self.data = d.data.categories;
      // console.log('catDetail',_self.data);
       stopLoading.hide();
    },function(e){
      stopLoading.hide();
      alertService.showAlert('Error','Make sure you have working internet connection');
      // console.log('erro',e)
    })


    //   //Ye code UNIQUE kar raha hai
    //   for(var i=0;i<_self.data.length;i++){
    //     var arr = _self.data[i].categories;
    //     for(var j=0;j<arr.length;j++){
    //       var arr2 = arr[j].id;
    //       if(_self.myArray.indexOf(arr2)==-1){
    //         _self.myArray.push(arr2);
    //         arr[j].status = true;
    //       }else {
    //         arr[j].status = false;
    //       }
    //     }
    //   }
    //   stopLoading.hide();
      
    //   },function(e){
    //     stopLoading.hide();
    //   alertService.showAlert('Error!', "Make sure you are connected to internet")
    //   })

    // }, function (e) {
    //   stopLoading.hide();
    //   alertService.showAlert('Error!', "Make sure you are connected to internet");
    // });

  //  query,viewTitle
    _self.showCategoryDetail = function (id) {
   var jsonString = JSON.stringify(id);
   $state.go('menu.categoryDetail',{category:jsonString});
    };


   })




  /**  
   *
   *  Category Detail Ctrl
   *
   */

   .controller('categoryDetailCtrl', function ($stateParams,$scope,$state, $http,showLoading,alertService,stopLoading,$timeout,bannerAd) {
   
    var _self = this;
    var count;
    $scope.$on("$ionicView.beforeEnter", function(event, data){
              bannerAd.hideBanner();

     });
  
  
    _self.data = JSON.parse($stateParams.category);
    showLoading.show();
    $http.get('http://netyatra.in/api/core/get_category_posts/?id='+_self.data).then(function(d){
   
      _self.title = d.data.category.title;
      _self.categoryArray = d.data.posts;
      count = d.data.count

     $timeout(function(){
       stopLoading.hide();
      },4000)
       
    },function(err){
       stopLoading.hide();
      alertService.showAlert('Error',"Make sure you have working internet connection");
    })
    
    _self.loadMore = function(){
   
      showLoading.show();
      count = count + 10;
     
    $http.get('http://netyatra.in/api/core/get_category_posts/?id='+_self.data+'&count='+count).then(function(r){
      _self.categoryArray = r.data.posts;  

      $timeout(function(){
      stopLoading.hide();
      },4000)
      
      
     
    },function(e){
      stopLoading.hide();
      alertService.showAlert('Error',"Make Sure you have working Internet Connections");
   });
         
  }
    

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

 .controller('postDetailCtrl',function($scope,$stateParams,$rootScope,StorageService,alertService,$cordovaSocialSharing,showLoading,$timeout,stopLoading,bannerAd,$ionicPlatform,$ionicHistory,$http){
     
      var _self = this;
      var params = $stateParams.postID;
      var jsonParse = JSON.parse(params);
      $ionicPlatform.onHardwareBackButton(function() {
        // console.log('show the inter 1')
        
        bannerAd.showInter();
        bannerAd.hideBanner();
        $ionicHistory.goBack();
      });
      
      _self.back = function(){
        //  console.log('show the inter 1')
        bannerAd.showInter();
        bannerAd.hideBanner();
        $ionicHistory.goBack();
      }
     _self.postTitle = jsonParse.title;
        $scope.$on("$ionicView.beforeEnter", function(event, data){
          showLoading.show();
           bannerAd.banner();
        
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
       
        $timeout(function(){
           stopLoading.hide();
        },2000)
        

     /**
      * Facebook Share Function
      *
      */
      
      
        _self.shareFb = function(msg) {
          var output = msg.replace(/(<([^>]+)>)/ig,"");

            $cordovaSocialSharing.shareViaFacebook(jsonParse.title, null, "http://bit.ly/1WQ5sDG")
            .then(function(s){
            },function(e){
            });
    }
    
    _self.shareAnyWhere = function(d){
      setTimeout(function() {
         $cordovaSocialSharing.share(jsonParse.title, null, null, "http://bit.ly/1WQ5sDG");
    }, 300);
    }
      
      
       var ps = JSON.stringify(jsonParse.content);
      
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


     }

     _self.remove = function(d){
       _self.bookmarked = false;
        StorageService.remove(d).then(function(s) {
          alertService.showAlert('Success !','SuccessFully Remove Bookmarked')
        },function(e) {
          alertService.showAlert('Error !','Error in removing');
        });
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
       }

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
