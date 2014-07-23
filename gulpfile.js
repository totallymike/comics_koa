var path = require('path')

global.ASSETS = path.join('app', 'assets')
global.ASSETS_LESS = path.join(global.ASSETS, 'stylesheets')

global.PUBLIC = 'public'
global.PUBLIC_CSS = path.join(global.PUBLIC, 'css')

require('./gulp')
