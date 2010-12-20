jQuery.flawed = function (scope){
  // NOTE anonymous function used to emulate traditional scope syntax
  // eg
  //    (function(){     ...     })(arguments);
  //    $.flawed(function(){ ... })(arguments);
  return function(){
    try {
      scope.apply(this, arguments);
    } catch (error) {
      var stack, request_params;

      if(window.printStackTrace !== undefined){
        stack = printStackTrace({e: error});
      } else {
        stack = error;
      }

      request_params = jQuery.extend(jQuery.flawed.config.request, {
        data: {
          url: $(location).attr('href'),
          message: error.message,
          type: error.name,
          stack: stack
        },

        beforeSend: function(request){
          request.setRequestHeader(jQuery.flawed.config.request.header,
                                   true);
        }
      });

      jQuery.ajax(request_params);
      throw error;
    }
  };
};

// Default config
jQuery.flawed.config = {
  request: {
    type: "POST",
    path: "/",
    header: "x-jquery-flawed-stack"
 }
};