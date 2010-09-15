describe('jQuery.flawed', function(){
  before_each(function(){
    JSpec.defaultContext.error_msg = "foo";

    // set some helper methos, extent default later if default
    // helpers are required
    JSpec.defaultContext.expect_reraise = function(body){
      expect(function(){

        // use a default function or one provided to
        // execute throw
        jQuery.flawed(body || function(){
          throw new TypeError(error_msg);
        });
      }).to(throw_error, TypeError, error_msg);
    };
  });

  describe('error handling', function(){

    it('should reraise top level exceptions', function(){
      expect_reraise();
    });

    it('should reraise exceptions from nested contexts', function(){
      expect_reraise(function(){
        jQuery(document).ready(function(){
          (function(){
            (function(){
              throw new TypeError(error_msg);
            })();
          })();
        });
      });
    });
  });

  describe('reporting', function(){
    it('should post the url', function(){
      expect(jQuery).to(receive, 'post');
      //,with_args(',', {
      //        url: window.location
      //      });

      expect_reraise();
    });
  });

  describe('dom activity', function(){
    before_each(function(){
      JSpec.defaultContext.dom = jQuery(fixture('divs'));
    });

    it('should behave as normal', function(){
      var x = 0;

      jQuery.flawed(function(){
        jQuery(document).ready(function(){
          x = dom.find('.counter').length;
        });
      });

      expect(x).to(be, dom.find('.counter').length);
    });
  });
});