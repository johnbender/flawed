
# jQuery.flawed.js

Flawed is a very small plugin for reporting client side errors.

## Why?

No one writes perfect code, and client side developers needs the same error visibility that server side folks have in spades.

## Setup

On the client, just use flawed to wrap your js where you would normally use an anonymous function:

    jQuery.flawed(function(){
      // insert your flawed javascript here
    })();

Server side, with flawed's default configuration, simply handle POST requests at the root of your applicationa for requests with the header 'x-jquery-flawed-stack'.

Changing the default path is recommended:

    jQuery.flawed.config.ajax.path = '/your/path/here' // default '/'

Other settings include:

    jQuery.flawed.config.ajax.type // 'POST', 'GET', etc
    jQuery.flawed.config.header    // default: 'x-jquery-flawed-stack'

## Handlers

You can see a simple Rack app with a middleware for handling the reports in the examples directory. If you want to run it issue the following (you'll need ruby and bundler):

    $ bundle install
    $ ruby examples/server.rb

You can then access the index file at localhost:4567/examples/index.html, and watch the requests at the command line.

## Hacking

    $ gem install jspec
    $ cd ~/path/to/flawed/
    $ jspec run --browser firefox

## TODO

1. Provide a Rack middleware for use with [Radar](http://github.com/mitchellh/radar)
2. Add stacktrace

## License

(The MIT License)

Copyright (c) 2009 Your Name &lt;Your Email&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
