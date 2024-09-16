const child = require('child_process');
const util = require('util');
const fs = require('fs');
const path = require('path');

const rmRf = (pathToRemove) => fs.rmSync(pathToRemove, { recursive: true, force: true });
const mkdir = (pathToCreate) => fs.mkdirSync(pathToCreate, { recursive: true });
const command = (parts) => parts.filter(Boolean).join(' ');

async function execCommand(command) {
    const exec = util.promisify(child.exec);
    await exec(command);
}

// https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react-native-xcode.sh
const bundle = async ({
  platform,
  entryFile,
  outputDir = '',
  bundleName = platform === 'android' ? 'index.android.bundle' : 'main.jsbundle',
  bundleOutput = path.join(outputDir, bundleName),
  sourcemapOutput = `${bundleOutput}.map`,
}) => {
  if (outputDir) {
    rmRf(outputDir);
    mkdir(outputDir);
  }

  const bundleReactNative = command([
    'yarn react-native bundle',
    `--platform ${platform}`,
    `--entry-file ${entryFile}`,
    '--dev false',
    `--bundle-output ${bundleOutput}`,
    sourcemapOutput && `--sourcemap-output ${sourcemapOutput}`,
    `--assets-dest ${outputDir}`,
    '--reset-cache',
  ]);
  await execCommand(bundleReactNative);

  const hermesSourceMapFile = `${bundleOutput}.map`;
  const hermesBundle = command([
    `${getReactNativePackagePath()}/sdks/hermesc/${getHermesOSBin()}/hermesc`,
    '-emit-binary',
    `-out ${bundleOutput}.hrs ${bundleOutput}`,
    '-O',
    '-max-diagnostic-width=80',
    '-output-source-map',
    `-source-map ${hermesSourceMapFile}`,
    '-w',
  ]);
  await execCommand(hermesBundle);
};

function getHermesOSBin() {
  switch (process.platform) {
    case 'win32':
      return 'win64-bin';
    case 'darwin':
      return 'osx-bin';
    case 'freebsd':
    case 'linux':
    case 'sunos':
    default:
      return 'linux64-bin';
  }
}

function getReactNativePackagePath() {
  return path.join('node_modules', 'react-native');
}

bundle({
    platform: 'android',
    entryFile: 'index.js',
    outputDir: 'output',
});
