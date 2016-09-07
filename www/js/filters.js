

/**
 * 
 * Content parser Filter
 * 
 */


var app  = angular.module('netyatraFilter',[]);

app.filter('contentParse',function(){
  
  return function(input){
    var output = input.replace(/(<([^>]+)>)/ig,"");
    return output;
  }
});



app.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});

app.filter('myCustomUnique',function(){
  return function (input) {
   var output = [];
  //  var split = input.split('');
//    for(var i = 0; i < input.length; i++){
// console.log('input',input[i])
//    }
   console.log('output',input);
        return output;  
  }
  
})