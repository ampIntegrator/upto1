'use client';

/**
 * What the « Gérer » dialog shares with the fields it renders (the rows builder): the column
 * whose content is being edited, and how to show a column's content panel.
 */
import {createContext, useContext} from 'react';

import type {PreviewColumn} from './preview';

export type ManagerContextValue = {
  /** the column shown in the content panel */
  column: PreviewColumn | null;
  /** selects a column, without changing panel */
  selectColumn: (at: PreviewColumn) => void;
  /** selects a column and shows what it needs: the content panel when it holds a block, the components when it is empty */
  openContent: (at: PreviewColumn) => void;
};

export const ManagerContext = createContext<ManagerContextValue | null>(null);

/** null outside the dialog */
export const useManager = () => useContext(ManagerContext);
