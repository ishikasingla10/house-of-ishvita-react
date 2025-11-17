import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Robust ScrollToTop
 * - Scrolls the `#main-content` element into view on route changes (and focuses it).
 * - If the URL contains a hash (e.g. /page#section), it will attempt to scroll that target into view.
 * - Retries the scroll several times to counter layout shifts from lazy-loaded images.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let timers: number[] = [];

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth';

    const doScroll = () => {
      try {
        // If hash present, try to scroll that element into view first
        if (hash) {
          const el = document.querySelector(hash) as HTMLElement | null;
          if (el) {
            el.scrollIntoView({ behavior, block: 'start' });
            // set focus for accessibility
            el.setAttribute('tabindex', '-1');
            (el as HTMLElement).focus({ preventScroll: true });
            return;
          }
        }

        const main = document.getElementById('main-content');

        if (main) {
          // prefer scrolling the page so we land the main element at the top of the viewport
          const rect = main.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          window.scrollTo({ top, behavior });

          // also reset any internal scroll on main if it is scrollable
          try {
            (main as HTMLElement).scrollTo({ top: 0, behavior });
          } catch (e) {
            // ignore if not supported
          }

          // set keyboard focus to main for a11y (prevent scroll so we keep our position)
          main.setAttribute('tabindex', '-1');
          (main as HTMLElement).focus({ preventScroll: true });
          return;
        }

        // final fallback to top of document
        window.scrollTo({ top: 0, behavior });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    };

    // Run immediately and then a few retries to handle late-loading images or content shifts
    doScroll();
    timers.push(window.setTimeout(doScroll, 120));
    timers.push(window.setTimeout(doScroll, 420));
    timers.push(window.setTimeout(doScroll, 900));

    return () => timers.forEach(t => clearTimeout(t));
  }, [pathname, hash]);

  return null;
}
