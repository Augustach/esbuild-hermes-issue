module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ['@rnx-kit/babel-preset-metro-react-native', {
        disableImportExportTransform: process.env.RNX_METRO_SERIALIZER_ESBUILD,
      }],
    ],
  };
};
