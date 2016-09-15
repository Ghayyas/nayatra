

/**
 * 
 * Content parser Filter
 * 
 */


var app  = angular.module('netyatraFilter',[]);

app.filter('contentParse',function(){
  
  return function(input){
    var output = input.replace(/(<([^>]+)>)/ig,"");
    // var output = input.replace (/(^")|("$)/g, '');
    return output;
  }
});