describe('jQuery.flawed', function(){
  before_each(function(){
    JSpec.defaultContext.proxy = {};
    JSpec.defaultContext.error_msg = "foo";

    // set some helper methos, extent default later if default
    // helpers are required
    JSpec.defaultContext.expect_raise = function(body){
      expect(function(){

        // use a default function or one provided to
        // execute throw
        jQuery.flawed(body || function(){
          throw JSpec.defaultContext.proxy.error = new Error(error_msg);
        })();
      }).to(throw_error, Error, error_msg);
    };
  });

  describe('error handling', function(){

    it('should reraise top level exceptions', function(){
      expect_raise();
    });

    it('should reraise exceptions from nested contexts', function(){
      expect_raise(function(){
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

    before_each(function(){
      JSpec.defaultContext.flawed_defaults = jQuery.flawed.config;
      jQuery.ajax = function(options){
        JSpec.defaultContext.proxy = options;
      };
    });

    after_each(function(){
      jQuery.flawed.config = JSpec.defaultContext.flawed_defaults;
    });

    it('should post the path set on the flawed object', function(){
      jQuery.flawed.config.request.path = '/foo';
      expect_raise();
      expect(proxy.path).to(be, '/foo');
    });

    it('should use the type defined on the settings object', function(){
      jQuery.flawed.config.request.type = 'POST';
      expect_raise();
      expect(proxy.type).to(be, 'POST');
    });

    it('should use the header defined on the settings object', function(){
      jQuery.flawed.config.request.header = 'foo';
      expect_raise();
      expect(proxy.header).to(be, 'foo');
    });

    describe('data', function(){
      before_each(function(){
        expect_raise();
      });

      // NOTE test for array stacktrace when javascript-stacktrace is included
      it('should include the stacktrace as an array with printStackTrace defined', function(){
        expect(proxy.data.stack).to(be_an_instance_of, Array);
      });

      it('should include the stack as the error object itself when printStackTrace is not defined', function(){
        window.printStackTrace = undefined;
        expect(proxy.data.stack).to(be_an_instance_of, Object);
      });

      it('should include the url from the current location', function(){
        expect(proxy.data.url).to(be, $(location).attr('href'));
      });

      it('should include the type from the error name', function(){
        expect(proxy.data.type).to(be, new Error('foo').name);
      });

      it('should include the message from the error', function(){
        expect(proxy.data.message).to(be, new Error('foo').message);
      });
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
      })();

      expect(x).to(be, dom.find('.counter').length);
    });
  });

  describe('using as scope', function(){
    it('should forward parameters', function(){
      jQuery.flawed(function(foo, one){
        expect(foo).to(be, 'foo');
        expect(one).to(be, 1);
        expect(arguments.length).to(be, 2);
      })('foo', 1);
    });
  });
});