

/**
 * 
 * Content parser Filter
 * 
 */


var app  = angular.module('netyatraFilter',[]);

app.filter('contentParse',function(){
  
  return function(input){
    
    var output = input.replace(/^[?]+$/ig,"");
    
    return output;
  }
});