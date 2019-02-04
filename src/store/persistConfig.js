import { storeVersion } from '../env';
import storage from 'redux-persist/lib/storage';
import { createMigrate } from 'redux-persist';

import { createWhitelistFilter } from 'redux-persist-transform-filter';

const usersFilter = createWhitelistFilter(
  'users',
  ['users', 'groups', 'unRegisteredChanges']
);

const migrations = {
}

module.exports = {
    key: 'root',
    version: storeVersion,
    storage,
    whitelist: ['users'],
    transforms: [usersFilter],
    migrate: createMigrate(migrations, { debug: false }),
    timeout: null
  }
