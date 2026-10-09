'use client';

/**
 * InfoBubble — an « i » button whose text shows in a bubble on hover, on keyboard focus and on a
 * click (a second click, Escape or leaving the button closes it). It replaces a line of help: the
 * text takes no room until it is asked for. The bubble is drawn over the page (a portal, placed
 * from the button's box and kept inside the window): no panel around the button can clip it. The
 * bubble opens over the « i », which sits in one of its corners (top left, or top right near the
 * window's right edge; bottom corners near the window's bottom): a twin of the « i » is drawn in
 * that corner, the real button under it keeps the pointer. `align`: the side the bubble opens on
 * when both fit.
 */
import React, {useId, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import './tokens.scss';
import './InfoBubble.scss';

/** room between the bubble's edge and the « i » in its corner, and between the bubble and the window's edges (px) */
const OFFSET = 8;

type Corner = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export function InfoBubble({text, label, align = 'end'}: {text: string; label: string; align?: 'start' | 'end'}) {
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Escape hides the bubble until the pointer or the focus leaves the button
  const [dismissed, setDismissed] = useState(false);
  const [place, setPlace] = useState<{left: number; top: number; corner: Corner} | null>(null);
  const shown = !dismissed && (pinned || hovered || focused);

  useLayoutEffect(() => {
    const from = button.current;
    const el = bubble.current;
    if (!shown || !from || !el) return;
    const fit = () => {
      const box = from.getBoundingClientRect();
      // the « i » in the bubble's corner: the bubble starts OFFSET before the « i »
      const startLeft = box.left - OFFSET;
      const endLeft = box.right + OFFSET - el.offsetWidth;
      const fitsStart = startLeft + el.offsetWidth + OFFSET <= window.innerWidth;
      const fitsEnd = endLeft >= OFFSET;
      const start = align === 'end' ? !fitsEnd && fitsStart : fitsStart || !fitsEnd;
      const topTop = box.top - OFFSET;
      const bottomTop = box.bottom + OFFSET - el.offsetHeight;
      const top = topTop + el.offsetHeight + OFFSET <= window.innerHeight || bottomTop < OFFSET;
      setPlace({left: start ? startLeft : endLeft, top: top ? topTop : bottomTop, corner: `${top ? 'top' : 'bottom'}-${start ? 'start' : 'end'}`});
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
            <span ref={bubble} id={id} role="tooltip" className="info-bubble__text" data-shown={place ? 'true' : undefined} data-corner={place?.corner ?? 'top-start'} style={place ? {left: place.left, top: place.top} : undefined}>
              {/* the twin of the « i », drawn in the bubble's corner over the real one */}
              <span className="info-bubble__twin" aria-hidden="true">
                i
              </span>
              {text}
            </span>,
            document.body,
          )}
    </span>
  );
}
