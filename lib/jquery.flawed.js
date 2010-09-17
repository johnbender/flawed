jQuery.flawed = function (scope){
  // NOTE anonymous function used to emulate traditional scope syntax
  // eg
  //    (function(){     ...     })(arguments);
  //    $.flawed(function(){ ... })(arguments);
  return function(){
    try {
      scope.apply(this, arguments);
    } catch (e) {
      var request_params = jQuery.extend(jQuery.flawed.config.ajax, {
        data: {
          url: $(location).attr('href'),
          stack: 'foo'
        },
        beforeSend: function(request){
          request.setRequestHeader(jQuery.flawed.config.header, true);
        }
      });

      jQuery.ajax(request_params);
      throw e;
    }
  };
};

// Default settings
jQuery.flawed.config = {
  ajax: {
    type: "POST",
    path: "/"
  },

  header: "x-jquery-flawed-stack"
};