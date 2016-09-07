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

   // handle event
   showLoading.show();
     httpRequest.httpFunc().then(function(r){
       console.log('data is resolved',r);
       _self.data = r.data.posts;
      //  console.log('Data',_self.data);
       stopLoading.hide();
     },function(e){
       stopLoading.hide();
       alertService.showAlert('Error!', "Make sure you are connected to internet")
      //  console.log('data is rejected',e);
     })
   
     
     
     _self.selectCall = function(d) {
      //  console.log('selected',d);
     
       if(d.id == d.id){
      _self.img = d.attachments[0].url;
     _self.title = d.title;
     _self.sendData = d;
           console.log('seleted calls',_self.img,_self.title);
         _self.selectedcall = 'calling to seleted ' + d;
       }
    
     
     }
     _self.deselect = function(d){
    //    if(d.id == d.id){
    //   _self.img = d.attachments[0].url;
    //  _self.title = d.title;
    //  _self.sendData = d;
    //    console.log('deselect calls',_self.img,_self.title);
    //  }
       

     }
     _self.gotopostDetail = function(data){
       var jsonString = JSON.stringify(data);
      
       $state.go('menu.postDetail',{postID:jsonString});
        // console.log('getting data',data);
     }
    
})


/**
 * 
 * categoryCtrl
 * 
 */

    .controller('categoryCtrl',function($stateParams,showLoading,httpRequest,alertService,stopLoading,$state){
      var _self = this;
    
      showLoading.show();
     httpRequest.httpFunc().then(function(r){
       console.log('data is resolved',r);
       _self.data = r.data.posts;
       console.log('Data',_self.data);
       stopLoading.hide();
     },function(e){
       stopLoading.hide();
       alertService.showAlert('Error!', "Make sure you are connected to internet")
       console.log('data is rejected',e);
     })
     
     _self.showCategoryDetail = function(d){
       var jsonString = JSON.stringify(d);
      //  var c =jsonString.replace(/[^/\%22]+$/,"")
      
       $state.go('menu.categoryDetail',{category:jsonString})
      //  console.log('detail',c);
     }
  })
    
  /**
   * 
   * 
   * 
   */
  
  .controller('categoryDetailCtrl',function($stateParams,$state){
    
    var _self = this;
    var params = $stateParams.category;
    var jsonString = JSON.parse(params)
    _self.data = jsonString;
    console.log('detail ID',jsonString);
    
    _self.gotoCategoryDetail = function(d){
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
   
   .controller('postDetailCtrl',function($stateParams,$rootScope){
     var _self = this;
      var params = $stateParams.postID;
      var jsonParse = JSON.parse(params);
      var item = [];
      _self.content = jsonParse.content;
      _self.fullDetail = jsonParse;
      // console.log('fullDetail',_self.fullDetail)
    //  console.log('postID',_self.content);
    //  console.log('item arra',item);
     
     
     
     _self.bookmark = function(d){
       var convertJson = JSON.stringify(d);
       var arr = [];
       var getItem = window.localStorage.getItem('item');
      //  console.log('getitem',getItem)
       if(getItem){
         var parse = JSON.parse(getItem);
        // window.localStorage.removeItem('item');
         arr.push(parse); 
         arr.push(d);
        //  var der = [parse,d]
         console.log('arr',arr);
        //  var con = JSON.stringify(arr);
         
        //   window.localStorage.setItem('item',con);
          
          //  window.localStorage.removeItem('item');

        //   var again = window.localStorage.getItem('item');
        //   var myparse = JSON.parse(again);
        //   arr.push(myparse);
        //   console.log('getting again in console',arr);
        //  window.localStorage.clear();
        //  console.log('get item',typeof(parse))
        //  var arrpush = arr.push(parse);
        //  console.log('push',arr);
        //  arr.push(convertJson);
        //  var con = JSON.stringify(arr);
        //  window.localStorage.setItem('item',con);
        //  console.log('arrpush',arr);
       }
      //  var arr = [{id: 2,'s':'s','sd':'er'},{id:3,'d':'ere','ff':'ssd'},{'id':1,'sdf':'sf'}]
       else{
      //  var arrpush = arr.push(convertJson);
      //   console.log('arr',arr);
       var con = JSON.stringify(d);
      //  var n = JSON.parse(con)
       console.log('json',con);
       window.localStorage.setItem('item',con);
      //  var d = window.localStorage.getItem('item');
      //  var r = JSON.parse(d);
      //  console.log('d',typeof(r));   
       }
      
      //  if(getItem){
      //   //  window.localStorage.removeItem('bookmark');
      //     // console.log('jaons',getItem,'typeOF',typeof(getItem));
      //     // var sring = JSON.stringify(getItem);
      //     // console.log('tyeof sring',sring);
      //      var parser = JSON.parse(getItem || '[]');
         
      //    console.log('sysys',typeof(parser));
         
      //   //  if(typeof(parser)== 'object'){
      //    parser.push(convertJson);
      //    window.localStorage.setItem('bookmark',parser);           
      //   //  }
      //   //  else{
      //   //  var sp = parser.split(',');
      //   //  console.log('sp',sp);
      //   //  sp.push(convertJson);
      //   //  window.localStorage.setItem('bookmark',sp);   
      //   //  }

 
      //  }else{
      //     var arr = '[' + convertJson + ']';
      //     var c = JSON.stringify(arr);
      //     console.log('arr',c)
      //   window.localStorage.setItem('bookmark',c);
      //  }
        // console.log('getitem',getItem);
        
       
        
      // console.log('send',d);
      //  if(getItem){
      //    var p = JSON.stringify(getItem);
      //    var n = JSON.parse(p);
      //    item.push(n);
      //    console.log('push success',item);
      //   //  window.localStorage.removeItem('bookmark');
      //    var data = JSON.stringify(d);
      //     window.localStorage.setItem('bookmark',data); 
      //     var d = localStorage.getItem('bookmark');
      //     var ddd = JSON.parse(d);
      //     item.push(ddd);
      //     // var ss = JSON.parse(d);
      //     console.log('gttin',item);
      // }
      // else{
      //   // item.push(parser);
      //   var myItem = JSON.stringify(d)
      //   console.log('else item',myItem);
      //   window.localStorage.setItem('bookmark',myItem);
        
      // }
      //  var parser = JSON.parse(item);

      //  console.log('d',item);
      //  var getItem = window.localStorage.getItem('bookmark.item');
      //  if(getItem){
      //    item.push(convertJson);
      //  }
      //  var cd = [convertJson];
      //  console.log('cd',cd);
      //  window.localStorage.setItem('bookmark.item',cd);

     }
 })
   
   



/**
 * 
 * bookmarkCtrl
 * 
 */


.controller('bookmarkCtrl', function($scope, $stateParams,$rootScope) {
            console.log('from bookmark arra',$rootScope.item);

       var c  = window.localStorage.getItem('item');
       var d = JSON.parse(c)
       console.log('bookmark',d);
  
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
