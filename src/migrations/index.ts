import * as migration_20260911_154044_site_initial from './20260911_154044_site_initial';

export const migrations = [
  {
    up: migration_20260911_154044_site_initial.up,
    down: migration_20260911_154044_site_initial.down,
    name: '20260911_154044_site_initial'
  },
];
