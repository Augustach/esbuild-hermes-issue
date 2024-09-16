const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const { MetroSerializer: EsbuildMetroSerializer, esbuildTransformerConfig } = require('@rnx-kit/metro-serializer-esbuild');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const isEsbuild = process.env.ESBUILD === 'true';

if (isEsbuild) {
    config.serializer = {
        customSerializer: EsbuildMetroSerializer(),
    };
    config.transformer = esbuildTransformerConfig;
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
