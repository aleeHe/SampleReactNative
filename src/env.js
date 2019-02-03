import { Platform } from 'react-native';

const general = {
  version: Platform.OS == 'android' ? '0.0.1' : '0.0.1',
  storeVersion: 1,
}
  
module.exports = {
    ...general,
}
  