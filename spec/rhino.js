
load('/home/nickel/.rvm/gems/ruby-1.9.2-p0/gems/jspec-4.3.3/lib/jspec.js')
load('/home/nickel/.rvm/gems/ruby-1.9.2-p0/gems/jspec-4.3.3/lib/jspec.xhr.js')
load('lib/yourlib.js')
load('spec/unit/spec.helper.js')

JSpec
.exec('spec/unit/spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()