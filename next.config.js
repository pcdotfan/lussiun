const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const withTypescript = require('@zeit/next-typescript');
const fs = require('fs')
const path = require('path')

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/less/var.less'), 'utf8')
)

module.exports = withTypescript(withLess({
  useFileSystemPublicRoutes: false,
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables
  },
  webpack: function (config, { buildId, dev }) {
    const originalEntry = config.entry;

    config.resolve = {
      ...config.resolve,
      ...{
        alias: {
          ...config.resolve.alias,
          '@src': path.resolve(__dirname, 'client'),
        }
      },
    };

    return config
  }
}));
