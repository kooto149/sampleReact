const CracoAlias = require("craco-alias");

module.exports = {
    webpack: {
      alias: {
        '@components': CracoAlias.resolve(__dirname, 'src/components'),
        '@pages': CracoAlias.resolve(__dirname, 'src/pages'),
        '@hooks': CracoAlias.resolve(__dirname, 'src/hooks'),
      },
    },
  };