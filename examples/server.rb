require 'rubygems'
require 'logger'
require 'rack'

class Rack::Flawed
  def initialize(app, opts={})
    @header = opts[:header] || 'HTTP_X_JQUERY_FLAWED_STACK'
    @app = app
  end

  def call(env)
    if env[@header]
      # Log or report exception here
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

