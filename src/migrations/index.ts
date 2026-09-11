import * as migration_20260911_154044_site_initial from './20260911_154044_site_initial';
import * as migration_20260911_155220_users_name from './20260911_155220_users_name';
import * as migration_20260911_160753_breadcrumb_settings from './20260911_160753_breadcrumb_settings';
import * as migration_20260911_161603_breadcrumb_home_style from './20260911_161603_breadcrumb_home_style';

export const migrations = [
  {
    up: migration_20260911_154044_site_initial.up,
    down: migration_20260911_154044_site_initial.down,
    name: '20260911_154044_site_initial',
  },
  {
    up: migration_20260911_155220_users_name.up,
    down: migration_20260911_155220_users_name.down,
    name: '20260911_155220_users_name',
  },
  {
    up: migration_20260911_160753_breadcrumb_settings.up,
    down: migration_20260911_160753_breadcrumb_settings.down,
    name: '20260911_160753_breadcrumb_settings',
  },
  {
    up: migration_20260911_161603_breadcrumb_home_style.up,
    down: migration_20260911_161603_breadcrumb_home_style.down,
    name: '20260911_161603_breadcrumb_home_style'
  },
];
