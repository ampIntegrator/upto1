import type {Condition, Field} from 'payload';

import type {Text} from '@/i18n/admin/languages';

/**
 * A heading between two groups of section settings: a rule, a small title and, when the group has
 * a `help` text, an « i » that shows it in a bubble (no line of help under the fields); nothing in the
 * database (a `ui` field). The host may pass its own `component` (an icon before the title, for
 * instance) and an `icon` key that component understands; without it, the neutral heading.
 */
export type SectionGroupOptions = {
  /** unique name inside the settings block */
  name: string;
  label: Text;
  /** what the group's settings do: shown in an « i » bubble beside the title */
  help?: Text;
  /** icon key, read by the host's component only */
  icon?: string;
  /** the host's heading component (`path#Export`) */
  component?: string;
  condition?: Condition;
  /** the first group of the block: no rule above it */
  first?: boolean;
};

export const sectionGroup = ({name, label, help, icon, component, condition, first}: SectionGroupOptions): Field => ({
  name,
  type: 'ui',
  admin: {
    condition,
    components: {
      Field: {
        path: component ?? '@/fields/sections/GroupHeading#GroupHeading',
        clientProps: {label, help, icon, first},
      },
    },
  },
});
