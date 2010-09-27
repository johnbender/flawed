require 'rubygems'
require 'rack'

class Rack::Flawed
  def initialize(app, opts={})
    @header = opts[:header] || 'HTTP_X_JQUERY_FLAWED_STACK'
    @app = app
  end

  def call(env)
    req = Rack::Request.new(env)

    if env[@header] && req.post?
      # Log the stacktrack
      puts <<-stack
!! Stack Trace !!
#{req.params.inspect}
!! Stack Trace !!
stack
    end

    @app.call(env)
  end
end

app = Rack::Builder.new do
  use Rack::Flawed
  use Rack::Static, :urls => ['/']
  run lambda { |env| [200, { 'Content-Type' => 'text/html' }, 'Hmmmm....'] }
end

Rack::Handler::WEBrick.run app, :Port => 4567

