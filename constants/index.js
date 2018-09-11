let createFile;

switch (process.platform) {
  case 'darwin':
  case 'linux':
    createFile = 'touch ';
    break;
  case 'win32':
    createFile = 'echo > ';
    break;
  default:
    throw new Error('Unsupported platform: ' + process.platform);
}

module.exports = { 
  createFile,
}