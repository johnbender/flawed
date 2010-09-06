jQuery.flawed = function(scope, params){
  try {
    // TODO pass the rest of the arguments
    scope(params);
  } catch (e) {
    jQuery.ajax();
    throw e;
  }
};