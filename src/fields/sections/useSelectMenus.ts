import {type RefObject, useEffect} from 'react';

import {PAYLOAD_DOM} from './payloadDom';

/** a select menu opens upwards when less than this (px) is left under its field; one option's height */
const MENU_ROOM = 160;
const MENU_ITEM = 44;

/**
 * Keeps Payload's select menus inside `within` (the dialog's top part, short, which clips them).
 */
export function useSelectMenus(within: RefObject<HTMLElement | null>) {
  // Payload's select menus open inside the panel, which is short and clips them: each menu is kept
  // inside the top part (a shorter list that scrolls, or opened upwards when there is more room above)
  useEffect(() => {
    const root = within.current;
    if (!root) return;
    const place = (menu: HTMLElement) => {
      const list = menu.querySelector<HTMLElement>(PAYLOAD_DOM.selectMenuList);
      const control = menu.parentElement?.querySelector<HTMLElement>(PAYLOAD_DOM.selectControl);
      if (!list || !control) return;
      const bounds = root.getBoundingClientRect();
      const box = control.getBoundingClientRect();
      const margin = 16;
      const below = bounds.bottom - box.bottom - margin;
      const above = box.top - bounds.top - margin;
      if (below < MENU_ROOM && above > below) {
        menu.style.top = 'auto';
        menu.style.bottom = '100%';
      }
      list.style.maxHeight = `${Math.max(Math.max(below, above), MENU_ITEM)}px`;
    };
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const menu = node.matches(PAYLOAD_DOM.selectMenu) ? node : node.querySelector<HTMLElement>(PAYLOAD_DOM.selectMenu);
          if (menu) place(menu);
        });
      }
    });
    observer.observe(root, {childList: true, subtree: true});
    return () => observer.disconnect();
  }, [within]);
}
