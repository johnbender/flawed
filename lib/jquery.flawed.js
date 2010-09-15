jQuery.flawed = function(scope){
  // NOTE used to emulate anonymous function scope syntax
  // ie (function(){ ... })(arguments);
  //    $.flawed(function(){ ... })();
  var flawed_context = arguments.callee;

  return function(){
    try {
      scope.apply(this, Array.slice(arguments, 0));
    } catch (e) {
      // TODO alter headers to include x-javascript-error-report or some such
      jQuery.post(flawed_context.post_url, {
        url: $(location).attr('href')
      });

      throw e;
    }
  };
};

jQuery.flawed.post_url = '/';
