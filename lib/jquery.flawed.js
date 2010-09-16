jQuery.flawed = function flawed(scope){
  // NOTE anonymous function used to emulate traditional scope syntax
  // eg
  //    (function(){     ...     })(arguments);
  //    $.flawed(function(){ ... })(arguments);
  return function(){
    try {
      scope.apply(this, Array.slice(arguments, 0));
    } catch (e) {
      // TODO alter headers to include x-javascript-error-report or some such
      jQuery.post(flawed.post_url, {
        url: $(location).attr('href')
      });

      throw e;
    }
  };
};

// Default settings
jQuery.extend(jQuery.flawed, {
  flawed: '/'
});