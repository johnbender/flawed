describe('jQuery.flawed', function(){
  describe('error handling', function(){
    before_each(function(){
      error_msg = "foo";

      // set some helper methos, extent default later if default
      // helpers are required
      JSpec.context = {
        expect_reraise: function(body){
          expect(function(){

            // use a default function or one provided to
            // execute throw
            jQuery.flawed(body || function(){
              throw new TypeError(error_msg);
            });
          }).to(throw_error, TypeError, error_msg);
        }
      };
    });

    after_each(function(){
      //reset context for normal use elsewhere
      JSpec.context = null;
    });

    it('should reraise top level exceptions', function(){
      expect_reraise();
    });

    it('should communicate errors to the server', function(){
      expect(jQuery).to(receive, 'ajax');
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

  describe('dom activity', function(){
    before_each(function(){
      dom = jQuery(fixture('divs'));
    });

    it('should behave as normal', function(){
      x = 0;

      jQuery.flawed(function(){
        jQuery(document).ready(function(){
          x = dom.find('.counter').length;
        });
      });

      expect(x).to(be, dom.find('.counter').length);
    });
  });
});