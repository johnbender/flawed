jQuery.flawed = function(scope, params){
  try {
    // TODO pass the rest of the arguments
    scope(params);
  } catch (e) {
    // TODO alter headers to include x-javascript-error-report or some such
    jQuery.post();
    // (
    //   '/',
    //   {
    //     url: window.location
    //   });
    throw e;
  }
};