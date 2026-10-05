'use client';

/**
 * InfoBubble — an « i » button whose text shows in a bubble on hover, on keyboard focus and on a
 * click (a second click, Escape or leaving the button closes it). It replaces a line of help: the
 * text takes no room until it is asked for. The bubble is drawn over the page (a portal, placed
 * from the button's box and kept inside the window): no panel around the button can clip it.
 * `align`: the side of the button the bubble hangs from.
 */
import React, {useId, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import './tokens.scss';
import './InfoBubble.scss';

/** room kept between the bubble and the button, and between the bubble and the window's edges (px) */
const OFFSET = 8;

export function InfoBubble({text, label, align = 'end'}: {text: string; label: string; align?: 'start' | 'end'}) {
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Escape hides the bubble until the pointer or the focus leaves the button
  const [dismissed, setDismissed] = useState(false);
  const [place, setPlace] = useState<{left: number; top: number} | null>(null);
  const shown = !dismissed && (pinned || hovered || focused);

  useLayoutEffect(() => {
    const from = button.current;
    const el = bubble.current;
    if (!shown || !from || !el) return;
    const fit = () => {
      const box = from.getBoundingClientRect();
      const left = align === 'end' ? box.right - el.offsetWidth : box.left;
      // under the button, or above it when the window ends too soon
      const under = box.bottom + OFFSET;
      const top = under + el.offsetHeight + OFFSET <= window.innerHeight ? under : box.top - OFFSET - el.offsetHeight;
      setPlace({left: Math.max(OFFSET, Math.min(left, window.innerWidth - el.offsetWidth - OFFSET)), top: Math.max(OFFSET, top)});
    };
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('scroll', fit, true);
    return () => {
      window.removeEventListener('resize', fit);
      window.removeEventListener('scroll', fit, true);
    };
  }, [align, shown, text]);

  return (
    <span className="info-bubble">
      <button
        ref={button}
        type="button"
        className="info-bubble__button"
        data-open={shown ? 'true' : undefined}
        aria-label={label}
        aria-describedby={shown ? id : undefined}
        aria-expanded={shown}
        onClick={() => {
          setDismissed(false);
          setPinned((p) => !p || !shown);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setDismissed(false);
        }}
        onFocus={(e) => setFocused(e.currentTarget.matches(':focus-visible'))}
        onBlur={() => {
          setFocused(false);
          setPinned(false);
          setDismissed(false);
        }}
        onKeyDown={(e) => {
          if (e.key !== 'Escape' || !shown) return;
          // (Escape closes the bubble, not the dialog around it)
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          setPinned(false);
          setDismissed(true);
        }}>
        i
      </button>
      {/* in the page only while shown (asked for in the browser: nothing of it in the server's markup) */}
      {!shown
        ? null
        : createPortal(
            <span ref={bubble} id={id} role="tooltip" className="info-bubble__text" data-shown={place ? 'true' : undefined} style={place ? {left: place.left, top: place.top} : undefined}>
              {text}
            </span>,
            document.body,
          )}
    </span>
  );
}
