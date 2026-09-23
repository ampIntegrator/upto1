import type {Condition, Field} from 'payload';

import {sectionGroup} from '@/fields/sections/group';
import type {Text} from '@/i18n/admin/languages';

/** the site's heading for a group of fields: a rule, a Nucleo icon and a small title (SectionGroupHeading) */
export const GROUP_HEADING = '@/fields/SectionGroupHeading#SectionGroupHeading';

/** A group heading in any admin form of the site (blocks, hero, collections): stores nothing. */
export const groupHeading = (o: {name: string; label: Text; icon?: string; condition?: Condition; first?: boolean}): Field => sectionGroup({...o, component: GROUP_HEADING});
